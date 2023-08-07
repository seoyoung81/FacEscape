import * as Phaser from "phaser";
export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    // frame?: number,
    collider?: any
  ) {
    super(scene, x, y, texture, 0);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.scene.physics.add.collider(this, collider);

    this.anims.create({
      key: "idleAnims",
      frames: this.anims.generateFrameNumbers("idle", {
        start: 0,
        end: 10,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "runAnims",
      frames: this.anims.generateFrameNumbers("run", {
        start: 0,
        end: 11,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "jumpAnims",
      frames: [{ key: "jump" }],
      frameRate: 1,
    });

    this.anims.create({
      key: "fallAnims",
      frames: [{ key: "fall" }],
      frameRate: 1,
    });
  }

  update(): void {
    // this.play("idleAnims");
    const cursor = this.scene.input.keyboard?.createCursorKeys();
    if (cursor!.left.isDown) {
      this.setVelocityX(-160);
      this.flipX = true;
      this.play("runAnims", true);
    } else if (cursor!.right.isDown) {
      this.setVelocityX(160);
      this.flipX = false;
      this.play("runAnims", true);
    } else {
      this.setVelocityX(0);
      this.play("idleAnims", true);
    }

    if (cursor!.up.isDown && this.body!.blocked.down) {
      this.setVelocityY(-330);
      this.play("jumpAnims", true);
    }

    if (this.body!.velocity.y > 0) {
      this.play("fallAnims", true);
    } else if (this.body!.velocity.y < 0 && !this.body!.touching.down) {
      this.play("jumpAnims", true);
    }
  }
}
