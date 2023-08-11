import { useState, useEffect } from 'react';
import { io, Socket } from "socket.io-client";
import { ClientSocketEvent, ServerSocketResposneEvent, ServerSocketEvent } from "./utils"
import { RoomInfo } from './dto/roomInfo';
import { ClientMembersResponse } from './dto/ClientMembersResponse';
import { RoomMember } from './dto/roomMember';

export function useSocketRooms() {

    const [isKick, setIsKick] = useState<boolean>(false);
    const [client, setClient] = useState<RoomMember>();
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

            const updatedRoomInfo = new RoomInfo(
                roomData["roomId"]
               ,roomData["hostUUID"]
               ,roomData["myUUID"]
               ,responseConverter.convertToMembers());

            setRoomInfo(() => {
                return updatedRoomInfo;
            });

            const currentClientInfo = updatedRoomInfo.members.filter(member=>member.uuid === updatedRoomInfo.myUUID)[0];
            setClient(()=>currentClientInfo as RoomMember);
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
            console.log(errMsg);
        });

        newSocket.on(KICK_RESPONSE, ()=>{
            setIsKick(()=>true);
        });

        setSocket(newSocket);
    };

    const createRoom = () => {
        if(socket) {
            socket.emit(CREATE_EVENT);
        }
    };

    const joinRoom = (roomId: string) => {
        if(roomId) {
            socket?.emit(JOIN_EVENT, roomId);
        }
    }

    useEffect(() => {
        connect();
    }, []);

    return [{createRoom, joinRoom, roomInfo, roomId, socket, client, isKick}];
};