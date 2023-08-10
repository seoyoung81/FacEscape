// game 안에 들어갈 data를 manage 하는 class
import { Socket, Server } from "socket.io";
class GameManager {
  private scene: any;
  private players: Map<string, Object> = new Map();
  private walls: any;
  private cannonBalls: any;

  constructor(private io: Server) {}

  addPlayer(socketId: string, player: Object) {
    this.players.set(socketId, player);
  }

  removePlayer(socketId: string) {
    this.players.delete(socketId);
  }

  updatePlayer(socketId: string, playerData: any) {
    const player = this.players.get(socketId);
    if (player) {
      // Update player based on received data
    }
  }

  broadcastGameState() {
    const gameState = this.scene;
    this.scene.test;
    this.io.emit("gameStateUpdate", gameState);
  }
}
