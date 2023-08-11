import { Constraint } from "matter";

export class RoomMember {
    id      : number;
    nickname: string;
    uuid    : string;

    constructor(id:number, nickname:string, uuid:string){
        this.id       = id;
        this.nickname = nickname;
        this.uuid     = uuid;
    }
};
