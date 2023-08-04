import Phaser from "phaser";
import { Player } from "../object/player";
import map from "../assets/data/stage02.json";

export default class Stage02 extends Phaser.Scene {
  constructor() {
    super({
      key: "Stage02",
    });
  }

  mapWidth: number = 20;
  mapHeight: number = 55;
  tileWidth: number = 16;
  tileHeight: number = 16;

  preload(): void {
    this.load.tilemapTiledJSON("map", map);
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
  }

  update(): void {}
}
