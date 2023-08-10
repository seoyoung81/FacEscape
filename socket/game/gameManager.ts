// game 안에 들어갈 data를 manage 하는 class

import { Socket, Server } from "socket.io";
import { Player } from "./utils/player";
export class GameManager {
  private scene: any;
  private players: Map<string,Player> = new Map();
  private walls: any;
  private cannonBalls: any;

  constructor(private io: Server) {}

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

  createWall() {
    
  }

  destroyWall() {
    
  }

  updateCannonBall() {
    
  }

  broadcastGameState() {
    const gameState = this.scene;
    this.scene.test;
    this.io.emit("gameStateUpdate", gameState);
  }
}