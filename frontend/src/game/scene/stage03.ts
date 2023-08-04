import Phaser from "phaser";

import map from "../assets/data/stage03.json";
import terrain from "../assets/images/terrain.png";

export default class Stage03 extends Phaser.Scene {
  constructor() {
    super({
      key: "Stage03",
    });
  }

  mapWidth: number = 180;
  mapHeight: number = 38;
  tileWidth: number = 16;
  tileHeight: number = 16;

  preload(): void {
    this.load.tilemapTiledJSON("map", map);
    this.load.image("terrain", terrain);
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
    this.cameras.main.scrollX = 1000;
    this.cameras.main.scrollY = 300;
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 16,
      tileHeight: 16,
    });

    map.addTilesetImage("terrain", "terrain");
    map.createLayer("platformLayer", ["terrain"]);
  }

  update(): void {}
}
