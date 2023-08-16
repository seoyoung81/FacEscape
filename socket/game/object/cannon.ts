import { clearInterval } from "timers";
import { Room } from "../../room/utils/room";

export class CannonBallGenerator {

    private _room: Room;
    private _broadcastCallBack: (roomId: string, response: any)=>void;
    private _interval: any;
    private _setShooInterval: any;

    constructor(room: Room, broadcastCallBack: (roomId: string, response: any)=>void) {
        this._room = room;
        this._broadcastCallBack = broadcastCallBack;
        this._setShooInterval = setInterval(()=> {
            if(this._room.members.size === this._room.inGameMember.size) {
                this.setShoot();
            }
        }, 1000);
    }

    setShoot() {
        clearInterval(this._setShooInterval);

        this._interval = setInterval(()=>{
            this._broadcastCallBack(this._room.roomId, {
                "sceneKey": this._room.stage || ""
            });
        }, 1000);
    }

    stopShoot() {
        if(!this._interval || this._room.stage !== "Stage01") {
            return;
        }
        
        clearInterval(this._interval);
        this._interval = undefined;
    }
};