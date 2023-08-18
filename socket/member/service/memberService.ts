import { memberManager } from "../../member/memberManager";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const axiosApi = (url: string) => {
    const instance = axios.create({ 
        baseURL: url,
        headers: { 
            'Access-Control-Allow-Origin' : 'http://localhost:3050' 
        }
    });
    return instance;
};

const apiBase = axiosApi("https://i9a305.p.ssafy.io/api/backend");

export const memberService = {
    updateMemberNickname: async (memberId: number, nickname: string) => {
        const member = memberManager.getMember(memberId);
        if(!member) {
            return { error: "존재하지 않는 사용자 입니다." };
        }

        member.updateUserInfo(nickname);
        return {
            memberId: memberId,
            nickname: nickname
        };
    },

    validateToken: async(token: string) => {
        let response: any;
        try {
            response = await apiBase.get("/validate-token", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch(e) {
           // console.log(e);
        }
        return response;
    }
}