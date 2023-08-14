import openvidu from './OpenviduInstance';
import { roomManager } from "../room/roomManager";
import { memberManager } from '../member/memberManager';
import express from "express";

const opService = {
    createSession: async (req: express.Request) => {
        const memberId = req.body.memberId;
        const requestedRoomId = req.body.customSessionId;

        if(!memberManager.exists(memberId)) {
            return { error: "존재하지 않는 사용자 입니다." };
        } 

        if (!requestedRoomId){
            return { error: '올바르지 않는 roomId값입니다.' };
        }
        else if (isNonExistRoom(requestedRoomId)){
            return { error: '존재하지 않는 방에 대한 화상 서버 생성 요청입니다.' };
        }

        const session = await openvidu.createSession(req.body);      
        return { sessionId: session.sessionId };
    },

    createConnection: async (requestedRoomId:string, req: express.Request) => {
        if (!requestedRoomId) {
            return { error: '올바르지 않는 roomId값입니다.' };
        } else if (isNonExistRoom(requestedRoomId)) {
            return { error: '존재하지 않는 방에 대한 화상 서버 입장 요청입니다.' };
        }
    
        const session = openvidu.activeSessions.find((s) => s.sessionId === requestedRoomId);
        if (!session) {
            return { error: '초 비상 !!!!! 방은 존재하지만 화상 서버는 존재하지 않습니다' };
        } else {
            const connection = await session.createConnection(req.body);
            return { token: connection.token };
        }
        
    }
};

const isNonExistRoom = (roomID: string) => {
    if (roomID) {
        return !roomManager.exists(roomID);
    } else {
        return true;
    }
}

const isRoomFull = (roomID: string) => {
    return roomManager.getRoom(roomID)?.isFull();
}

export default opService;
