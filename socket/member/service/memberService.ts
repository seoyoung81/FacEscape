import { memberManager } from "../../member/memberManager"

export const memberService = {
    updateMemberNickname: async (hostIp: string, memberId: number, nickname: string) => {
        const member = memberManager.getMember(hostIp);
        if(!member) {
            return { error: "존재하지 않는 사용자 입니다." };
        }

        member.updateUserInfo(memberId, nickname);
        return {
            memberId: memberId,
            nickname: nickname
        };
    }
}