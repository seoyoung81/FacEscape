import Phaser from "phaser";

import map from "../assets/data/stage03.json";
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

import { TrafficLight } from "../object/trafficlight";
import { Trampoline } from "../object/trampoline";
import { Player } from "../object/player";
import { SpikeTrap } from "../object/spiketrap";
import { Cannon } from "../object/cannon";
export default class Stage03 extends Phaser.Scene {
  constructor() {
    super({
      key: "Stage03",
    });
  }
  player!: Player;
  cannon!: Cannon;
  cannonBalls!: Phaser.Physics.Arcade.Group;

  platformLayer!: Phaser.Tilemaps.TilemapLayer | any;
  trafficLight!: TrafficLight;
  trampolineJumpSound!: Phaser.Sound.BaseSound;

  private prevPlayerX: number = 0;
  private prevPlayerY: number = 0;

  mapWidth: number = 300;
  mapHeight: number = 46;
  tileWidth: number = 16;
  tileHeight: number = 16;

  preload(): void {
    this.load.tilemapTiledJSON("map", map);
    this.load.image("bg", background);
    this.load.image("terrain", terrain);
    this.load.image("trampoline", trampoline);
    this.load.image("spikeTrap", spikeTrap);
    // this.load.audio("trampolineJumpSound", "../assets/audio/trampoline.wav");

    this.load.spritesheet("trafficLight", trafficLight, {
      frameWidth: 128,
      frameHeight: 128,
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
    this.load.image("cannonBall", cannonBall);
    
    this.load.spritesheet("shoot", cannonShoot, {
      frameWidth: 44,
      frameHeight: 28,
      endFrame: 3,
    });

  }

  create(): void {
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
    this.cameras.main.scrollX = 900;
    this.cameras.main.scrollY = 200;

    // this.add.image(480, 360, "bg");
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 16,
      tileHeight: 16,
    });

    map.addTilesetImage("terrain", "terrain");
    this.platformLayer = map.createLayer("platformLayer", ["terrain"]);
    this.platformLayer.setCollision(1);
    this.platformLayer.setCollisionByExclusion([-1], true);

    this.player = new Player(this, 3000, 400, "idle", this.platformLayer);
    this.trafficLight = new TrafficLight(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 6,
      "trafficLight"
    ).setScrollFactor(0);    

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



  this.cannon = new Cannon(this, 3220, 420, "cannon", [
    this.platformLayer,
    this.player,
  ]);
  this.cannon.flipX = true;

  this.cannonBalls = this.physics.add.group();
  this.time.addEvent({
    delay: 1000,
    callback: () => {
      const cannonBall = this.physics.add.sprite(
        this.cannon.x,
        this.cannon.y,
        "cannonBall"
      );
      this.cannonBalls.add(cannonBall);
      cannonBall.body.allowGravity = false;
      cannonBall.setVelocityX(500);
      this.physics.add.collider(this.player, cannonBall, () => {
        this.knockBack(this.player);
        cannonBall.destroy();
      });
    },
    callbackScope: this,
    loop: true,
  });

  }

  knockBack(player: Player) {
    player.setPlayerState(1);
    const pushBackVelocityX = 300;
    const pushBackVelocityY = -500;
    player.setVelocity(pushBackVelocityX, pushBackVelocityY);
  }

  gameOver(): void {
    console.log("gameOVERRR");
  }

  update(): void {
    this.trafficLight.update();
    this.player.update();

    if (this.trafficLight.getTrafficLightState() === "red") {
      if (
        this.player.x !== this.prevPlayerX ||
        this.player.y !== this.prevPlayerY
      ) {
        console.log("game over");
      }
    }

    this.prevPlayerX = this.player.x;
    this.prevPlayerY = this.player.y;

    this.cameras.main.scrollX = this.player.x - this.cameras.main.width / 2;
    this.cameras.main.scrollY = this.player.y - this.cameras.main.height / 2;
  }
}
