import Phaser from "phaser";

import map from "../assets/data/stage03.json";
import background from "../assets/images/background.png";
import terrain from "../assets/images/terrain.png";

import trafficLight from "../assets/images/trafficLight.png"
import trampoline from "../assets/images/trampoline.png";

import { TrafficLight } from "../object/trafficlight";
import { Trampoline } from "../object/trampoline";

export default class Stage03 extends Phaser.Scene {
  constructor() {
    super({
      key: "Stage03",
    });
  }

  platformLayer!: Phaser.Tilemaps.TilemapLayer | any;
  trampoline!: Trampoline;
  trafficLight! : TrafficLight;

  mapWidth: number = 180;
  mapHeight: number = 38;
  tileWidth: number = 16;
  tileHeight: number = 16;

  preload(): void {
    this.load.tilemapTiledJSON("map", map);
    this.load.image("bg", background);
    this.load.image("terrain", terrain);
    this.load.image("trampoline", trampoline);

    this.load.spritesheet('trafficLight', trafficLight, { 
      frameWidth: 128,
      frameHeight: 128,
    });


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

    this.add.image(480, 360, "bg");
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 16,
      tileHeight: 16,
    });

    map.addTilesetImage("terrain", "terrain");
    this.platformLayer = map.createLayer("platformLayer", ["terrain"]);
    this.platformLayer.setCollision(1); 
    this.platformLayer.setCollisionByExclusion([-1], true);

    this.trafficLight = new TrafficLight(this, this.game.canvas.width/2, this.game.canvas.height/6, "trafficLight").setScrollFactor(0);
    
    this.trampoline = new Trampoline(this, 1200, 500, "ii", this.platformLayer);
    this.physics.add.collider(this.trampoline, this.platformLayer);
  }

  update(): void {
    this.trafficLight.update();
  }
}
