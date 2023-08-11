// game 안에 들어갈 data를 manage 하는 class

import { Socket, Server } from "socket.io";
import { Player } from "./objects/player";
export class GameManager {
  private currentScene!: Phaser.Scene;
  private players: Map<string, Player> = new Map();
  private cannonBalls: Map<String, Object> = new Map();

  constructor(private io: Server) {}

  enterScene(socketId: string, scene: Phaser.Scene) {
    this.currentScene = scene;
  }

  addPlayer(socketId: string, player: Player) {
    this.players.set(socketId, player);
  }

  removePlayer(socketId: string) {
    this.players.delete(socketId);
  }

  updatePlayer(socketId: string, playerData: Player) {
    const player = this.players.get(socketId);
    if (player) {
      player.setX(playerData.x);
      player.setY(playerData.y);
    }
  }

  killPlayer(socket: string, player: Player) {}

  destroyWall() {}

  updateCannonBall() {}

  broadcastGameState() {
    const gameState = this.currentScene;
    this.io.emit("gameStateUpdate", gameState);
  }
}
