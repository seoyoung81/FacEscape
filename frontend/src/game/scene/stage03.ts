import Phaser from "phaser";

import map from "../assets/data/stage03.json";
import background from "../assets/images/background.png";
import terrain from "../assets/images/terrain.png";

import frogIdle from "../assets/images/Ninja Frog/idle.png";
import frogRun from "../assets/images/Ninja Frog/run.png";
import frogJump from "../assets/images/Ninja Frog/jump.png";
import frogFall from "../assets/images/Ninja Frog/fall.png";

import trafficLight from "../assets/images/trafficLight.png";
import spikeTrap from "../assets/images/spiketrap.png";
import trampoline from "../assets/images/trampoline.png";
// import trampolineSound from "../assets/audio/trampoline.wav";

import { TrafficLight } from "../object/trafficlight";
import { Trampoline } from "../object/trampoline";
import { Player } from "../object/player";
import { SpikeTrap } from "../object/spiketrap";

export default class Stage03 extends Phaser.Scene {
  constructor() {
    super({
      key: "Stage03",
    });
  }
  player!: Player;

  platformLayer!: Phaser.Tilemaps.TilemapLayer | any;
  trafficLight! : TrafficLight;
  trampolineJumpSound!: Phaser.Sound.BaseSound;

  private prevPlayerX: number = 0;
  private prevPlayerY: number = 0;

  mapWidth: number = 180;
  mapHeight: number = 46;
  tileWidth: number = 16;
  tileHeight: number = 16;

  preload(): void {
    this.load.tilemapTiledJSON("map", map);
    this.load.image("bg", background);
    this.load.image("terrain", terrain);
    this.load.image("trampoline", trampoline);
    this.load.image("spikeTrap", spikeTrap)
    // this.load.audio("trampolineJumpSound", "../assets/audio/trampoline.wav");

    this.load.spritesheet('trafficLight', trafficLight, { 
      frameWidth: 128,
      frameHeight: 128,
    });


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
    this.cameras.main.scrollX = 900;
    this.cameras.main.scrollY = 200;
        
    // this.add.image(480, 360, "bg");
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 16,
      tileHeight: 16,
    });
    
    map.addTilesetImage("terrain", "terrain");
    this.platformLayer = map.createLayer("platformLayer", ["terrain"]);
    this.platformLayer.setCollision(1); 
    this.platformLayer.setCollisionByExclusion([-1], true);

    this.player = new Player(this, 100, 600, "idle", this.platformLayer);
    this.trafficLight = new TrafficLight(this, this.game.canvas.width/2, this.game.canvas.height/6, "trafficLight").setScrollFactor(0);
    
    // 트램펄린 배치
    const trampolinePositions = [
      { x: 1200, y: 500 },
      { x: 1500, y: 500 },
    ];
    
    trampolinePositions.forEach(position => {
      const trampoline = new Trampoline(this, position.x, position.y, "trampoline", this.platformLayer).setScale(0.3);
      (trampoline.body as Phaser.Physics.Arcade.Body).setImmovable(true);
      this.physics.add.collider(trampoline, this.platformLayer);
      this.physics.add.collider(this.player, trampoline, trampoline.jumpTrampoline.bind(this.player), undefined, trampoline);
  });

    // 가시 배치
    const spikeTrapPositions = [
      { x: 1300, y: 500 },
      { x: 1600, y: 500 },
    ];
    
    spikeTrapPositions.forEach(position => {
      const spikeTrap = new SpikeTrap(this, position.x, position.y, "spikeTrap", this.platformLayer).setScale(0.15);
      (spikeTrap.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
      (spikeTrap.body as Phaser.Physics.Arcade.Body).setImmovable(true);
      this.physics.add.collider(spikeTrap, this.platformLayer);
      this.physics.add.collider(this.player, spikeTrap, this.gameOver, undefined, this);
  });

  }


  gameOver(): void {
    console.log("gameOVERRR")
  }


  update(): void {
    this.trafficLight.update();
    this.player.update();

    if (this.trafficLight.returnTrafficLightState() === 'red') {
      if (this.player.x !== this.prevPlayerX || this.player.y !== this.prevPlayerY) {
          console.log('game over')
      }
  }

  this.prevPlayerX = this.player.x;
  this.prevPlayerY = this.player.y;

  this.cameras.main.scrollX = this.player.x - this.cameras.main.width / 2;
  this.cameras.main.scrollY = this.player.y - this.cameras.main.height / 2;

  }
}
