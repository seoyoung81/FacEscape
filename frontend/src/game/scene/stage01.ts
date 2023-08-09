import * as Phaser from "phaser";

import map from "../assets/data/stage01.json";
import background from "../assets/images/background.png";
import terrain from "../assets/images/Terrain.png";
export default class Stage01 extends Phaser.Scene {
  constructor() {
    super({
      key: "Stage01",
    });
  }
  player!: Player;
  platformLayer!: Phaser.Tilemaps.TilemapLayer | any;
  preload(): void {
    this.load.image("bg", background);
    this.load.tilemapTiledJSON("map", map);
    this.load.image("terrain", terrain);

    // Image 객체를 생성하여 data URI를 이미지로 변환합니다.
    const img = new Image();
    img.onload = () => {
      // 이미지를 그릴 캔버스를 생성합니다.
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const context = canvas.getContext("2d");

      // Image를 캔버스에 그립니다.
      context?.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        // Blob을 Phaser 텍스처로 로드합니다.
        this.textures.addBase64("idleImage", blob);
      }, "image/png");
      img.src = idle;
    };
    // this.load.spritesheet("ii", "idleImage", {
    //   frameWidth: 32,
    //   frameHeight: 32,
    // });
  }

  create(): void {
    this.add.image(480, 300, "bg");
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 16,
      tileHeight: 16,
    });

    map.addTilesetImage("terrain", "terrain");
    this.platformLayer = map.createLayer("platformLayer", ["terrain"]);

    this.player = new Player(this, 90, 460, "ii", this.platformLayer);
    this.physics.add.collider(this.player, this.platformLayer);
  }

  update(): void {
    this.player.update();
  }
}
