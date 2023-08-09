import { useState, useEffect } from 'react';
import { io, Socket } from "socket.io-client";
import { ClientSocketEvent, ServerSocketResposneEvent } from "./utils"

export function useSocketRooms() {
    const [socket, setSocket] = useState<Socket>();
    const [roomId, setRoomId] = useState<string>();

    const CREATE_EVENT: ClientSocketEvent = "createRoom";
    const JOIN_EVENT: ClientSocketEvent = "joinRoom";
    const SEND_CHAT_EVENT: ClientSocketEvent = "chat";

    const SUCCESS_RESPONSE: ServerSocketResposneEvent = "joinSuccess";
    const FAIL_RESPONSE: ServerSocketResposneEvent = "joinFail";
    const KICK_RESPONSE: ServerSocketResposneEvent = "kick";

    const connect = () => {
        const newSocket = io("http://localhost:3050", {
            transports: ["websocket", "polling"]
        });

        newSocket.on(SUCCESS_RESPONSE, (data) => {
            const roomInfo = JSON.parse(data);
            setRoomId(roomInfo["rooomId"]);
            console.log(roomInfo["rooomId"]);
        });

        
        newSocket.on(FAIL_RESPONSE, (errMsg) => {
            console.log(errMsg);
        });
        newSocket.on(KICK_RESPONSE, (errMsg)=>{
            console.log(errMsg);
        })
        newSocket.on(SEND_CHAT_EVENT, (chat)=>{
            console.log(chat);
        });

        setSocket(newSocket);
    };

    const createRoom = () => {
        console.log(socket);
        if(socket) {
            socket.emit(CREATE_EVENT);
        }
    };

    const joinRoom = (roomId: string) => {
        if(roomId) {
            socket?.emit(JOIN_EVENT, roomId);
        }
    }

    const sendMessage = (message: string) => {
        if(roomId) {
            socket?.emit(SEND_CHAT_EVENT, message);
        }
    }

    useEffect(() => {
        connect();
    }, []);
    return [{createRoom, joinRoom, sendMessage}];
};