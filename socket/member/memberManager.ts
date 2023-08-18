import { Socket } from 'socket.io';
import { Member } from "./utils/member"

class MemberManager {
    private _members: Map<number, Member>;
    
    constructor() {
      this._members = new Map<number, Member>();
    }

    createMember(id: number, socket: Socket) {
        const newMember = new Member(id, socket);
        this._members.set(id, newMember);
        return newMember;
    }

    getMember(id: number): Member|undefined {
        return this._members.get(id);
    }

    exitMember(id: number) {
        this._members.delete(id);
    }

    exists(id: number): boolean {
        return this._members.has(id);
    }
}

export const memberManager = new MemberManager();