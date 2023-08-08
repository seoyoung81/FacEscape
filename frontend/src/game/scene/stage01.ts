import * as Phaser from "phaser";

import map from "../assets/data/stage01.json";
import background from "../assets/images/background.png";
import terrain from "../assets/images/terrain.png";
import frogIdle from "../assets/images/Ninja Frog/idle.png";
import frogRun from "../assets/images/Ninja Frog/run.png";
import frogJump from "../assets/images/Ninja Frog/jump.png";
import frogFall from "../assets/images/Ninja Frog/fall.png";
import cannonIdle from "../assets/images/Idle.png";
import cannonShoot from "../assets/images/Shoot (44x28).png";
import cannonBall from "../assets/images/Cannon Ball.png";

import { Player } from "../object/player";
import { Cannon } from "../object/cannon";

export default class Stage01 extends Phaser.Scene {
  constructor() {
    super({
      key: "Stage01",
    });
  }
  player!: Player;
  cannon!: Cannon;
  cannonBalls!: Phaser.Physics.Arcade.Group;
  platformLayer!: Phaser.Tilemaps.TilemapLayer | null;
  preload(): void {
    console.log(frogIdle);
    this.load.tilemapTiledJSON("map", map);
    this.load.image("bg", background);
    this.load.image("terrain", terrain);
    this.load.image("jump", frogJump);
    this.load.image("fall", frogFall);
    this.load.image("cannon", cannonIdle);
    this.load.image("cannonBall", cannonBall);

    this.load.spritesheet("shoot", cannonShoot, {
      frameWidth: 44,
      frameHeight: 28,
      endFrame: 3,
    });

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
  }

  create(): void {
    this.add.image(480, 360, "bg");

    const map = this.make.tilemap({
      key: "map",
      tileWidth: 16,
      tileHeight: 16,
    });

    map.addTilesetImage("terrain", "terrain");
    map.setCollisionByExclusion([-1]);
    this.platformLayer = map.createLayer("platformLayer", ["terrain"]);

    this.player = new Player(this, 90, 460, "idle", [
      this.platformLayer,
      this.cannon,
      this.cannonBalls,
    ]);
    this.cannon = new Cannon(this, 800, 505, "cannon", [
      this.platformLayer,
      this.player,
    ]);

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
        cannonBall.setVelocityX(-500);
        this.physics.add.collider(this.player, cannonBall, () => {
          cannonBall.destroy();
          console.log("hit");
        });
        // this.physics.add.collider(this.cannonBalls, this.walls, ()=>{cannonBall.destroy(); walls.destroy}, undefined, this);
      },
      callbackScope: this,
      loop: true,
    });

    // const cannonBall = this.add.sprite(
    //   this.cannon.body!.x,
    //   this.cannon.body!.y + 20,
    //   "cannonBall"
    // );

    // const cb = this.tweens.add({
    //   targets: cannonBall,
    //   x: 0,
    //   y: this.cannon.body!.y + 20,
    //   duration: 1000,
    //   delay: 1000,
    //   repeatDelay: 500,
    //   loop: -1,
    // });
  }

  update(): void {
    this.player.update();
    this.cannon.update();

    this.cannonBalls.getChildren().forEach((gameObj) => {
      const cannonBall = gameObj as Phaser.GameObjects.Sprite;

      if (cannonBall.x < 0) {
        this.cannonBalls.killAndHide(cannonBall);
      }
    });
  }
}
