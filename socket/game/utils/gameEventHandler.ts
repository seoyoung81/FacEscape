// game에서 발생하는 event에 따라 gameManager를 control 하는 class

import { Socket, Server } from "socket.io";
import { GameManager } from "../gameManager";
import { Player } from "./player";

// const createScene = (socket: Socket) => {};
// const createPlayer = (socket: Socket) => {};
// const destroyPlayer = (socket: Socket) => {};
// const updatePlayer = (socket: Socket) => {};
// const collidePlayer = (socket: Socket) => {};

export class GameEventHandler {
  constructor(private io: Server, private gameManager: GameManager) {}

  handleConnection(socket: Socket, playerData:Player) {
    console.log(`Player connected: ${socket.id}`);
    // const player = new Player();
    // this.gameManager.addPlayer(socket.id, player);
    this.emitInitialGameData(socket);

    socket.on("playerAction", (playerData: any) => {
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
