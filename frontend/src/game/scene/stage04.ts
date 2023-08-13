import * as Phaser from "phaser";

import stage04 from "../assets/data/stage04.json";
import background from "../assets/images/background.png";
import terrain from "../assets/images/terrain.png";
import frogIdle from "../assets/images/NinjaFrog/idle.png";
import frogRun from "../assets/images/NinjaFrog/run.png";
import frogJump from "../assets/images/NinjaFrog/jump.png";
import frogFall from "../assets/images/NinjaFrog/fall.png";

import key from "../assets/images/key.png";
import doorIdle from "../assets/images/Door/doorIdle.png";
import doorOpening from "../assets/images/Door/doorOpening.png";

import { Player } from "../object/player";
import { Key } from "../object/key";
import { Door } from "../object/door";


export default class Stage04 extends Phaser.Scene {
  constructor() {
    super({
      key: "Stage04",
    });
  }

  player!: Player;
  platformLayer!: Phaser.Tilemaps.TilemapLayer | null;
  key!: Key;
  isKeyPicked!: boolean;
  door!: Door;

  mapWidth: number = 200;
  mapHeight: number = 48;
  tileWidth: number = 16;
  tileHeight: number = 16;

  preload(): void {
    this.load.tilemapTiledJSON("stage04", stage04);
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

    this.load.image("key", key);
    this.load.image("doorIdle", doorIdle);
    this.load.spritesheet("doorOpening", doorOpening, {
      frameWidth: 46,
      frameHeight: 56,
    });
  }

  create(): void {
    this.isKeyPicked = false;
    
    // add background
    const bg = this.add.image(0, 0, "bg").setOrigin(0).setScale(1);
    bg.displayWidth = this.mapWidth * this.tileWidth;
    bg.displayHeight = this.mapHeight * this.tileHeight;
    bg.depth = -2;

    // create map
    const map = this.make.tilemap({
      key: "stage04",
      tileWidth: 16,
      tileHeight: 16,
    });
    map.addTilesetImage("terrain", "terrain");

    // add collision
    map.setCollisionByExclusion([-1]);
    
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

    // create layer
    this.platformLayer = map.createLayer("platformLayer", ["terrain"]);
    // create player
    this.player = new Player(this, 100, 660, "idle");
    // create key
    this.key = new Key(this, 100, 460, "key").setScale(
      0.09
    );

    // create door
    this.door = new Door(this, 3100, 660, "doorIdle", [
      this.platformLayer,
    ]).setDepth(-1);

    this.events.once(
      "doorOpenEvent",
      () => {
        if (this.isKeyPicked) {
          this.door.play("doorOpenAnims");
        }
      },
      this
    );

    // colliders
    this.physics.add.collider(this.player, this.platformLayer!);

    this.key.setBounce(1);
    this.key.setCollideWorldBounds(true);

    this.physics.add.collider(this.key, this.player, () => {
      const playerX = this.player.x;
      const playerY = this.player.y;
      const keyX = this.key.x;
      const keyY = this.key.y;
      // 7~8 정도가 적당한 듯
      const multiplier = 8

      if (playerY > keyY) {
        const velocityX = (keyX - playerX) * multiplier;
        const velocityY = -400;
        this.key.setVelocity(velocityX, velocityY);
      }
    });
    
    this.physics.add.collider(this.key, this.platformLayer!, () => {
      this.key.setPosition(100, 460);
      this.key.setVelocity(0, 0);
    });

    this.physics.add.overlap(this.door, this.key, () => {
      this.isKeyPicked = true;
      this.key.destroy();
      this.events.emit("doorOpenEvent");
    });

    this.physics.add.overlap(this.door, this.player, () => {
      if (this.isKeyPicked) {
        this.scene.start("StageSelect");
      }
    });

    this.input.keyboard?.on("keydown-R", () => {
      this.scene.start("StageSelect");
    });
  }

  update(): void {
    this.player.update();

    this.cameras.main.scrollX = this.player.x - this.cameras.main.width / 2;
    this.cameras.main.scrollY = this.player.y - this.cameras.main.height / 2;

  }


}
