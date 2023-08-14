import { Member } from "../../member/utils/member";
import { RoomMember } from "./roomMember";

export class RoomInfoResponse{
    private roomId      : string|undefined;
    private hostId: number|undefined;
    private myId  : number|undefined;
    private members     : RoomMember[];
    
    constructor(membersMap  : Map<number, Member>
        , hostId: number|undefined
        , myId? : number
        , roomId? : string) {
        this.roomId = roomId;
        this.hostId = hostId;
        this.myId = myId;
        this.members = this.convertMembersToArray(membersMap);
    }

    convertMembersToArray(membersMap: Map<number, Member>): RoomMember[] {
        let members: RoomMember[] = [];
        membersMap.forEach((member) => {
            const roomMember = new RoomMember(member.id, member.nickname);
            members.push(roomMember);
        });

        return members;
    }

    setFullInfos(myId: number, roomId:string) {
        this.myId = myId;
        this.roomId = roomId;
    }

}
