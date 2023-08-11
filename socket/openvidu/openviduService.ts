import openvidu from './OpenviduInstance';
import { roomManager } from "../room/roomManager";
import express from "express";

const opService = {
    createSession: async (req: express.Request) => {
        const requestedRoomId = req.body.customSessionId;

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
        
        if(isRoomFull(requestedRoomId)) {
            return { error: '이미 만원인 방에 대한 화상 서버 입장 요청입니다.' };
        }

        // if(invaildateUser(requestedRoomId)) {
        //     return { error: '방에 존재하지 않는 유저의 화상 서버 입장 요청입니다' };
        //      나중에 조건에 따라 바꿀것
        // }
           
        const session = openvidu.activeSessions.find(
                (s) => s.sessionId === requestedRoomId
            );
            
            if (!session) {
                return { error: '초 비상 !!!!! 방은 존재하지만 화상 서버는 존재하지 않습니다' };
            }
            else {
                const connection = await session.createConnection(req.body);
                return { token: connection.token };
            }
        
    }
};

function isNonExistRoom(roomID: string | undefined | null) {
    if (roomID) {
        return !roomManager.exists(roomID);
    } else {
        return true;
    }
}

function isRoomFull(roomID: string) {
    return roomManager.getRoom(roomID)?.isFull;
}

export default opService;
