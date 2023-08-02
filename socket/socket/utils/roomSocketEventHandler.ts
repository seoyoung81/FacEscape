import { Socket } from "socket.io";
import { memberManager } from "../../member/memberManager"
import { roomManager } from "../../room/roomManager";
import { MemberResponseEvent, ExitEvent } from "./eventType";
import { JoinRoomResponse } from "./joinRoomResponse";

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
    const joinResponse = new JoinRoomResponse(room.roomId, room.host, member.ip, room.members)
    socket.emit(MemberResponseEvent.joinSuccess, JSON.stringify(joinResponse));
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
    const joinResponse = new JoinRoomResponse(roomId, room.host, member.ip, room.members)
    socket.emit(MemberResponseEvent.joinSuccess, JSON.stringify(joinResponse));
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