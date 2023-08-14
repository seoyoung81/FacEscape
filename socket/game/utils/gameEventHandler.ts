// game에서 발생하는 event에 따라 gameManager를 control 하는 class

import { Socket, Server } from "socket.io";
import { GameManager } from "../gameManager";
import { Player } from "../objects/player";
import { GameEventType } from "./gameEventTypes";

export class GameEventHandler {
  constructor(private io: Server, private gameManager: GameManager) {}

  handleConnection(socket: Socket) {
    socket.on("connection", () => {
      console.log(`Player connected: ${socket.id}`);
      this.gameManager.addPlayer(socket.id, new Player(100, 100, "idle"));
    });

    socket.on(GameEventType.stageSelect, (sceneName) => {
      console.log(sceneName);
      socket.emit(GameEventType.stageSelect);
    });

    socket.on(GameEventType.createOtherPlayers, (socketId) => {
      socket.emit("createOtherPlayers", this.gameManager.getOtherPlayers(socketId));
      this.emitInitialGameData(socket);
    });

    socket.on(GameEventType.updatePlayer, (playerData) => {
      this.gameManager.updatePlayer(playerData);
      socket.emit("updateOtherPlayers", this.gameManager.getOtherPlayers(playerData.socketId));
      this.gameManager.broadcastGameState();
    });

    socket.on("disconnect", () => {
      console.log(`Player disconnected: ${socket.id}`);
      this.gameManager.removePlayer(socket.id);
      this.gameManager.broadcastGameState();
    });
  }

  emitInitialGameData(socket: Socket) {
    const initialGameData = null;
    socket.emit("initialGameData", initialGameData);
  }
}
