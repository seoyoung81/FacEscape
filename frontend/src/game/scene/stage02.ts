import Phaser from "phaser";
import stage02 from "../assets/data/stage02.json";
import background from "../assets/images/background.png";
import terrain from "../assets/images/terrain.png";
import frogIdle from "../assets/images/NinjaFrog/idle.png";
import frogRun from "../assets/images/NinjaFrog/run.png";
import frogJump from "../assets/images/NinjaFrog/jump.png";
import frogFall from "../assets/images/NinjaFrog/fall.png";

// import timeGaugePNG from "../assets/images/timegauge.png";
// import timeGaugeJSON from "../assets/images/timegauge.json";
import cannonIdle from "../assets/images/Idle.png";
import cannonShoot from "../assets/images/shoot.png";
import cannonBall from "../assets/images/cannonBall.png";
import key from "../assets/images/key.png";
import doorIdle from "../assets/images/Door/doorIdle.png";
import doorOpening from "../assets/images/Door/doorOpening.png";

// import { TimeGauge } from "../object/timegauge";
import { Player } from "../object/player";
import { Cannon } from "../object/cannon";
import { Key } from "../object/key";
import { Door } from "../object/door";

import { STAGE_EVENT } from "../event";

export default class Stage02 extends Phaser.Scene {
  constructor() {
    super({
      key: "Stage02",
    });
  }

  player!: Player;
  playerId!: number;
  otherPlayers: Map<number, Player> = new Map<number, Player>();
  otherPlayersGroup!: Phaser.Physics.Arcade.Group;
  platformLayer!: Phaser.Tilemaps.TilemapLayer | any;
  // timeGauge!: TimeGauge;

  cannons: Cannon[] = [];
  cannonBalls!: Phaser.Physics.Arcade.Group;

  key!: Phaser.Physics.Arcade.Sprite;
  isKeyPicked!: boolean;
  keyPickerId!: number;
  door!: Door;
  doorOpened: boolean = false;

  gameClear: boolean = false;

  mapWidth: number = 96;
  mapHeight: number = 160;
  tileWidth: number = 16;
  tileHeight: number = 16;

  stageNumber: number = 2;

  preload(): void {
    this.load.tilemapTiledJSON("stage02", stage02);
    this.load.image("bg", background);
    this.load.image("terrain", terrain);
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

    // this.load.atlas("timeGauge", timeGaugePNG, timeGaugeJSON);

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

    this.events.addListener("stageClearSuccess", () => {
      this.scene.start("StageSelect");
    });

    this.events.addListener(STAGE_EVENT.SET_PLAYER_ID_SUCCESS, (data: any) => {
      this.playerId = data.id;
    });

    this.game.events.emit(STAGE_EVENT.SET_PLAYER_ID, this.scene.key);

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
      key: "stage02",
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
    this.cameras.main.scrollX = 480;
    this.cameras.main.scrollY = 1200;

    map.setCollisionByExclusion([-1]);
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
    // this.timeGauge = new TimeGauge(
    //   this,
    //   this.game.canvas.width / 2,
    //   this.game.canvas.height / 6,
    //   "timeGauge"
    // );

    this.events.addListener(STAGE_EVENT.PICKED_KEY_SUCCESS, (data: any) => {
      // this.shoot.destroy();
      this.keyPickerId = data.id;
      this.isKeyPicked = true;
    });
    // create key
    this.key = new Key(this, 1200, 270, "key", [this.platformLayer]).setScale(
      0.09
    );
    // create door
    this.door = new Door(this, 1300, 270, "doorIdle", [
      this.platformLayer,
    ]).setDepth(-1);

    const cannon1 = new Cannon(this, 120, 2020, "cannon", [
      this.platformLayer,
      this.player,
    ]);
    cannon1.flipX = true;
    this.cannons.push(cannon1);

    const cannon2 = new Cannon(this, 170, 1300, "cannon", [
      this.platformLayer,
      this.player,
    ]);
    cannon2.flipX = true;
    this.cannons.push(cannon2);

    const cannon3 = new Cannon(this, 90, 550, "cannon", [
      this.platformLayer,
      this.player,
    ]);
    cannon3.flipX = true;
    this.cannons.push(cannon3);

    const cannon4 = new Cannon(this, 90, 750, "cannon", [
      this.platformLayer,
      this.player,
    ]);
    cannon4.flipX = true;
    this.cannons.push(cannon4);

    this.cannonBalls = this.physics.add.group();

    this.cannons.forEach((cannon) => {
      // cannon.update();
      this.time.addEvent({
        delay: 2100, // 대포 발사 간격
        callback: () => {
          const cannonBall = this.physics.add.sprite(
            cannon.x,
            cannon.y,
            "cannonBall"
          );
          this.cannonBalls.add(cannonBall);
          cannonBall.body.allowGravity = false;
          cannonBall.setVelocityX(300);
          this.physics.add.overlap(this.player, cannonBall, () => {
            this.knockBack(this.player);
            cannonBall.destroy();
          });

          this.physics.add.overlap(this.otherPlayersGroup, cannonBall, () => {
            cannonBall.destroy();
          });
        },
        callbackScope: this,
        loop: true,
      });
    });

    this.physics.add.collider(this.player, this.platformLayer!);
    this.physics.add.collider(this.otherPlayersGroup, this.platformLayer!);
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

    this.physics.add.overlap(this.door, this.player, () => {
      if (this.playerId === this.keyPickerId) {
        this.stageClear();
      }
    });
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
      const pushBackVelocityX = 300;
      const pushBackVelocityY = -300;
      player.setVelocity(pushBackVelocityX, pushBackVelocityY);
    }, 30);
  }

  update(): void {
    this.player.getPlayerState();
    this.player.update();
    this.game.events.emit(STAGE_EVENT.UPDATE_PLAYER, {
      id: this.playerId,
      x: this.player.x,
      y: this.player.y,
      sceneKey: this.scene.key,
    });
    this.cameras.main.scrollX = this.player.x - this.cameras.main.width / 2;
    this.cameras.main.scrollY = this.player.y - this.cameras.main.height / 2;

    if (!this.isKeyPicked) {
      // this.cannons.update();
    } else {
      // this.cannon.setTexture("cannon");
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
