import { Server } from "socket.io";
import { ConnectEvent, JoinEvent, ExitEvent, MemberActionEvent } from "../socket/utils/eventType";
import { createRoomEventHandler, joinRoomEventHandler, exitEventHandler, memberChatEventHandler, memberNickNameEventHandler } from "./utils/roomSocketEventHandler"

const socketMapper = (httpServer: any) => {
    const io = new Server(httpServer, {
        cors:{
          origin: "*",
          methods: ["GET", "POST"]
        },
        transports: ["websocket", "polling"]
    });

    io.on(ConnectEvent.connection, (socket) => {
        console.log(`Connected: ${socket.id}`);
        console.log(`address :  ${socket.handshake.address}`)
      
        // 방 생성 Event Handler
        socket.on(JoinEvent.create, () => {
          createRoomEventHandler(socket);
        });
        
        // 방 입장 Event Handler
        socket.on(JoinEvent.join, (roomId: string) => {
          joinRoomEventHandler(roomId, socket);
        });
        
        // 방 떠나기 또는 소켓 연결이 끊어진 경우(브라우저 종료 등)
        Object.values(ExitEvent).forEach(event=>{
          socket.on(event, ()=>{
            console.log(`Disconnected: ${socket.id}`);
            console.log(io.sockets.adapter.rooms);
            exitEventHandler(event, socket);
          })
        });

        socket.on(MemberActionEvent.chat, (msg: string)=>{
          memberChatEventHandler(socket, msg, (roomId:string, chat: string) => {
            return io.to(roomId).emit(MemberActionEvent.chat, chat);
          });
        });

        socket.on(MemberActionEvent.updateNickName, (data)=>{
          memberNickNameEventHandler(socket, data);
        })
    });

    return io;
}

export = socketMapper;