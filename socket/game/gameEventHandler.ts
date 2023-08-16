// game에서 발생하는 event에 따라 gameManager를 control 하는 class

import { Socket, Server } from "socket.io";
import { GameEventType } from "./utils/gameEventTypes";
import { roomManager } from "../room/roomManager";
import { CannonBallGenerator } from "./object/cannon";
import { Room } from "../room/utils/room";

<<<<<<< Updated upstream
export const CreatePlayerHandler = async (socket: Socket, data: any) => {
  socket.broadcast
    .to(data.roomId)
    .emit(GameEventType.createPlayerSuccess, data);
=======
export const CreatePlayerHandler = async (socket: Socket, data: any, cannonEventHandler: (roomId: string, response: string)=>void) => {
  socket.broadcast.to(data.roomId).emit(GameEventType.createPlayerSuccess, data);

  const room = roomManager.getRoom(data.roomId);
  if(room?.getGameObjectSize() === 0) {
    const cannon = new CannonBallGenerator(room as Room, (roomId: string, response: string)=>{
      cannonEventHandler(roomId, response);
    });
    room.addGameObject(cannon);
  }
>>>>>>> Stashed changes
};

export const UpdatePlayerHandler = async (socket: Socket, data: any) => {
  socket.broadcast
    .to(data.roomId)
    .emit(GameEventType.updatePlayerSuccess, data);
};

export const KeyPickHandler = async (socket: Socket, data: any) => {
  socket.broadcast.to(data.roomId).emit(GameEventType.pickedKeySuccess, data);
};

export const DisconnectPlayerHandler = async (socket: Socket, data: any) => {
  socket.broadcast.to(data.roomId).emit(GameEventType.destroyPlayer, data);
};
