import { Member } from "../../member/utils/member";
import { RoomMember } from "./roomMember";

export class RoomInfoResponse{
    private roomId      : string|undefined;
    private hostGameUUID: string|undefined;
    private myGameUUID  : string|undefined;
    private members     : RoomMember[];
    
    constructor(membersMap  : Map<string, Member>
              , hostGameUUID: string|undefined
              , myGameUUID? : string
              , roomId?     : string) {
        this.roomId       = roomId;
        this.hostGameUUID = hostGameUUID;
        this.myGameUUID   = myGameUUID;
        this.members      = this.convertMembersToArray(membersMap);
    }

    convertMembersToArray(membersMap: Map<string, Member>): RoomMember[] {
        let members: RoomMember[] = [];
        membersMap.forEach((member) => {
            const roomMember = new RoomMember(member.memberId, member.nickname, member.memberUUID);
            members.push(roomMember);
        });

        return members;
    }

    setFullInfos(myGameUUID: string, roomId:string) {
        this.myGameUUID = myGameUUID;
        this.roomId     = roomId;
    }

}
