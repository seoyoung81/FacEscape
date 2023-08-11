import Phaser from "phaser";

export class Door extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    collider?: any
  ) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.scene.physics.add.collider(this, collider);
      
    this.anims.create({
        key: "doorOpenAnims",
        frames: this.anims.generateFrameNumbers("doorOpening", {
            start: 0,
            end: 4,
          }),
          frameRate: 5,
          repeat: 0
    })
    }
}
