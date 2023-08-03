import { Member } from "../../member/utils/member"

const MAX_PLAYER_NUMBER = 6;

export type RoomState = "PLAY" | "WAITING";

export class Room {
    private _roomId: string;
    private _stage: number;
    private _state: RoomState;
    private _host: string|undefined;
    private _members: Map<string, Member>; // 방에 입장한 유저
    private _inGameMember: Map<string, Member>; // 게임 시작 시점에 있던 유저, 시작 이후 해당 유저들만 재입장이 가능하다.

    constructor(roomId: string) {
        this._roomId = roomId;
        this._stage = -1;
        this._state = "WAITING";
        this._members = new Map();
        this._inGameMember = new Map();
    }

    get roomId(): string {
        return this._roomId;
    }

    get state(): RoomState {
        return this._state;
    }

    get host(): string|undefined{
        return this._host;
    }

    get members(): Map<string, Member>{
        return this._members;
    }

    get inGameMember(): Map<string, Member>{
        return this._inGameMember;
    }

    set state(state: RoomState) {
        this._state = state;
    }

    set stage(stage: number) {
        this._stage = stage;
    }

    set host(uuid: string) {
        this._host = uuid;
    }

    setInGameMember(map: Map<string,Member>){
        for (const [key, value] of map) {
            this._inGameMember.set(key, new Member(value));
        }
    }

    checkInGameMember(ip: string) {
        return !this._inGameMember.has(ip);
    }

    joinMember(member: Member) {
        this._members.set(member.ip, member);
        //this._members.set(member.ip+this.members.size, member);
    }

    removeMember(member: Member) {
        this._members.delete(member.ip);
        if(this._host === member.gameUuid){
            this.changeHost();
        }
    }

    getMemberSize() {
        return this._members.size;
    }

    isFull() {
        return this._members.size === MAX_PLAYER_NUMBER;
    }

    isEmpty() {
        return this._members.size === 0;
    }

    changeHost(){
        this._members.forEach((member) => {
            if(this._host != member.gameUuid){
                this._host = member.gameUuid;
                return; 
            }
        })
    }
}