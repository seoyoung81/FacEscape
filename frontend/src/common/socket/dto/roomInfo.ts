import { RoomMember } from "./roomMember";

export class RoomInfo {
    roomId  :string;
    hostId:number;
    myId  :number;
    members : RoomMember[];

    constructor(roomId:string, hostId:number, myId:number, members:RoomMember[]){
        this.roomId   = roomId;
        this.hostId = hostId;
        this.myId   = myId;
        this.members  = members;
    }
};
