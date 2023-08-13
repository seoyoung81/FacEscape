// game 안에 들어갈 data를 manage 하는 class

import { Socket, Server } from "socket.io";
import { Player } from "./objects/player";
export class GameManager {
  private currentScene!: Phaser.Scene;
  private players: Map<string, Player> = new Map();
  private cannonBalls: Map<String, Object> = new Map();

  constructor(private io: Server) {}

  enterScene(scene: Phaser.Scene) {
    this.currentScene = scene;
  }

  // players return
  getPlayers() {
    return this.players;
  }

  // 나를 제외한 players return
  getOtherPlayers(socketId: string) {
    const otherPlayers: Map<string, Player> = new Map<string, Player>();
    this.players.forEach((player, id) => {
      if (id !== socketId) {
        otherPlayers.set(id, player);
      }
    });
    return otherPlayers;
  }
  // players에 player 추가
  addPlayer(socketId: string, player: Player) {
    this.players.set(socketId, player);
  }

  removePlayer(socketId: string) {
    this.players.delete(socketId);
  }

  updatePlayer(playerInfo: any) {
    this.players.get(playerInfo.socketId)!.x = playerInfo.x;
    this.players.get(playerInfo.socketId)!.y = playerInfo.y;
  }

  killPlayer(socket: string, player: Player) {}

  destroyWall() {}

  broadcastGameState() {
    const gameState = this.currentScene;
    this.io.emit("gameStateUpdate", gameState);
  }
}
