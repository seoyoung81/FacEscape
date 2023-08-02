import { Socket } from 'socket.io';
import { Member } from "./utils/member"

class MemberManager {
    private _members: Map<string, Member>;
    
    constructor() {
      this._members = new Map<string, Member>();
    }

    createMember(ip: string, socket: Socket) {
        const newMember = new Member(ip, socket);
        //this._members.set(ip, newMember);
        console.log(this._members)
        console.log("memSize:" + this._members.size)
        this._members.set(ip+this._members.size, newMember);
        return newMember;
    }

    getMember(ip: string): Member|undefined {
        return this._members.get(ip);
    }

    exitMember(ip: string) {
        this._members.delete(ip);
    }
}
  
export const memberManager = new MemberManager();