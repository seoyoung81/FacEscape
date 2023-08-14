import { Socket } from "socket.io";
import { memberManager } from "../../member/memberManager"
import { roomManager } from "../../room/roomManager";
import { MemberResponseEvent, ExitEvent, MemberActionEvent, GameResponseEvent } from "./eventType";
import { RoomInfoResponse } from "./roomInfoResponse";
import { memberService } from "../../member/service/memberService";

const createOrUpdateMemberByToken = async (socket: Socket, token: string) => {
    const resposne = await memberService.validateToken(token);

    if(resposne && resposne.data && resposne.data.valid) {
        let member = memberManager.getMember(resposne.data.memberId);
        if(member) {
            member.updateSocket(socket);
        } else {
            member = memberManager.createMember(parseInt(resposne.data.memberId), socket);
        }
        return member;
    }
    return undefined;
}

export const createRoomEventHandler = async (socket: Socket, token: string) => {
    
    const member = await createOrUpdateMemberByToken(socket, token);
    if(member === undefined) {
        socket.emit(MemberResponseEvent.joinFail, "로그인이 필요한 서비스입니다.");
        return;
    }
    
    const room = roomManager.createRoom();
    room.hostId = member.id;
    member.enterRoom(room);

    const response = new RoomInfoResponse(room.members, room.hostId, member.id, room.roomId)
    socket.emit(MemberResponseEvent.joinSuccess, JSON.stringify(response));
};

export const joinRoomEventHandler = async (socket: Socket, req: any) => {
    const enteringUser = await createOrUpdateMemberByToken(socket, req.token);
    if(enteringUser === undefined) {
        socket.emit(MemberResponseEvent.joinFail, "로그인이 필요한 서비스입니다.");
        return;
    }

    const room = roomManager.getRoom(req.roomId);
    if(!room) {
        socket.emit(MemberResponseEvent.joinFail, `존재하지 않는 방입니다.`);
        return;
    }

    if(room.isFull()) {
        socket.emit(MemberResponseEvent.joinFail, `이미 만원인 방입니다.`);
        return;
    }

    if((room.state === "PLAY") && !room.checkInGameMember(enteringUser.id)) {
        socket.emit(MemberResponseEvent.joinFail, "유효하지 않은 사용자 입니다.");
        return;
    }

    enteringUser.enterRoom(room);
    const response = new RoomInfoResponse(room.members, room.hostId)

    socket.broadcast.to(req.roomId).emit(MemberResponseEvent.someoneEntered, JSON.stringify(response));
    response.setFullInfos(enteringUser.id, req.roomId);
    socket.emit(MemberResponseEvent.joinSuccess, JSON.stringify(response));

}

export const exitEventHandler = async (event: ExitEvent, socket: Socket, token: string) => {
    const member = await createOrUpdateMemberByToken(socket, token);

    const room = member?.room; 
    member?.leaveRoom(event);
    console.log("Exit Event!");
    
    if(room){
        const response = new RoomInfoResponse(room.members, room.hostId);
        socket.broadcast.to(room.roomId).emit(MemberResponseEvent.othersExit, JSON.stringify(response));
    }
}

export const memberChatEventHandler = (id:number, msg: string, callBack: (roomId:string, chat: string)=>{}) => {
    const member = memberManager.getMember(id);
    member?.sendChat(msg, callBack);
}

interface NickNameEventData {
    memberId: number;
    nickname: string;
}

export const memberNickNameEventHandler = (data: NickNameEventData, callBack: (roomId:string, response: string)=>{}) => {
    const memberid = data.memberId;
    const nickname = data.nickname;
    const member = memberManager.getMember(memberid);
    const room = member?.room;
    
    if(room && member){
        member.updateUserInfo(nickname);
        const response = new RoomInfoResponse(room.members, room.hostId);
        callBack(room.roomId, JSON.stringify(response));
    }
}

export const gameStartEventhandler = (socket: Socket, id: number, callBack: (roomId:string, response: string)=>{}) => {
    const member = memberManager.getMember(id);
    if(!member) {
        socket.emit(GameResponseEvent.startFail, `유효하지 않은 유저입니다.`);
        return;
    }

    const room = member?.room;
    
    if (!room) {
        socket.emit(GameResponseEvent.startFail, `존재하지 않는 방입니다.`);
        return;
    }

    if (room.hostId != member.id) {
        socket.emit(GameResponseEvent.startFail, `방장이 게임을 시작할 수 있습니다.`);
        return;
    }

    if(!room.isFull()) {
        socket.emit(GameResponseEvent.startFail, `인원이 부족합니다.`);
        return;
    }
    room.state = "PLAY";
    room.setInGameMember(room.members);
    const response = new RoomInfoResponse(room.members, room.hostId);
    callBack(room.roomId, JSON.stringify(response));
}