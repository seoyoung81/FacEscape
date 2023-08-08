import Phaser from "phaser";
export class Cannon extends Phaser.Physics.Arcade.Sprite {
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
    this.setImmovable(true);

    this.anims.create({
      key: "shootAnims",
      frames: this.anims.generateFrameNumbers("shoot", {
        frames: [0, 1, 2, 3],
      }),
      delay: 1000,
      duration: 200,
      repeatDelay: 800,
      repeat: -1,
    });
  }
  update(): void {
    this.play("shootAnims", true);
  }
}
