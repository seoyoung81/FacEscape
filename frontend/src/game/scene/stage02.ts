import Phaser from "phaser";
import map from "../assets/data/stage02.json";
import terrain from "../assets/images/terrain.png";
import timeGaugePNG from "../assets/images/timegauge.png"
import timeGaugeJSON from "../assets/images/timegauge.json"


import { TimeGauge } from "../object/timegauge";
import { Player } from "../object/player";

export default class Stage02 extends Phaser.Scene {
  constructor() {
    super({
      key: "Stage02",
    });
  }

  platformLayer!: Phaser.Tilemaps.TilemapLayer | any;
  timeGauge!: TimeGauge;

  mapWidth: number = 60;
  mapHeight: number = 100;
  tileWidth: number = 16;
  tileHeight: number = 16;

  preload(): void {
    this.load.tilemapTiledJSON("map", map);
    this.load.image("terrain", terrain);
    this.load.atlas('timeGauge', timeGaugePNG, timeGaugeJSON);

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
    this.cameras.main.scrollX = 480;
    this.cameras.main.scrollY = 1200;
    
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 16,
      tileHeight: 16,
    });

    map.addTilesetImage("terrain", "terrain");
    this.platformLayer = map.createLayer("platformLayer", ["terrain"]);
    this.timeGauge = new TimeGauge(this, this.game.canvas.width/2, this.game.canvas.height/6, "timeGauge");

  }

  update(): void {}
}
