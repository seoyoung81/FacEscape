import Phaser from "phaser";
import stage02 from "../assets/data/stage02.json";
import terrain from "../assets/images/terrain.png";
import frogIdle from "../assets/images/NinjaFrog/idle.png";
import frogRun from "../assets/images/NinjaFrog/run.png";
import frogJump from "../assets/images/NinjaFrog/jump.png";
import frogFall from "../assets/images/NinjaFrog/fall.png";

import timeGaugePNG from "../assets/images/timegauge.png";
import timeGaugeJSON from "../assets/images/timegauge.json";
import cannonIdle from "../assets/images/Idle.png";
import cannonShoot from "../assets/images/shoot.png";
import cannonBall from "../assets/images/cannonBall.png";

import { TimeGauge } from "../object/timegauge";
import { Player } from "../object/player";
import { Cannon } from "../object/cannon";

export default class Stage02 extends Phaser.Scene {
  constructor() {
    super({
      key: "Stage02",
    });
  }

  player!: Player;
  platformLayer!: Phaser.Tilemaps.TilemapLayer | any;
  timeGauge!: TimeGauge;
<<<<<<< HEAD
  
  cannons: Cannon[] = [];
=======

  cannon!: Cannon;
>>>>>>> 02ab3fffb32d8453a0bbad7957a4fb41355a72b6
  cannonBalls!: Phaser.Physics.Arcade.Group;

  mapWidth: number = 95;
  mapHeight: number = 160;
  tileWidth: number = 16;
  tileHeight: number = 16;

  preload(): void {
    this.load.tilemapTiledJSON("stage02", stage02);
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

    this.load.atlas("timeGauge", timeGaugePNG, timeGaugeJSON);

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
    this.cameras.main.scrollX = 480;
    this.cameras.main.scrollY = 1200;

    const map = this.make.tilemap({
      key: "stage02",
      tileWidth: 16,
      tileHeight: 16,
    });

    map.addTilesetImage("terrain", "terrain");
    this.platformLayer = map.createLayer("platformLayer", ["terrain"]);
    this.platformLayer.setCollision(1);
    this.platformLayer.setCollisionByExclusion([-1], true);

    this.player = new Player(this, 450, 200, "idle", [
      this.platformLayer,
      // this.cannon,
      this.cannonBalls,
    ]);

    this.timeGauge = new TimeGauge(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 6,
      "timeGauge"
    );

    const cannon1 = new Cannon(this, 120, 2020, "cannon", [
      this.platformLayer, 
      this.player
    ]);
    cannon1.flipX = true;
    this.cannons.push(cannon1);
  
    const cannon2 = new Cannon(this, 170, 1300, "cannon", [
      this.platformLayer, 
      this.player
    ]);
    cannon2.flipX = true;
    this.cannons.push(cannon2);

    const cannon3 = new Cannon(this, 90, 550, "cannon", [
      this.platformLayer, 
      this.player
    ]);
    cannon3.flipX = true;
    this.cannons.push(cannon3);

    const cannon4 = new Cannon(this, 90, 750, "cannon", [
      this.platformLayer, 
      this.player
    ]);
    cannon4.flipX = true;
    this.cannons.push(cannon4);

    this.cannonBalls = this.physics.add.group();

    this.cannons.forEach((cannon) => {
      cannon.update();
      this.time.addEvent({
        delay: 2100, // 대포 발사 간격
        callback: () => {
          const cannonBall = this.physics.add.sprite(cannon.x, cannon.y, "cannonBall");
          this.cannonBalls.add(cannonBall);
          cannonBall.body.allowGravity = false;
          cannonBall.setVelocityX(300);
          this.physics.add.collider(this.player, cannonBall, () => {
            this.knockBack(this.player);
            cannonBall.destroy();
          });
        },
        callbackScope: this,
        loop: true,
      });
    });
  }

  
  //   this.time.addEvent({
  //     delay: 1000,
  //     callback: () => {
  //       const cannonBall = this.physics.add.sprite(
  //         this.cannon.x,
  //         this.cannon.y,
  //         "cannonBall"
  //       );
  //       this.cannonBalls.add(cannonBall);
  //       cannonBall.body.allowGravity = false;
  //       cannonBall.setVelocityX(500);
  //       this.physics.add.collider(this.player, cannonBall, () => {
  //         this.knockBack(this.player);
  //         cannonBall.destroy();
  //       });
  //     },
  //     callbackScope: this,
  //     loop: true,
  //   });
  // }

  knockBack(player: Player) {
    player.setPlayerState(1);
    const pushBackVelocityX = 300;
    const pushBackVelocityY = -300;
    player.setVelocity(pushBackVelocityX, pushBackVelocityY);
  }

  update(): void {
    this.player.update();
    this.cameras.main.scrollX = this.player.x - this.cameras.main.width / 2;
    this.cameras.main.scrollY = this.player.y - this.cameras.main.height / 2;
  }
}
