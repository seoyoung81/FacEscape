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
  key!: Phaser.Physics.Arcade.Sprite;
  isKeyPicked!: boolean;
  door!: Door;

  mapWidth: number = 95;
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
    bg.displayWidth = this.cameras.main.width;
    bg.displayHeight = this.cameras.main.height;
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
    // create layer
    this.platformLayer = map.createLayer("platformLayer", ["terrain"]);
    // create player
    this.player = new Player(this, 370, 660, "idle");
    // create key
    this.key = new Key(this, 50, 660, "key", [this.platformLayer]).setScale(
      0.09
    );
    // create door
    this.door = new Door(this, 700, 660, "doorIdle", [
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


    if (this.isKeyPicked) {
      this.events.emit("doorOpenEvent");
    }
  }


}
