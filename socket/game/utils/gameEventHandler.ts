// game에서 발생하는 event에 따라 gameManager를 control 하는 class

import { Socket, Server } from "socket.io";
import { GameManager } from "../gameManager";
import { Player } from "../objects/player";
import { GameEventType } from "./gameEventTypes";

export class GameEventHandler {
  constructor(private io: Server, private gameManager: GameManager) {}

  handleConnection(socket: Socket) {
    socket.on(GameEventType.stageSelect, (sceneName) => {
      console.log(sceneName);
      socket.emit(GameEventType.stageSelectSucess, sceneName);
    });

    socket.on(GameEventType.createPlayer, (playerData) => {
      socket.broadcast.emit(GameEventType.createPlayerSuccess, playerData);
    });

    socket.on(GameEventType.updatePlayer, (playerData) => {
      socket.emit(GameEventType.updatePlayerSuccess, playerData);
    });

    socket.on("disconnect", () => {
      console.log(`Player disconnected: ${socket.id}`);
      socket.emit(GameEventType.destroyPlayer, socket.id);
    });
  }

  emitInitialGameData(socket: Socket) {
    const initialGameData = null;
    socket.emit("initialGameData", initialGameData);
  }
}
