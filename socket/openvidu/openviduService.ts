import openvidu from './openviduInstance';
import { roomManager } from "../room/roomManager";
import express from "express";

const opService = {
    createSession: async (req: express.Request) => {
        if (!req.body.roomId){
            return { error: '올바르지 않는 roomId값입니다.' };
        }
        else if (isNonExistRoom(req.body.roomId)){
            return { error: '존재하지 않는 방에 대한 화상 서버 생성 요청입니다.' };
        }

        /**
         * customSessionId (optional String) : 
         * you can fix the sessionId that will be assigned to the session with this parameter. 
         * If you make another request with the exact same customSessionId while previous session already exists, 
         * no session will be created and a 409 http response will be returned. 
         * If this parameter is an empty string or not sent at all, 
         * OpenVidu Server will generate a random sessionId for you. 
         * If set, it must be an alphanumeric string: allowed numbers [0-9], 
         * letters [a-zA-Z], dashes (-) and underscores (_).
         */
        const requestBodyWithCustomSessionId = {
            ...req.body,
            customSessionId: req.body.roomId,
        };
            
        const session = await openvidu.createSession(requestBodyWithCustomSessionId);

        /**
         * HTTP responses 🔗
         * 200 Session successfully created and sessionId ready to be used
         * 400 Problem with some body parameter
         * 409 Parameter customSessionId corresponds to an existing Session. 
         * There has been no change at all in the state of OpenVidu Server. 
         * You can proceed to use the rejected custom sessionId as usual without a problem
         */
        return { sessionId: session.sessionId };
    },

    createConnection: async (roomId:string, req: express.Request) => {
        if (!roomId)
            return { error: '올바르지 않는 roomId값입니다.' };
        else if (isNonExistRoom(roomId)) {
            return { error: '존재하지 않는 방에 대한 화상 서버 입장 요청입니다.' };
        }
        else if (isRoomFull(roomId)) {
            return { error: '이미 만원인 방에 대한 화상 서버 입장 요청입니다.' };
        }
        else {
            const session = openvidu.activeSessions.find(
                (s) => s.sessionId === roomId
            );
            
            if (!session) {
                return { error: '초 비상 !!!!! 방은 존재하지만 화상 서버는 존재하지 않습니다' };
            }
            else {
                const connection = await session.createConnection(req.body);
                return { token: connection.token };
            }
        }
    },
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
