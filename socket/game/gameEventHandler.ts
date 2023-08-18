// game에서 발생하는 event에 따라 gameManager를 control 하는 class

import { Socket, Server } from "socket.io";
import { GameEventType } from "./utils/gameEventTypes";
import { roomManager } from "../room/roomManager";
import { CannonBallGenerator } from "./object/cannon";
import { Room } from "../room/utils/room";
import { Player } from "./object/player";

let playersData: Player[] = [];

export const CreatePlayerHandler = async (
  socket: Socket,
  data: any,
  cannonEventHandler: (roomId: string, response: string) => void
) => {
  let newPlayer = new Player(data.id, data.x, data.y, data.sceneKey);
  playersData.push(newPlayer);

  socket.broadcast
    .to(data.roomId)
    .emit(GameEventType.createPlayerSuccess, data);

  const room = roomManager.getRoom(data.roomId);
  if (room?.getGameObjectSize() === 0) {
    const cannon = new CannonBallGenerator(
      room as Room,
      (roomId: string, response: string) => {
        cannonEventHandler(roomId, response);
      }
    );
    room.addGameObject(cannon);
  }
};

export const UpdatePlayerHandler = async (socket: Socket, data: any) => {
  playersData.forEach((player) => {
    if (player.id === data.id) {
      player.x = data.x;
      player.y = data.y;
      player.stage = data.sceneKey;
    }
  });
  socket.broadcast
    .to(data.roomId)
    .emit(GameEventType.updatePlayerSuccess, data, playersData);
};

export const KeyPickHandler = async (socket: Socket, data: any) => {
  const room = roomManager.getRoom(data.roomId);
  const gameObj = room?.gameObject;

  if (room && gameObj && gameObj.length !== 0) {
    gameObj.forEach((gameObj) => {
      gameObj.stopShoot();
    });
  }

  socket.broadcast.to(data.roomId).emit(GameEventType.pickedKeySuccess, data);
};

export const DisconnectPlayerHandler = async (socket: Socket, data: any) => {
  socket.broadcast.to(data.roomId).emit(GameEventType.destroyPlayer, data);
};
