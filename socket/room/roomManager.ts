import { Room } from "../room/utils/room";
import * as uuid from "uuid";

class RoomManager {
  private _rooms: Map<string, Room>;

  constructor() {
    this._rooms = new Map<string, Room>();
  }

  createRoom(): Room {
    
    const roomId = uuid.v4();
    
    const newRoom = new Room(roomId);
    
    this._rooms.set(roomId, newRoom);
    return newRoom;
  }

  getRoom(roomId: string): Room | undefined {
    return this._rooms.get(roomId);
  }

  deleteRoom(roomId: string): void {
    this._rooms.delete(roomId);
  }

  exists(id: string): boolean {
    return this._rooms.has(id);
  }
}

export const roomManager = new RoomManager();
