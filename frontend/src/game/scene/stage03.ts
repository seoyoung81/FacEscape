import Phaser from "phaser";

import stage03 from "../assets/data/stage03.json";
import background from "../assets/images/background.png";
import terrain from "../assets/images/terrain.png";

import frogIdle from "../assets/images/NinjaFrog/idle.png";
import frogRun from "../assets/images/NinjaFrog/run.png";
import frogJump from "../assets/images/NinjaFrog/jump.png";
import frogFall from "../assets/images/NinjaFrog/fall.png";

import trafficLight from "../assets/images/trafficLight.png";
import spikeTrap from "../assets/images/spiketrap.png";
import trampoline from "../assets/images/trampoline.png";
// import trampolineSound from "../assets/audio/trampoline.wav";
import cannonIdle from "../assets/images/Idle.png";
import cannonShoot from "../assets/images/shoot.png";
import cannonBall from "../assets/images/cannonBall.png";
import key from "../assets/images/key.png";
import doorIdle from "../assets/images/Door/doorIdle.png";
import doorOpening from "../assets/images/Door/doorOpening.png";

import { TrafficLight } from "../object/trafficlight";
import { Trampoline } from "../object/trampoline";
import { Player } from "../object/player";
import { SpikeTrap } from "../object/spiketrap";
import { Cannon } from "../object/cannon";
import { Key } from "../object/key";
import { Door } from "../object/door";

import { STAGE_EVENT } from "../event";
export default class Stage03 extends Phaser.Scene {
  constructor() {
    super({
      key: "Stage03",
    });
  }
  player!: Player;
  playerId!: number;
  otherPlayers: Map<number, Player> = new Map<number, Player>();
  otherPlayersGroup!: Phaser.Physics.Arcade.Group;
  cannon!: Cannon;
  cannonBalls!: Phaser.Physics.Arcade.Group;

  platformLayer!: Phaser.Tilemaps.TilemapLayer | any;
  trafficLight!: TrafficLight;
  trampolineJumpSound!: Phaser.Sound.BaseSound;

  key!: Phaser.Physics.Arcade.Sprite;
  isKeyPicked!: boolean;
  keyPickerId!: number;
  door!: Door;
  doorOpened: boolean = false;

  gameClear: boolean = false;

  prevPlayerX: number = 0;
  prevPlayerY: number = 0;

  mapWidth: number = 300;
  mapHeight: number = 48;
  tileWidth: number = 16;
  tileHeight: number = 16;

  stageNumber: number = 3;

  preload(): void {
    this.load.tilemapTiledJSON("stage03", stage03);
    this.load.image("bg", background);
    this.load.image("terrain", terrain);
    this.load.image("trampoline", trampoline);
    this.load.image("spikeTrap", spikeTrap);

    this.load.spritesheet("trafficLight", trafficLight, {
      frameWidth: 256,
      frameHeight: 256,
    });

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
        } else {
          // 이미 생성된 플레이어인 경우 위치 업데이트
          const existingPlayer = this.otherPlayers.get(playerData.id);
          existingPlayer?.setPosition(playerData.x, playerData.y);
        }
      }
    );

    this.events.addListener(
      STAGE_EVENT.UPDATE_PLAYER_SUCCESS,
      (playersData: any) => {
        playersData.forEach((player: any) => {
          if (
            this.otherPlayers.get(player.id) === undefined &&
            this.playerId !== player.id
          ) {
            const newPlayer = new Player(this, player.x, player.y, "idle");
            this.otherPlayers.set(player.id, newPlayer);
            this.otherPlayersGroup.add(this.otherPlayers.get(player.id)!);
          }
          if (this.playerId !== player.id) {
            this.otherPlayers.get(player.id)!.x = player.x;
            this.otherPlayers.get(player.id)!.y = player.y;
          }
        });
      }
    );

    this.events.addListener("stageClearSuccess", () => {
      this.scene.start("StageSelect");
    });
  }

  create(userStartPos: any): void {
    this.otherPlayersGroup = this.physics.add.group();
    this.otherPlayers = new Map<number, Player>();
    this.isKeyPicked = false;
    const bg = this.add.image(0, 0, "bg").setOrigin(0).setScale(1);
    bg.displayWidth = this.mapWidth * this.tileWidth;
    bg.displayHeight = this.mapHeight * this.tileHeight;
    bg.depth = -2;

    const map = this.make.tilemap({
      key: "stage03",
      tileWidth: 16,
      tileHeight: 16,
    });
    map.addTilesetImage("terrain", "terrain");

    this.cameras.main.setBounds(
      0,
      0,
      this.mapWidth * this.tileWidth,
      this.mapHeight * this.tileHeight
    );
    this.physics.world.setBounds(
      0,
      0,
      this.mapWidth * this.tileWidth,
      this.mapHeight * this.tileHeight
    );

    map.setCollisionByExclusion([-1], true);
    this.platformLayer = map.createLayer("platformLayer", ["terrain"]);

    let startingPoint: any;
    userStartPos.forEach((player: any) => {
      if (this.playerId === player.id) {
        startingPoint = player;
      }
    });
    this.player = new Player(
      this,
      startingPoint.startX,
      startingPoint.startY,
      "idle",
      this.platformLayer!
    );

    this.game.events.emit(STAGE_EVENT.CREATE_PLAYER, {
      id: this.playerId,
      x: this.player.x,
      y: this.player.y,
      sceneKey: this.scene.key,
    });

    this.events.addListener(STAGE_EVENT.PICKED_KEY_SUCCESS, (data: any) => {
      // this.shoot.destroy();
      this.keyPickerId = data.id;
      this.isKeyPicked = true;
    });

    this.trafficLight = new TrafficLight(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 6,
      "trafficLight"
    ).setScrollFactor(0);

    // create key
    this.key = new Key(this, 4500, 490, "key", [this.platformLayer]).setScale(
      0.09
    );
    // create door
    this.door = new Door(this, 4700, 470, "doorIdle", [
      this.platformLayer,
    ]).setDepth(-1);

    // 트램펄린 배치
    const trampolinePositions = [
      { x: 790, y: 670 },

      { x: 1480, y: 670 },
      { x: 1504, y: 670 },
      { x: 1528, y: 670 },
      { x: 1552, y: 670 },
      { x: 1576, y: 670 },
      { x: 1600, y: 670 },
      { x: 1624, y: 670 },
      { x: 1648, y: 670 },
      { x: 1672, y: 670 },
      { x: 1696, y: 670 },
      { x: 1720, y: 670 },
      { x: 1744, y: 670 },
      { x: 1768, y: 670 },
      { x: 1792, y: 670 },
      { x: 1816, y: 670 },
      { x: 1840, y: 670 },
      { x: 1864, y: 670 },
      { x: 1888, y: 670 },
      { x: 1912, y: 670 },
      { x: 1936, y: 670 },
      { x: 1960, y: 670 },
      { x: 1984, y: 670 },
      { x: 2008, y: 670 },
      { x: 2032, y: 670 },
      { x: 2056, y: 670 },
      { x: 2080, y: 670 },
      { x: 2104, y: 670 },
      { x: 2128, y: 670 },
      { x: 2152, y: 670 },
      { x: 2176, y: 670 },
      { x: 2200, y: 670 },
      { x: 2224, y: 670 },
      { x: 2248, y: 670 },
      { x: 2272, y: 670 },
      { x: 2296, y: 670 },
      { x: 2320, y: 670 },
    ];

    trampolinePositions.forEach((position) => {
      const trampoline = new Trampoline(
        this,
        position.x,
        position.y,
        "trampoline",
        this.platformLayer
      ).setScale(0.3);
      (trampoline.body as Phaser.Physics.Arcade.Body).setImmovable(true);
      this.physics.add.collider(trampoline, this.platformLayer);
      this.physics.add.collider(
        this.player,
        trampoline,
        trampoline.jumpTrampoline.bind(this.player),
        undefined,
        trampoline
      );
    });

    // 가시 배치
    const spikeTrapPositions = [
      { x: 396, y: 800 },
      { x: 422, y: 800 },
      { x: 448, y: 800 },
      { x: 474, y: 800 },
      { x: 500, y: 800 },

      { x: 604, y: 800 },
      { x: 630, y: 800 },
      { x: 656, y: 800 },
      { x: 682, y: 800 },
      { x: 708, y: 800 },

      { x: 812, y: 800 },
      { x: 838, y: 800 },
      { x: 864, y: 800 },
      { x: 890, y: 800 },
      { x: 918, y: 800 },
      { x: 944, y: 800 },
      { x: 968, y: 800 },
      { x: 992, y: 800 },

      { x: 1164, y: 800 },
      { x: 1190, y: 800 },
      { x: 1216, y: 800 },
      { x: 1242, y: 800 },
      { x: 1268, y: 800 },

      { x: 2556, y: 800 },
      { x: 2580, y: 800 },
      { x: 2604, y: 800 },
      { x: 2628, y: 800 },
    ];

    spikeTrapPositions.forEach((position) => {
      const spikeTrap = new SpikeTrap(
        this,
        position.x,
        position.y,
        "spikeTrap",
        this.platformLayer
      ).setScale(0.13333);
      (spikeTrap.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
      (spikeTrap.body as Phaser.Physics.Arcade.Body).setImmovable(true);
      this.physics.add.collider(spikeTrap, this.platformLayer);
      this.physics.add.collider(
        this.player,
        spikeTrap,
        this.gameOver,
        undefined,
        this
      );
    });

    this.cannon = new Cannon(this, 4500, 420, "cannon", [
      this.platformLayer,
      this.player,
    ]);

    this.cannonBalls = this.physics.add.group();
    this.time.addEvent({
      delay: 2100,
      callback: () => {
        const cannonBall = this.physics.add.sprite(
          this.cannon.x,
          this.cannon.y,
          "cannonBall"
        );
        this.cannonBalls.add(cannonBall);
        cannonBall.body.allowGravity = false;
        cannonBall.setVelocityX(-500);
        this.physics.add.overlap(this.player, cannonBall, () => {
          this.knockBack(this.player);
          cannonBall.destroy();
        });
      },
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(this.otherPlayersGroup, this.player, () => {
      if (this.player.body!.touching.down) {
        setTimeout(() => {
          this.player.setVelocityY(-150);
        }, 30);
      }
    });
    this.physics.add.collider(this.player, this.key, () => {
      // this.shoot.destroy();
      this.isKeyPicked = true;
      this.keyPickerId = this.playerId;
      this.game.events.emit(STAGE_EVENT.PICKED_KEY, {
        sceneKey: this.scene.key,
        id: this.playerId,
      });
    });
    this.physics.add.collider(this.otherPlayersGroup, this.platformLayer!);

    this.physics.add.collider(this.player, this.key, () => {
      // this.shoot.destroy();
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

    // this.input.keyboard?.on("keydown-R", () => {
    //   this.scene.start("StageSelect");
    // });
  }

  stageClear(): void {
    if (!this.gameClear) {
      this.gameClear = true;
      this.game.events.emit("getClearInfo", this.stageNumber);
    }
  }

  knockBack(player: Player) {
    player.setPosition(player.x, player.y - 20);
    setTimeout(() => {
      player.setPlayerState(1);
      const pushBackVelocityX = -300;
      const pushBackVelocityY = -300;
      player.setVelocity(pushBackVelocityX, pushBackVelocityY);
    }, 30);
  }

  gameOver(): void {
    this.player.setPosition((this.playerId % 6) * 50 + 50, 672);
  }

  update(): void {
    this.player.update();
    this.game.events.emit(STAGE_EVENT.UPDATE_PLAYER, {
      id: this.playerId,
      x: this.player.x,
      y: this.player.y,
      sceneKey: this.scene.key,
    });

    if (this.trafficLight.getTrafficLightState() === "red") {
      if (
        this.player.x !== this.prevPlayerX ||
        this.player.y !== this.prevPlayerY
      ) {
        this.gameOver();
      }
    }

    this.cannonBalls
      .getChildren()
      .forEach((cannonBall: Phaser.GameObjects.GameObject) => {
        const sprite = cannonBall as Phaser.Physics.Arcade.Sprite;
        if (sprite.x < 3000) {
          sprite.destroy();
        }
      });

    this.prevPlayerX = this.player.x;
    this.prevPlayerY = this.player.y;

    this.cameras.main.scrollX = this.player.x - this.cameras.main.width / 2;
    this.cameras.main.scrollY = this.player.y - this.cameras.main.height / 2;

    if (!this.isKeyPicked) {
      this.cannon.update();
    } else {
      this.cannon.setTexture("cannon");
      if (!this.doorOpened) {
        this.door.play("doorOpenAnims");
        this.doorOpened = true;
      }
      if (this.playerId === this.keyPickerId) {
        // this.key.x = this.player.x;
        // this.key.y = this.player.y - 60;
        this.key.body!.enable = false;
        Phaser.Display.Align.To.TopCenter(this.key, this.player, 0, -70);
      } else {
        const picker = this.otherPlayers.get(this.keyPickerId);
        // this.key.x = picker!.x;
        // this.key.y = picker!.y - 60;
        this.key.body!.enable = false;
        Phaser.Display.Align.To.TopCenter(this.key, picker!, 0, -70);
      }
    }
  }
}
