import { Socket } from "socket.io";
import { memberManager } from "../../member/memberManager"
import { roomManager } from "../../room/roomManager";
import { MemberResponseEvent, ExitEvent, MemberActionEvent, GameResponseEvent } from "./eventType";
import { RoomInfoResponse } from "./roomInfoResponse";

const createOrUpdateMemberByIp = (socket: Socket) => {
    const ip = socket.handshake.address;

    let member = memberManager.getMember(ip);
    console.log(`사용자 ip: ${ip}`, member);
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
    room.host = member.ip;
    member.enterRoom(room);
    const response = new RoomInfoResponse(room.roomId, room.host, member.ip, room.members)
    socket.emit(MemberResponseEvent.joinSuccess, JSON.stringify(response));
};

export const joinRoomEventHandler = (roomId:string, socket: Socket) => {
    const room = roomManager.getRoom(roomId);
    const member = createOrUpdateMemberByIp(socket);
    console.log(room);
    if(!room) {
        socket.emit(MemberResponseEvent.joinFail, `존재하지 않는 방입니다.`);
        return;
    }

    if(room.isFull()) {
        socket.emit(MemberResponseEvent.joinFail, `이미 가득찬 방입니다.`);
        return;
    }

    if((room.state === "PLAY") && !room.checkInGameMember(member.ip)) {
        socket.emit(MemberResponseEvent.joinFail, "유효하지 않은 사용자 입니다.");
        return;
    }

    member.enterRoom(room);
    const response = new RoomInfoResponse(roomId, room.host, member.ip, room.members)
    socket.emit(MemberResponseEvent.joinSuccess, JSON.stringify(response));
}

export const exitEventHandler = (event: ExitEvent, socket: Socket) => {
    const member = createOrUpdateMemberByIp(socket);
    member.leaveRoom(event);
}

export const memberChatEventHandler = (socket: Socket, msg: string, callBack: (roomId:string, chat: string)=>{}) => {
    const ip = socket.handshake.address;
    const member = memberManager.getMember(ip);
    member?.sendChat(msg, callBack);
}

interface NickNameEventData {
    roomId: string
    memberId: number;
    nickname: string;
}

export const memberNickNameEventHandler = (socket: Socket, data: NickNameEventData) => {
    const roomId = data.roomId;
    const memberid = data.memberId;
    const nickname = data.nickname;
    const ip = socket.handshake.address;
    const room = roomManager.getRoom(roomId);
    //const member = memberManager.getMember(ip);
    const member = memberManager.getMember(ip+room?.members.size);
    
    if(room && member){
        member.updateUserInfo(memberid, nickname);
        const response = new RoomInfoResponse(roomId, room.host, member.ip, room.members)
        socket.emit(MemberActionEvent.updateNickName, JSON.stringify(response));
    }
}

export const gameStartEventhandler = (socket: Socket, roomId:string) => {
    const ip = socket.handshake.address;
    const member = memberManager.getMember(ip);
    const room = roomManager.getRoom(roomId);
    console.log(room)
    console.log(member)
    if(room?.host != member?.ip){
        socket.emit(GameResponseEvent.startFail, `방장이 게임을 시작할 수 있습니다.`);
        return;
    }

    if(!room) {
        socket.emit(GameResponseEvent.startFail, `존재하지 않는 방입니다.`);
        return;
    }

    if(!room.isFull()) {
        socket.emit(GameResponseEvent.startFail, `인원이 부족합니다.`);
        return;
    }
    
    room.state = "PLAY";
    room.setInGameMember(room.members);
    socket.emit(GameResponseEvent.startSuccess, room.inGameMember);
}