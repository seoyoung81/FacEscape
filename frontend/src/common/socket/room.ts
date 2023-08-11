import { useState, useEffect } from 'react';
import { io, Socket } from "socket.io-client";
import { ClientSocketEvent, ServerSocketResposneEvent, ServerSocketEvent } from "./utils"
import { RoomMember  } from './dto/roomMember';
import { RoomInfo } from './dto/roomInfo';
import { ClientMembersResponse } from './dto/ClientMembersResponse';

export function useSocketRooms() {
    const [socket, setSocket] = useState<Socket>();
    const [roomId, setRoomId] = useState<string>();
    const [roomInfo, setRoomInfo] = useState<RoomInfo>();

    const CREATE_EVENT   : ClientSocketEvent = "createRoom";
    const JOIN_EVENT     : ClientSocketEvent = "joinRoom";
    const SEND_CHAT_EVENT: ClientSocketEvent = "chat";

    const SUCCESS_RESPONSE : ServerSocketResposneEvent = "joinSuccess";
    const FAIL_RESPONSE    : ServerSocketResposneEvent = "joinFail";
    const KICK_RESPONSE    : ServerSocketResposneEvent = "kick";

    const ENTERED_EVENT : ServerSocketEvent = "someoneEntered";
  
    const connect = () => {
        const newSocket = io("http://localhost:3050", {
            transports: ["websocket", "polling"]
        });

        newSocket.on(SUCCESS_RESPONSE, (data) => {
            const roomData = JSON.parse(data);
            const responseConverter = new ClientMembersResponse(roomData["members"]);

            setRoomId(() => {
                return roomData["roomId"];
            });

            setRoomInfo(() => {
                const updatedRoomInfo = new RoomInfo(
                     roomData["roomId"]
                    ,roomData["hostUUID"]
                    ,roomData["myUUID"]
                    ,responseConverter.convertToMembers()
                );
            
                return updatedRoomInfo;
              });
        });

        newSocket.on(ENTERED_EVENT, (data) => {
            const roomData = JSON.parse(data);
            const responseConverter = new ClientMembersResponse(roomData);

            setRoomInfo((prevRoomInfo) => {
                if (!prevRoomInfo) {
                    return; 
                }

                const updatedRoomInfo = new RoomInfo(
                    prevRoomInfo.roomId,
                    prevRoomInfo.hostUUID,
                    prevRoomInfo.myUUID,
                    responseConverter.convertToMembers()
                );
                return updatedRoomInfo;
            });
        });


        newSocket.on(FAIL_RESPONSE, (errMsg) => {
            alert(errMsg);
        });
        newSocket.on(KICK_RESPONSE, (errMsg)=>{
            alert(errMsg);
        });
        // newSocket.on(SEND_CHAT_EVENT, (chat)=>{
        //     console.log(chat);
        // });

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

    // const sendMessage = (message: string) => {
    //     if(roomId) {
    //         socket?.emit(SEND_CHAT_EVENT, message);
    //     }
    // }

    useEffect(() => {
        connect();
    }, []);

    return [{createRoom, joinRoom, roomInfo, roomId}];
};