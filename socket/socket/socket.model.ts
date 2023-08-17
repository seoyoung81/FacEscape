import { Server } from "socket.io";

import {
  ConnectEvent,
  JoinEvent,
  ExitEvent,
  MemberActionEvent,
  GameActionEvent,
  GameResponseEvent,
  MemberResponseEvent,
} from "../socket/utils/eventType";
import {
  createRoomEventHandler,
  joinRoomEventHandler,
  exitEventHandler,
  memberChatEventHandler,
  memberNickNameEventHandler,
  gameStartEventhandler,
} from "./utils/roomSocketEventHandler";
import { GameEventType } from "../game/utils/gameEventTypes";
import { roomManager } from "../room/roomManager";
import {
  CreatePlayerHandler,
  UpdatePlayerHandler,
  KeyPickHandler,
  DisconnectPlayerHandler,
} from "../game/gameEventHandler";


const socketMapper = (httpServer: any) => {
  const init_xPos_stage1 = 350;
  const init_yPos_stage1 = 660;
 
  const init_xPos_stage2 = 400;
  const init_yPos_stage2 = 2500;

  const init_xPos_stage3 = 50;
  const init_yPos_stage3 = 660;

  type UserStartPos = { id: number; startX: number; startY: number };
  let userStartPos: UserStartPos[] = [];

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"],
  });

  io.on(ConnectEvent.connection, async (socket) => {
    const connectionToken = socket.handshake.query.token || "";
    socket.on(JoinEvent.create, (token: string) => {
      console.log("방 생성 요청 감지 : createRoomEventHandle 실행 ");
      createRoomEventHandler(socket, token);
    });

    // 방 입장 Event Handler
    socket.on(JoinEvent.join, (req: any) => {
      joinRoomEventHandler(socket, req);
    });

    // 방 떠나기 또는 소켓 연결이 끊어진 경우(브라우저 종료 등)
    Object.values(ExitEvent).forEach((event) => {
      socket.on(event, () => {
        console.log(`Disconnected: ${socket.id}`);
        console.log(io.sockets.adapter.rooms);
        exitEventHandler(event, socket, connectionToken as string);
      });
    });

    socket.on(MemberActionEvent.updateNickName, (data: any) => {
      memberNickNameEventHandler(data, (roomId: string, response: string) => {
        return io.to(roomId).emit(MemberActionEvent.updateNickName, response);
      });
    });

    socket.on(GameActionEvent.start, (data: any) => {
      gameStartEventhandler(
        socket,
        parseInt(data.id),
        (roomId: string, response: string) => {
          return io.to(roomId).emit(GameResponseEvent.startSuccess, response);
        }
      );
    });

    // 방장의 스테이지 선택 요청 시
    socket.on(GameEventType.stageSelect, (data: any) => {
      const room = roomManager.getRoom(data.roomId);
      console.log(data.roomId);
      console.log(data);
      if (room) {
        room.clearGameObject();
        room.stage = data.stageName;
        room.setStartStageTime();

        let startX:number;
        let startY:number;

        if(data.stageName==="Stage01"){
          startX = init_xPos_stage1;
          startY = init_yPos_stage1;
        }
        else if(data.stageName==="Stage02"){
          startX = init_xPos_stage2;
          startY = init_yPos_stage2;
        }
        else{
          startX = init_xPos_stage3;
          startY = init_yPos_stage3;
        }


        let i = 0;
        room.members.forEach((member) => {
          userStartPos.push({
            id: member.id,
            startX: startX + 50 * i,
            startY: startY,
          });
        
          i++; // 순회할 때마다 i 값 증가
        });
      }
      io.to(data.roomId).emit(GameEventType.stageSelectSucess, data.stageName, userStartPos);
    });


    socket.on(GameEventType.createPlayer, (data: any) => {
      CreatePlayerHandler(socket, data, (roomId: string, response: any)=>{
        io.to(roomId).emit("cannonShoot", response);
      });
    });

    socket.on(GameEventType.updatePlayer, (data: any) => {
      UpdatePlayerHandler(socket, data);
    });

    socket.on(GameEventType.pickedKey, (data: any) => {
      KeyPickHandler(socket, data);
    });

    socket.on("getClearTime", (data: any) => {
      const room = roomManager.getRoom(data.roomId);

      socket.emit("returnClearTime", room?.stageStartTime, data.stageNumber);
    });

    socket.on("stageClear", (data: any) => {
      io.to(data.roomId).emit("stageClearSuccess", data.stageNumber);
    });
  });

  return io;
};

export = socketMapper;
