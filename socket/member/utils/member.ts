import { Socket } from 'socket.io';
import { Room } from '../../room/utils/room'
import { ExitEvent, MemberActionEvent } from '../../socket/utils/eventType';
import { roomManager } from '../../room/roomManager';

export class Member {
    private _memberId: number;
    private _ip: string;
    private _nickname: string;
    private _room: Room | undefined;
    private _socket: Socket

    constructor(ipOrMember: string | Member, socket?: Socket) {
        if (typeof ipOrMember === 'string' && socket instanceof Socket) {
            this._ip = ipOrMember;
            this._memberId = -1;
            this._nickname = "";
            this._socket = socket;
        } else if(ipOrMember instanceof Member) {
            const member = ipOrMember;
            this._memberId = member._memberId;
            this._ip = member._ip;
            this._nickname = member._nickname;
            this._room = member._room;
            this._socket = member._socket;
        } else {
            throw new Error("Invalid args");
        }
    }

    get ip(): string {
        return this._ip;
    }

    get memberId(): number {
        return this._memberId;
    }

    get nickname(): string {
        return this._nickname;
    }

    updateSocket(socket: Socket) {
        // 동일 IP로 동일한 방에 여러 개의 연결을 할 수 없도록, 기존 접속c을 끊고 새로운 연결을 만든다.
        // if(this._socket && this._room) {
        //     this._socket.leave(this._room.roomId);
        //     this._socket.emit("kick", "다른 클라이언트에서 접속하여 접속이 종료됩니다.");
        // }

        this._socket = socket;
        if(this._room) {
            this._socket.join(this._room.roomId);
        }
    }

    updateUserInfo(memberId: number, nickname: string) {
        this._memberId = memberId;
        this._nickname = nickname;
    }

    enterRoom(room: Room) {
        this._room = room;
        room.joinMember(this);
        this._socket.join(room.roomId);
    }

    leaveRoom(event: ExitEvent) {
        if(this._room) {
            const roomId = this._room.roomId;
            this._room.removeMember(this);
            if(this._room.isEmpty()) {
                roomManager.deleteRoom(roomId);
                console.log(`delete empty room: ${roomId}`);
            }

            this._room = undefined;
            if(event === ExitEvent.leave) {
                this._socket.leave(roomId);
                this._socket.emit("leaveRoomSuccess", "접속 종료에 성공했습니다.");
            }
        }
    }

    sendChat(msg: string, callBack: (roomId: string, chat: string)=>void) {
        if(this._room) {
            callBack(this._room.roomId, msg);
        }
    }
}