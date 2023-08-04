import * as Phaser from "phaser";
import map from "../assets/data/stage01.json";
import background from "../assets/images/background.png";
import terrain from "../assets/images/Terrain.png";

import sliceimg from "../assets/images/slice.png"
import slicejson from "../assets/images/slice.json"

//====== wall setting ==============
const WALL_START_X = 100;
const WALL_START_Y = 510;
const WALL_GAP = 55;
const WALL_Y_OFFSET = 5; // Positioned slightly above the wall below it
export default class Stage01 extends Phaser.Scene {
  constructor() {
    super({
      key: "Stage01",
      plugins: {},
    });
  }

  preload(): void {
    this.load.tilemapTiledJSON("map", map);
    this.load.image("bg", background);
    this.load.image("terrain", terrain);
    this.load.atlas('slice', sliceimg, slicejson);

  }

  create(): void {
    this.add.image(480, 360, "bg");
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 16,
      tileHeight: 16,
    });

    map.addTilesetImage("terrain", "terrain");
    map.createLayer("platformLayer", ["terrain"]);


    // 400 200   286 198
    // this.add.nineslice(100, 100, 'slice', 'ButtonOrange')
    const bar1 = this.add.nineslice(this.game.canvas.width/2, this.game.canvas.height/6, 'slice', 'ButtonOrange').setScrollFactor(0);
    const fill1 = this.add.nineslice(this.game.canvas.width/2 - 114, this.game.canvas.height/6 - 2, 'slice', 'ButtonOrangeFill2', 13, 39, 6, 6).setScrollFactor(0);
    fill1.setOrigin(0, 0.5);

    this.tweens.add({
      targets: fill1,
      width: 228,
      duration: 20000,
      ease: 'sine.out',
      yoyo: false,
      repeat: -1,
  });

    
  }
}
