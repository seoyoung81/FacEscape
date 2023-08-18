import { Socket } from 'socket.io';
import { Room } from '../../room/utils/room'
import { ExitEvent, MemberActionEvent } from '../../socket/utils/eventType';
import { roomManager } from '../../room/roomManager';

export class Member {
    private _id: number;
    private _nickname: string;
    private _room: Room | undefined;
    private _socket: Socket

    constructor(idOrMember: number | Member, socket?: Socket) {
        if (typeof idOrMember === 'number' && socket instanceof Socket) {
            this._id = idOrMember;
            this._nickname = "";
            this._socket = socket;
        } else if(idOrMember instanceof Member) {
            const member = idOrMember;
            this._id = member._id;
            this._nickname = member._nickname;
            this._room = member._room;
            this._socket = member._socket;
        } else {
            throw new Error("Invalid args");
        }
    }

    get id(): number {
        return this._id;
    }

    get nickname(): string {
        return this._nickname;
    }

    get room(): Room | undefined{
        return this._room;
    }

    updateSocket(socket: Socket) {
        // 동일 Id로 동일한 방에 여러 개의 연결을 할 수 없도록, 기존 접속을 끊고 새로운 연결을 만든다.
        if(this._socket && this._room) {
            this._socket.leave(this._room.roomId);
             this._socket.emit("kick", "다른 클라이언트에서 접속하여 접속이 종료됩니다.");
            this._socket.disconnect();
        }

        this._socket = socket;
        if(this._room) {
            this._socket.join(this._room.roomId);
        }
    }

    updateUserInfo(nickname: string) {
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