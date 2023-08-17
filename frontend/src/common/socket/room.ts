import { useState, useEffect } from 'react';
import { io, Socket } from "socket.io-client";
import { ClientSocketEvent, ServerSocketResposneEvent, ServerSocketEvent } from "./utils"
import { RoomInfo } from './dto/roomInfo';
import { ClientMembersResponse } from './dto/ClientMembersResponse';
import { RoomMember } from './dto/roomMember';
import Swal from 'sweetalert2';

export function useSocketRooms() {

    const [isKick, setIsKick] = useState<boolean>(false);
    const [client, setClient] = useState<RoomMember>();
    const [socket, setSocket] = useState<Socket>();
    const [roomId, setRoomId] = useState<string>();
    const [roomInfo, setRoomInfo] = useState<RoomInfo>();

    const connect = () => {
        const newSocket = io("http://localhost:3050", {
            transports: ["websocket", "polling"],
            query: {token: sessionStorage.getItem("accessToken") || ""}
        });

        newSocket.on(ServerSocketResposneEvent.JOIN_SUCCESS, (data) => {
            const roomData = JSON.parse(data);
            const responseConverter = new ClientMembersResponse(roomData["members"]);
            setRoomId(() => {
                return roomData["roomId"];
            });

            const updatedRoomInfo = new RoomInfo(
                roomData["roomId"]
               ,roomData["hostId"]
               ,roomData["myId"]
               ,responseConverter.convertToMembers());

            setRoomInfo(() => {
                return updatedRoomInfo;
            });

            const currentClientInfo = updatedRoomInfo.members.filter(member=>member.id === updatedRoomInfo.myId)[0];
            setClient(()=>currentClientInfo);
        });

        newSocket.on(ServerSocketEvent.SOMEONE_ENTER, (data) => {
            const roomData = JSON.parse(data);
            const responseConverter = new ClientMembersResponse(roomData["members"]);
            setRoomInfo((prevRoomInfo) => {
                if (!prevRoomInfo) {
                    return; 
                }

                const updatedRoomInfo = new RoomInfo(
                    prevRoomInfo.roomId,
                    prevRoomInfo.hostId,
                    prevRoomInfo.myId,
                    responseConverter.convertToMembers()
                );
                return updatedRoomInfo;
            });
        });

        newSocket.on(ServerSocketResposneEvent.JOIN_FAIL, (errMsg) => {
            Swal.fire({
                title: errMsg,
                confirmButtonColor: '#3479AD',
                confirmButtonText: '확인',
                width: '500px'
            });
        });

        newSocket.on(ServerSocketResposneEvent.KICK, ()=>{
            setIsKick(()=>true);
        });

        newSocket.on("startSuccess", ()=>{
            const rid = new URLSearchParams(window.location.search).get("rid");
            window.location.href = `/game?rid=${rid}`;
        });

        newSocket.on("startFail", (data)=>{
            Swal.fire({
                title: data,
                confirmButtonColor: '#3479AD',
                confirmButtonText: '확인',
                width: '500px'
            });
        })

        setSocket(newSocket);
    };

    const createRoom = (token: string) => {
        if(socket) {
            socket.emit(ClientSocketEvent.CREATE_ROOM, token);
        }
    };

    const joinRoom = (roomId: string, token: string) => {
        if(roomId) {
            socket?.emit(ClientSocketEvent.JOIN_ROOM, { roomId: roomId, token: token});
        }
    }

    const getHostNickName = () => {
        const host = roomInfo?.members.filter(member=>member.id === roomInfo.hostId)[0];
        return host?.nickname || "";
    }

    const emitGameEvent = (eventType: any, data: any) => {
        if(socket) {
            socket.emit(eventType, data);
        }
    }

    useEffect(() => {
        connect();
    }, []);

    return [{createRoom, joinRoom, getHostNickName, emitGameEvent, roomInfo, roomId, socket, client, isKick}];
};