import { Socket } from "socket.io";
import { memberManager } from "../../member/memberManager"
import { roomManager } from "../../room/roomManager";
import { MemberResponseEvent, ExitEvent, MemberActionEvent, GameResponseEvent } from "./eventType";
import { RoomInfoResponse } from "./roomInfoResponse";

const createOrUpdateMemberByIp = (socket: Socket) => {
    const ip = socket.handshake.address;

    let member = memberManager.getMember(ip);
    if(member) {
        member.updateSocket(socket);
    } else {
        member = memberManager.createMember(ip, socket);
    }
    return member;
}

export const createRoomEventHandler = (socket: Socket) => {
    const room = roomManager.createRoom();
    const member = createOrUpdateMemberByIp(socket);
    room.hostUUID = member.memberUUID;
    member.enterRoom(room);

    const response = new RoomInfoResponse(room.members, room.hostUUID, member.memberUUID, room.roomId)
    
    socket.emit(MemberResponseEvent.joinSuccess, JSON.stringify(response));
};

export const joinRoomEventHandler = (roomId:string, socket: Socket) => {
    const room = roomManager.getRoom(roomId);
    const enteringUser = createOrUpdateMemberByIp(socket);
    
    if(!room) {
        socket.emit(MemberResponseEvent.joinFail, `존재하지 않는 방입니다.`);
        return;
    }

    if(room.isFull()) {
        socket.emit(MemberResponseEvent.joinFail, `이미 만원인 방입니다.`);
        return;
    }

    if((room.state === "PLAY") && !room.checkInGameMember(enteringUser.ip)) {
        socket.emit(MemberResponseEvent.joinFail, "유효하지 않은 사용자 입니다.");
        return;
    }

    enteringUser.enterRoom(room);
    const response = new RoomInfoResponse(room.members, room.hostUUID)

    socket.broadcast.to(roomId).emit(MemberResponseEvent.someoneEntered, JSON.stringify(response));
    response.setFullInfos(enteringUser.memberUUID, roomId);
    socket.emit(MemberResponseEvent.joinSuccess, JSON.stringify(response));

}

export const exitEventHandler = (event: ExitEvent, socket: Socket) => {
    const member = createOrUpdateMemberByIp(socket);
    const room = member.room;
    member.leaveRoom(event);

    console.log("Exit Event!");
    
    if(room){
        const response = new RoomInfoResponse(room.members, room.hostUUID);
        socket.broadcast.to(room.roomId).emit(MemberResponseEvent.othersExit, JSON.stringify(response));
    }
}

export const memberChatEventHandler = (socket: Socket, msg: string, callBack: (roomId:string, chat: string)=>{}) => {
    const ip = socket.handshake.address;
    //const member = memberManager.getMember(ip+0);
    const member = memberManager.getMember(ip);
    member?.sendChat(msg, callBack);
}

interface NickNameEventData {
    memberId: number;
    nickname: string;
}

export const memberNickNameEventHandler = (socket: Socket, data: NickNameEventData, callBack: (roomId:string, response: string)=>{}) => {
    const memberid = data.memberId;
    const nickname = data.nickname;
    const ip = socket.handshake.address;
    const member = memberManager.getMember(ip);
    //const member = memberManager.getMember(ip + 0);
    const room = member?.room;
    
    if(room && member){
        member.updateUserInfo(memberid, nickname);
        const response = new RoomInfoResponse(room.members, room.hostUUID);
        callBack(room.roomId, JSON.stringify(response));
    }
}

export const gameStartEventhandler = (socket: Socket, callBack: (roomId:string, response: string)=>{}) => {
    const ip = socket.handshake.address;
    const member = memberManager.getMember(ip);
    //const member = memberManager.getMember(ip +0);
    const room = member?.room;
    
    if (!room) {
        socket.emit(GameResponseEvent.startFail, `존재하지 않는 방입니다.`);
        return;
    }

    if (room.hostUUID != member.memberUUID) {
        socket.emit(GameResponseEvent.startFail, `방장이 게임을 시작할 수 있습니다.`);
        return;
    }

    if(!room.isFull()) {
        socket.emit(GameResponseEvent.startFail, `인원이 부족합니다.`);
        return;
    }
    room.state = "PLAY";
    room.setInGameMember(room.members);
    const response = new RoomInfoResponse(room.members, room.hostUUID);
    callBack(room.roomId, JSON.stringify(response));
}