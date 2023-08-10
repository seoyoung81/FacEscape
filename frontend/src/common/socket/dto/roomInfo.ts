import { RoomMember } from "./roomMember";

export class RoomInfo {
    roomId  :string;
    hostUUID:string;
    myUUID  :string;
    members : RoomMember[];

    constructor(roomId:string, hostUUID:string, myUUID:string, members:RoomMember[]){
        this.roomId   = roomId;
        this.hostUUID = hostUUID;
        this.myUUID   = myUUID;
        this.members  = members;
    }
};
