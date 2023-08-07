import * as Phaser from "phaser";

import map from "../assets/data/stage01.json";
import background from "../assets/images/background.png";
import terrain from "../assets/images/terrain.png";
import frogIdle from "../assets/images/Ninja Frog/idle.png";
import frogRun from "../assets/images/Ninja Frog/run.png";
import frogJump from "../assets/images/Ninja Frog/jump.png";
import frogFall from "../assets/images/Ninja Frog/fall.png";

import { Player } from "../object/player";
export default class Stage01 extends Phaser.Scene {
  constructor() {
    super({
      key: "Stage01",
    });
  }
  player!: Player;
  platformLayer!: Phaser.Tilemaps.TilemapLayer | any;
  preload(): void {
    // console.log(terrain);
    console.log(frogIdle);
    this.load.tilemapTiledJSON("map", map);
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

    this.player = new Player(this, 90, 460, "idle", this.platformLayer);
  }

  update(): void {
    this.player.update();
  }
}
