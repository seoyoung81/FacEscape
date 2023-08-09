import * as Phaser from "phaser";
import map from "../assets/data/stage01.json";
import background from "../assets/images/background.png";
import terrain from "../assets/images/Terrain.png";
export default class Stage01 extends Phaser.Scene {
  constructor() {
    super({
      key: "Stage01",
      plugins: {},
    });
  }

  preload(): void {
    this.load.image("bg", background);
    this.load.tilemapTiledJSON("map", map);
    this.load.image("terrain", terrain);
  }

  create(): void {
    this.add.image(480, 300, "bg");
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 16,
      tileHeight: 16,
    });

    map.addTilesetImage("terrain", "terrain");
    map.createLayer("platformLayer", ["terrain"]);
  }
}
