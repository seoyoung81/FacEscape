import * as Phaser from "phaser";

import map from "../assets/data/stage01.json";
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

import { Player } from "../object/player";
import { Cannon } from "../object/cannon";

//====== wall setting ==============
const WALL_START_X = 100;
const WALL_START_Y = 490;
const WALL_GAP = 70;
const WALL_Y_OFFSET = 5; // Positioned slightly above the wall below it

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
  walls!: Phaser.Physics.Arcade.Group;

  preload(): void {
    console.log(frogIdle);
    this.load.tilemapTiledJSON("map", map);
    this.load.image("bg", background);
    this.load.image("terrain", terrain);
    this.load.image("jump", frogJump);
    this.load.image("fall", frogFall);
    this.load.image("cannon", cannonIdle);
    this.load.image("cannonBall", cannonBall);
    this.load.image("wall", wall);

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
    // add background
    this.add.image(480, 360, "bg");

    // create map
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 16,
      tileHeight: 16,
    });
    map.addTilesetImage("terrain", "terrain");

    // add collision
    map.setCollisionByExclusion([-1]);
    map.setCollisionByProperty({ collides: true });

    // create layer
    this.platformLayer = map.createLayer("platformLayer", ["terrain"]);

    // create player with collision
    this.player = new Player(this, 150, 460, "idle", [
      this.platformLayer,
      this.cannon,
      this.cannonBalls,
    ]);

    // create cannon
    this.cannon = new Cannon(this, 800, 505, "cannon", [
      this.platformLayer,
      this.player,
    ]);

    // create cannonBall
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
          this.knockBack(this.player);
          cannonBall.destroy();
        });
      },
      callbackScope: this,
      loop: true,
    });

    // create walls
    this.walls = this.physics.add.group();
    this.addWall();

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
  }


  knockBack(player: Player) {
    player.setPlayerState(1);
    const pushBackVelocityX = -200;
    const pushBackVelocityY = -200;
    player.setVelocity(pushBackVelocityX, pushBackVelocityY);
  }


  update(): void {
    this.player.update();
    this.cannon.update();

    this.player.getPlayerState();

    this.cannonBalls.getChildren().forEach((gameObj) => {
      const cannonBall = gameObj as Phaser.GameObjects.Sprite;

      if (cannonBall.x < 0) {
        this.cannonBalls.killAndHide(cannonBall);
      }
    });
  }

  addWall() {
    for (let i = 0; i < 3; i++) {
      const positionY = WALL_START_Y - WALL_GAP * i + WALL_Y_OFFSET * i;
      const wall = this.physics.add
        .sprite(WALL_START_X, positionY, "wall")
        .setScale(0.05)
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
