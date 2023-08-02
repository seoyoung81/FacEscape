import { Member } from "../../member/utils/member";
import { RoomMember } from "./roomMember";

export class RoomInfoResponse{
    private roomId: string;
    private hostGameUUID: string|undefined;
    private myGameUUID: string;
    private members: RoomMember[];
    
    constructor(roomId: string, hostGameUUID: string|undefined, myGameUUID: string, membersMap: Map<string, Member>) {
        this.roomId = roomId;
        this.hostGameUUID = hostGameUUID;
        this.myGameUUID = myGameUUID;
        this.members = this.convertMembersToArray(membersMap);
    }

    convertMembersToArray(membersMap: Map<string, Member>): RoomMember[] {
        let members: RoomMember[] = [];
        membersMap.forEach((member, memberUuid) => {
            const roomMember = new RoomMember(member.memberId, member.nickname, memberUuid);
            members.push(roomMember);
        });

        return members;
    }
    
}
