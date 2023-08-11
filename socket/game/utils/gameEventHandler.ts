// game에서 발생하는 event에 따라 gameManager를 control 하는 class

import { Socket, Server } from "socket.io";
import { GameManager } from "../gameManager";
import { Player } from "../objects/player";
import { GameEventType } from "./gameEventTypes";

// const createScene = (socket: Socket) => {};
// const createPlayer = (socket: Socket) => {};
// const destroyPlayer = (socket: Socket) => {};
// const updatePlayer = (socket: Socket) => {};
// const collidePlayer = (socket: Socket) => {};

export class GameEventHandler {
  constructor(private io: Server, private gameManager: GameManager) {}
  handleConnection(
    socket: Socket,
    currentScene: Phaser.Scene,
    playerData: Player
  ) {
    console.log(`Player connected: ${socket.id}`);

    socket.on(GameEventType.enterScene, () => {});

    socket.on(GameEventType.createPlayer, () => {
      this.emitInitialGameData(socket);
    });

    socket.on(GameEventType.updatePlayer, (playerData: Player) => {
      this.gameManager.updatePlayer(socket.id, playerData);
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
