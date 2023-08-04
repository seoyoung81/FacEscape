import * as Phaser from "phaser";
import { Player } from "./player";

import map from "../assets/data/stage01.json";
import background from "../assets/images/background.png";
import terrain from "../assets/images/Terrain.png";


import trampoline from "../assets/images/trampoline.png";


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


  player!: Phaser.Physics.Arcade.Sprite;
  // private trampoline!: Phaser.Physics.Arcade.Sprite;
  private trampolineJumpSound!: Phaser.Sound.BaseSound;
  


  preload(): void {
    this.load.tilemapTiledJSON("map", map);
    this.load.image("bg", background);
    this.load.image("terrain", terrain);

    this.load.image("trampoline", "images/trampoline.png");
	  // this.load.audio('trampolineJumpSound', 'audio/trampoline.wav');

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

    // 트램펄린 충돌
    const trampolinesPositions = [
      { x: 400, y: 520 },
      { x: 600, y: 520 },
      { x: 800, y: 520 },
    ];
  
    for (const position of trampolinesPositions) {
      const trampoline = this.physics.add.sprite(position.x, position.y, 'trampoline').setScale(0.3);
  
      (trampoline.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
      (trampoline.body as Phaser.Physics.Arcade.Body).setImmovable(true);

      // this.trampolineJumpSound = this.sound.add('trampolineJumpSound');
      // this.physics.add.collider(this.player, trampoline, this.jumpTrampoline, null, this);
    }
  }

  jumpTrampoline(player: any, trampoline: any) {
    // 플레이어의 밑면이 트램펄린의 윗면에 닿으면 수직 속도를 높임
    if (player.body.touching.down && trampoline.body.touching.up) {
        // 효과음 내기
        this.trampolineJumpSound.play();
        player.setVelocityY(-300);
    }
  }

}
