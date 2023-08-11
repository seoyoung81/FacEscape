import * as Phaser from "phaser";

export class SpikeTrap extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    collider?: any
  ) {
    super(scene, x, y, texture);
    
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    if (typeof texture === "string") {
      this.setTexture(texture);
    } else {
      this.texture = texture;
    }

    this.setCollideWorldBounds(true);
    this.scene.physics.add.collider(this, collider);
  }

  update(): void {
    console.log("SpikeTrap update method called");

  }
  
}