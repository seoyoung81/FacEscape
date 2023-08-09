import Phaser from "phaser";
import { Player } from "../object/player";
import map from "../assets/data/stage02.json";
import terrain from "../assets/images/Terrain.png";
export default class Stage02 extends Phaser.Scene {
  constructor() {
    super({
      key: "Stage02",
    });
  }

  mapWidth: number = 60;
  mapHeight: number = 100;
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
      this.mapHeight * this.tileHeight,

      // centerize
      true
    );
    this.physics.world.setBounds(
      0,
      0,
      this.mapWidth * this.tileWidth,
      this.mapHeight * this.tileHeight
    );

    this.cameras.main.scrollX = 100;
    this.cameras.main.scrollY = 1300;
    this.cameras.main.setZoom(1);

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
