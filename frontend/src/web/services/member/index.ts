import { expressAxios } from "../api";

export const memberService = {
    updateInGameMemberInfo: async(memberId: number, nickname: string) => {
        const response = await expressAxios.post('/member/update', {
            memberId: memberId,
            nickname: nickname
        });
        return response;
    }
};