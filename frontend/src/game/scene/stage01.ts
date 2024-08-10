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
<<<<<<< HEAD
=======
import { StreamManager } from "openvidu-browser";
>>>>>>> frontend

//====== wall setting ==============
const WALL_START_X = 270;
const WALL_START_Y = 670;

export default class Stage01 extends Phaser.Scene {
  playerId!: number;
  constructor() {
    super({
      key: "Stage01",
    });
  }

  player!: Player;
  otherPlayers: Map<number, Player> = new Map<number, Player>();
  otherPlayersGroup!: Phaser.Physics.Arcade.Group;
  cannon!: Cannon;
  cannonBalls!: Phaser.Physics.Arcade.Group;
  platformLayer!: Phaser.Tilemaps.TilemapLayer | null;
  walls!: Phaser.Physics.Arcade.Group;
  key!: Phaser.Physics.Arcade.Sprite;
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

  domElement!: Phaser.GameObjects.DOMElement;

  preload(): void {
    this.isKeyPicked = false;
    this.keyPickerId = -1;
    this.doorOpened = false;
    this.gameClear = false;
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
    this.otherPlayersGroup = this.physics.add.group();

    this.events.addListener(STAGE_EVENT.SET_PLAYER_ID_SUCCESS, (data: any) => {
      this.playerId = data.id;
    });
    this.game.events.emit(STAGE_EVENT.SET_PLAYER_ID, this.scene.key);

<<<<<<< HEAD
    this.events.addListener(STAGE_EVENT.CREATE_PLAYER_SUCCESS, (playerData: any) => {
      if (playerData.id !== this.playerId && this.otherPlayers.get(playerData.id) === undefined) {
        const newPlayer = new Player(this, playerData.x, playerData.y, "idle", ["platformLayer"]);
        this.otherPlayers.set(playerData.id, newPlayer);
        this.otherPlayersGroup.add(newPlayer);
      } else {
        // 이미 생성된 플레이어인 경우 위치 업데이트
        const existingPlayer = this.otherPlayers.get(playerData.id);
        existingPlayer?.setPosition(playerData.x, playerData.y);
      }
    });

    this.events.addListener(STAGE_EVENT.UPDATE_PLAYER_SUCCESS, (playerData: any) => {
      if (playerData.id !== this.playerId) {
        if (this.otherPlayers.get(playerData.id) === undefined) {
        }
        this.otherPlayers.get(playerData.id)!.x = playerData.x;
        this.otherPlayers.get(playerData.id)!.y = playerData.y;
      }
    });
=======
    this.events.addListener(
      STAGE_EVENT.CREATE_PLAYER_SUCCESS,
      (playerData: any) => {
        if (
          playerData.id !== this.playerId &&
          this.otherPlayers.get(playerData.id) === undefined
        ) {
          const newPlayer = new Player(
            this,
            playerData.x,
            playerData.y,
            "idle",
            ["platformLayer"]
          );
          this.otherPlayers.set(playerData.id, newPlayer);
          this.otherPlayersGroup.add(newPlayer);

          const video = document.createElement("video");
          playerData.remote.stream.addVideoElement(video);
          video.playsInline = true;
          video.width = 60;
          video.height = 60;
          video.autoplay = true;
          newPlayer.setStream(
            this.add.dom(newPlayer.x, newPlayer.y - 50, video)
          );
        }
      }
    );

    this.events.addListener(
      STAGE_EVENT.UPDATE_PLAYER_SUCCESS,
      (playersData: any, remotes: any) => {
        console.log(remotes);
        playersData.forEach((player: any) => {
          if (
            this.otherPlayers.get(player.id) === undefined &&
            this.playerId !== player.id
          ) {
            const newPlayer = new Player(this, player.x, player.y, "idle");

            if (remotes) {
              const streamManager = (remotes as any[]).filter(
                (remote) => remote.member.id === player.id
              )[0];
              if (streamManager) {
                const video = document.createElement("video");
                streamManager.addVideoElement(video);
                video.width = 60;
                video.height = 60;
                video.autoplay = true;
                newPlayer.setStream(
                  this.add.dom(newPlayer.x, newPlayer.y - 50, video)
                );
              }
            }

            this.otherPlayers.set(player.id, newPlayer);
            this.otherPlayersGroup.add(this.otherPlayers.get(player.id)!);
          }
          if (this.playerId !== player.id) {
            const otherPlayer = this.otherPlayers.get(player.id);
            if (otherPlayer) {
              otherPlayer.x = player.x;
              otherPlayer.y = player.y;

              const memberStream = otherPlayer.getStream();
              if (memberStream) {
                memberStream.x = player.x;
                memberStream.y = player.y - 50;
              }
            }
          }
        });
      }
    );
>>>>>>> frontend

    this.events.addListener("stageClearSuccess", () => {
      this.otherPlayers.clear();
      this.otherPlayersGroup.clear(false, true);
      this.otherPlayersGroup = this.physics.add.group();
<<<<<<< HEAD
      this.scene.start("StageSelect");
    });

    this.events.addListener("cannonShoot", (data: any) => {
      const cannonBall = this.physics.add.sprite(this.cannon.x, this.cannon.y, "cannonBall");
=======

      console.log(this.otherPlayersGroup.getLength());

      this.scene.start("StageSelect");
    });

    this.events.addListener("insertVideo", (data: any) => {
      const video = document.createElement("video");
      data.stream.addVideoElement(video);
      video.playsInline = true;
      video.width = 60;
      video.height = 60;
      video.autoplay = true;
      this.domElement = this.add.dom(this.player.x, this.player.y - 50, video);
    });

    this.events.addListener("cannonShoot", (data: any) => {
      const cannonBall = this.physics.add.sprite(
        this.cannon.x,
        this.cannon.y,
        "cannonBall"
      );
>>>>>>> frontend
      this.cannonBalls.add(cannonBall);
      cannonBall.body.allowGravity = false;
      cannonBall.setVelocityX(-1200);
      this.physics.add.overlap(this.player, cannonBall, () => {
        cannonBall.destroy();
      });

      this.physics.add.overlap(this.otherPlayersGroup!, cannonBall, () => {
        cannonBall.destroy();
      });
    });
  }

  create(userStartPos: any): void {
<<<<<<< HEAD
    // this.otherPlayersGroup!.clear(true, true);
    // this.otherPlayers.clear();
=======
>>>>>>> frontend
    this.otherPlayersGroup = this.physics.add.group();
    this.otherPlayers = new Map<number, Player>();
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
    let startingPoint: any;
    userStartPos.forEach((player: any) => {
      if (this.playerId === player.id) {
        startingPoint = player;
      }
    });
<<<<<<< HEAD
    this.player = new Player(this, startingPoint.startX, startingPoint.startY, "idle");
=======
    this.player = new Player(
      this,
      startingPoint.startX,
      startingPoint.startY,
      "idle"
    );
>>>>>>> frontend

    this.game.events.emit(STAGE_EVENT.CREATE_PLAYER, {
      id: this.playerId,
      x: this.player.x,
      y: this.player.y,
      sceneKey: this.scene.key,
    });

    this.events.addListener(STAGE_EVENT.PICKED_KEY_SUCCESS, (data: any) => {
      this.keyPickerId = data.id;
      this.isKeyPicked = true;
    });

    // create cannon
    this.cannon = new Cannon(this, 1000, 660, "cannon");
    // create walls
    this.walls = this.physics.add.group();
    this.addWall();
    // create cannonBall
    this.cannonBalls = this.physics.add.group();
    // create key
<<<<<<< HEAD
    this.key = new Key(this, 50, 660, "key", [this.platformLayer]).setScale(0.09);
    // create doorc
    this.door = new Door(this, 700, 660, "doorIdle", [this.platformLayer]).setDepth(-1);
=======
    this.key = new Key(this, 50, 660, "key", [this.platformLayer]).setScale(
      0.09
    );
    // create doorc
    this.door = new Door(this, 700, 660, "doorIdle", [
      this.platformLayer,
    ]).setDepth(-1);
>>>>>>> frontend

    // colliders
    this.physics.add.collider(this.player, this.platformLayer!);
    this.physics.add.collider(this.player, this.cannon);
    this.physics.add.collider(this.cannon, this.platformLayer!);
    this.physics.add.collider(this.walls, this.platformLayer!);
    this.physics.add.collider(this.walls, this.walls);
<<<<<<< HEAD
    this.physics.add.collider(this.cannonBalls, this.walls, (cannonBall, wall) => {
      cannonBall.destroy();
      wall.destroy();
    });
=======
    this.physics.add.collider(
      this.cannonBalls,
      this.walls,
      (cannonBall, wall) => {
        cannonBall.destroy();
        wall.destroy();
      }
    );
>>>>>>> frontend

    this.physics.add.collider(this.otherPlayersGroup!, this.player);
    this.physics.add.collider(this.otherPlayersGroup!, this.platformLayer!);

    this.physics.add.collider(this.player, this.key, () => {
      this.isKeyPicked = true;
      this.keyPickerId = this.playerId;
      this.game.events.emit(STAGE_EVENT.PICKED_KEY, {
        sceneKey: this.scene.key,
        id: this.playerId,
      });
    });

    this.physics.add.overlap(this.door, this.player, () => {
      if (this.playerId === this.keyPickerId) {
        this.stageClear();
      }
    });

<<<<<<< HEAD
    this.domElement = this.add.dom(
      this.player.x,
      this.player.y,
      "video",
      {
        style: {
          width: "200px",
          height: "100px",
          backgroundColor: "blue",
          color: "white",
          textAlign: "center",
        },
      },
      "Hello, Phaser DOM Element!"
    );

    this.input.keyboard?.on("keydown-R", () => {
      this.scene.start("StageSelect");
=======
    this.game.events.emit("creatVideoObj", {
      sceneKey: this.scene.key,
>>>>>>> frontend
    });
  }

  stageClear(): void {
    if (!this.gameClear) {
      this.gameClear = true;
<<<<<<< HEAD
      this.game.events.emit("getClearInfo",this.stageNumber);
=======
      this.game.events.emit("getClearInfo", this.stageNumber);
>>>>>>> frontend
    }
  }

  update(): void {
    this.player.update();
<<<<<<< HEAD
    this.domElement.x = this.player.x;
    this.domElement.y = this.player.y;
=======
    if (this.domElement) {
      this.domElement.x = this.player.x;
      this.domElement.y = this.player.y - 50;
    }
>>>>>>> frontend
    this.game.events.emit(STAGE_EVENT.UPDATE_PLAYER, {
      id: this.playerId,
      x: this.player.x,
      y: this.player.y,
      sceneKey: this.scene.key,
    });

<<<<<<< HEAD
    this.otherPlayers.forEach(function (value, key) {});

=======
>>>>>>> frontend
    if (!this.isKeyPicked) {
      this.cannon.update();
    } else {
      this.cannon.setTexture("cannon");
      if (!this.doorOpened) {
        this.door.play("doorOpenAnims");
        this.doorOpened = true;
      }
      if (this.playerId === this.keyPickerId) {
<<<<<<< HEAD
        // this.key.x = this.player.x;
        // this.key.y = this.player.y - 60;
=======
>>>>>>> frontend
        this.key.body!.enable = false;
        Phaser.Display.Align.To.TopCenter(this.key, this.player, 0, -70);
      } else {
        const picker = this.otherPlayers.get(this.keyPickerId);
<<<<<<< HEAD
        // this.key.x = picker!.x;
        // this.key.y = picker!.y - 60;
=======
>>>>>>> frontend
        this.key.body!.enable = false;
        Phaser.Display.Align.To.TopCenter(this.key, picker!, 0, -70);
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
        this.player.setPosition(this.player.x + 5, this.player.y);
        wall.body.immovable = true;
        wall.body.moves = false;
      });

      this.walls.add(wall);
    }
  }
}
