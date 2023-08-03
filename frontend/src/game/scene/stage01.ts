import * as Phaser from "phaser";
import map from "../assets/data/stage02.json";
import background from "../assets/images/background.png";
import Terrain from "../assets/images/Terrain.png";

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
    this.load.image("Terrain", Terrain);

    // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/imageuriloader/
    console.log(background);
    console.log(Terrain);
  }

  create(): void {
    this.add.image(480, 360, "bg");
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 16,
      tileHeight: 16,
    });

    const tt = map.addTilesetImage("Terrain", "Terrain");
    map.createLayer("platformLayer", "Terrain");
  }
}
