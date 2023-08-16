import * as Phaser from "phaser";
import stage01 from "../assets/data/stage01.json";
import background from "../assets/images/background.png";
import terrain from "../assets/images/terrain.png";
import frogIdle from "../assets/images/NinjaFrog/idle.png";
import frogRun from "../assets/images/NinjaFrog/run.png";
import frogJump from "../assets/images/NinjaFrog/jump.png";
import frogFall from "../assets/images/NinjaFrog/fall.png";
import cannonIdle from "../assets/images/Idle.png";
import cannonShoot from "../assets/images/shoot.png";
import cannonBall from "../assets/images/cannonBall.png";
import wall from "../assets/images/wall.png";
import key from "../assets/images/key.png";

import doorIdle from "../assets/images/Door/doorIdle.png";
import doorOpening from "../assets/images/Door/doorOpening.png";

import { Player } from "../object/player";
import { Cannon } from "../object/cannon";
import { Key } from "../object/key";
import { Door } from "../object/door";

import { STAGE_EVENT } from "../event";

//====== wall setting ==============
const WALL_START_X = 270;
const WALL_START_Y = 670;
// const WALL_GAP = 90;
// const WALL_Y_OFFSET = 10;

export default class Stage01 extends Phaser.Scene {
  constructor() {
    super({
      key: "Stage01",
    });
  }
  player!: Player;
  playerId!: number;
  otherPlayers: Map<number, Player> = new Map<number, Player>();
  otherPlayersGroup!: Phaser.Physics.Arcade.Group;
  cannon!: Cannon;
  cannonBalls!: Phaser.Physics.Arcade.Group;
  shoot!: Phaser.Time.TimerEvent;
  platformLayer!: Phaser.Tilemaps.TilemapLayer | null;
  walls!: Phaser.Physics.Arcade.Group;
  key!: Phaser.GameObjects.Sprite;
  isKeyPicked!: boolean;
  keyPickerId!: number;
  door!: Door;
  doorOpened: boolean = false;

  gameClear: boolean = false;

  mapWidth: number = 95;
  mapHeight: number = 48;
  tileWidth: number = 16;
  tileHeight: number = 16;

  stageNumber: number = 1;

  preload(): void {
    this.load.tilemapTiledJSON("stage01", stage01);
    this.load.image("terrain", terrain);
    this.load.image("bg", background);

    this.load.image("jump", frogJump);
    this.load.image("fall", frogFall);
    this.load.spritesheet("idle", frogIdle, {
      frameWidth: 32,
      frameHeight: 32,
      endFrame: 10,
    });

    this.load.spritesheet("run", frogRun, {
      frameWidth: 32,
      frameHeight: 32,
      endFrame: 11,
    });

    this.load.image("cannon", cannonIdle);
    this.load.spritesheet("shoot", cannonShoot, {
      frameWidth: 44,
      frameHeight: 28,
      endFrame: 3,
    });
    this.load.image("cannonBall", cannonBall);
    this.load.image("wall", wall);
    this.load.image("key", key);
    this.load.image("doorIdle", doorIdle);
    this.load.spritesheet("doorOpening", doorOpening, {
      frameWidth: 46,
      frameHeight: 56,
    });

    this.events.addListener(STAGE_EVENT.SET_PLAYER_ID_SUCCESS, (data: any) => {
      this.playerId = data.id;
    });

    this.game.events.emit(STAGE_EVENT.SET_PLAYER_ID, this.scene.key);
    console.log(`current playerId: ${this.playerId}`);

    this.otherPlayersGroup = this.physics.add.group();
    this.events.addListener(
      STAGE_EVENT.CREATE_PLAYER_SUCCESS,
      (playerData: any) => {
        if (playerData.id !== this.playerId) {
          const newPlayer = new Player(
            this,
            playerData.x,
            playerData.y,
            "idle",
            ["platformLayer"]
          );
          this.otherPlayers.set(playerData.id, newPlayer);
          this.otherPlayersGroup.add(newPlayer);
        } else {
          // const existingPlayer = this.otherPlayer
        }
      }
    );

    this.events.addListener(
      STAGE_EVENT.UPDATE_PLAYER_SUCCESS,
      (playerData: any) => {
        if (playerData.id !== this.playerId) {
          this.otherPlayers.get(playerData.id)!.setX(playerData.x);
          this.otherPlayers.get(playerData.id)!.setY(playerData.y);
        }
      }
    );

    this.events.addListener("stageClearSuccess", () => {
      // this.otherPlayers.clear();
      // this.otherPlayersGroup.clear(true, true);
      this.scene.start("StageSelect");
    });
  }

  create(): void {
    this.isKeyPicked = false;

    // add background
    const bg = this.add.image(0, 0, "bg").setOrigin(0).setScale(1);
    bg.displayWidth = this.cameras.main.width;
    bg.displayHeight = this.cameras.main.height;
    bg.depth = -2;

    // create map
    const map = this.make.tilemap({
      key: "stage01",
      tileWidth: 16,
      tileHeight: 16,
    });
    map.addTilesetImage("terrain", "terrain");

    // add collision
    map.setCollisionByExclusion([-1]);
    // create layer
    this.platformLayer = map.createLayer("platformLayer", ["terrain"]);
    // create player
    this.player = new Player(this, this.playerId * 5 + 330, 660, "idle");
    this.events.addListener(STAGE_EVENT.PICKED_KEY_SUCCESS, (data: any) => {
      this.shoot.destroy();
      this.keyPickerId = data.id;
      this.isKeyPicked = true;
    });

    this.game.events.emit(STAGE_EVENT.CREATE_PLAYER, {
      id: this.playerId,
      x: this.player.x,
      y: this.player.y,
      sceneKey: this.scene.key,
    });

    // create cannon
    this.cannon = new Cannon(this, 1000, 660, "cannon");
    // create walls
    this.walls = this.physics.add.group();
    this.addWall();
    // create cannonBall
    this.cannonBalls = this.physics.add.group();
    // create key
    this.key = new Key(this, 50, 660, "key", [this.platformLayer]).setScale(
      0.09
    );

    // create door
    this.door = new Door(this, 700, 660, "doorIdle", [
      this.platformLayer,
    ]).setDepth(-1);

    this.shoot = this.time.addEvent({
      delay: 3000,
      callback: () => {
        const cannonBall = this.physics.add.sprite(
          this.cannon.x,
          this.cannon.y,
          "cannonBall"
        );
        this.cannonBalls.add(cannonBall);
        cannonBall.body.allowGravity = false;
        cannonBall.setVelocityX(-1200);
        this.physics.add.overlap(this.player, cannonBall, () => {
          // this.player.setPosition(this.player.x + 5, this.player.y);
          cannonBall.destroy();
        });

        this.physics.add.overlap(this.otherPlayersGroup, cannonBall, () => {
          // this.player.setPosition(this.player.x + 5, this.player.y);
          cannonBall.destroy();
        });
      },
      callbackScope: this,
      loop: true,
    });

    // key, player collider
    // this.events.on("postupdate", () => {
    //   if (this.isKeyPicked) {
    //     //this.key.body!.enable = false;
    //     Phaser.Display.Align.To.TopCenter(this.key, this.player, 0, -130);
    //   }
    // });

    // colliders
    this.physics.add.collider(this.player, this.platformLayer!);
    this.physics.add.collider(this.player, this.cannon);
    this.physics.add.collider(this.cannon, this.platformLayer!);
    this.physics.add.collider(this.walls, this.platformLayer!);
    this.physics.add.collider(this.walls, this.walls);
    this.physics.add.collider(
      this.cannonBalls,
      this.walls,
      (cannonBall, wall) => {
        cannonBall.destroy();
        wall.destroy();
      }
    );

    this.physics.add.collider(this.otherPlayersGroup, this.player);
    this.physics.add.collider(this.otherPlayersGroup, this.platformLayer!);

    this.physics.add.collider(this.player, this.key, () => {
      this.shoot.destroy();
      this.isKeyPicked = true;
      this.keyPickerId = this.playerId;
      this.game.events.emit(STAGE_EVENT.PICKED_KEY, {
        sceneKey: this.scene.key,
        id: this.playerId,
      });
    });

    this.physics.add.overlap(this.door, this.player, () => {
      if (this.playerId === this.keyPickerId) {
        console.log("overlapping door");
        this.stageClear();
      }
    });

    this.input.keyboard?.on("keydown-R", () => {
      this.scene.start("StageSelect");
    });
  }

  stageClear(): void {
    if (!this.gameClear) {
      this.gameClear = true;
      this.game.events.emit("getClearTime", this.playerId, this.stageNumber);
    }
  }

  update(): void {
    this.player.update();
    this.game.events.emit(STAGE_EVENT.UPDATE_PLAYER, {
      id: this.playerId,
      x: this.player.x,
      y: this.player.y,
      sceneKey: this.scene.key,
    });

    if (!this.isKeyPicked) {
      this.cannon.update();
    } else {
      this.cannon.setTexture("cannon");
      if (!this.doorOpened) {
        this.door.play("doorOpenAnims");
        this.doorOpened = true;
      }
      if (this.playerId === this.keyPickerId) {
        this.key.x = this.player.x;
        this.key.y = this.player.y - 60;
      } else {
        const picker = this.otherPlayers.get(this.keyPickerId);
        this.key.x = picker!.x;
        this.key.y = picker!.y - 60;
      }
    }

    this.cannonBalls.getChildren().forEach((gameObj) => {
      const cannonBall = gameObj as Phaser.GameObjects.Sprite;

      if (cannonBall.x < 0) {
        this.cannonBalls.killAndHide(cannonBall);
      }
    });
  }

  addWall() {
    for (let i = 0; i < 4; i++) {
      const positionX = WALL_START_X - 50 * i;
      const wall = this.physics.add
        .sprite(positionX, WALL_START_Y, "wall")
        .setScale(0.07)
        .setImmovable(false);
      wall.body.allowGravity = true;

      this.physics.add.collider(this.player, wall, () => {
        wall.body.immovable = true;
        wall.body.moves = false;
      });

      this.walls.add(wall);
    }
  }
}
