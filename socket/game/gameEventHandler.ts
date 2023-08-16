// game에서 발생하는 event에 따라 gameManager를 control 하는 class

import { Socket, Server } from "socket.io";
import { GameEventType } from "./utils/gameEventTypes";

export const CreatePlayerHandler = async (socket: Socket, data: any) => {
  socket.broadcast
    .to(data.roomId)
    .emit(GameEventType.createPlayerSuccess, data);
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
