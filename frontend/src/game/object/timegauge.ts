import * as Phaser from "phaser";

export class TimeGauge extends Phaser.GameObjects.Sprite {

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
  ) {
    super(scene, x, y, texture);

    this.scene = scene;
    // this.scene.add.existing(this);

    // 게이지 바 생성
    const bar1 = this.scene.add.nineslice(x, y, 'timeGauge', 'ButtonOrange').setScrollFactor(0);
    const fill1 = this.scene.add.nineslice(x - 114, y - 2, 'timeGauge', 'ButtonOrangeFill2', 13, 39, 6, 6).setScrollFactor(0);
    fill1.setOrigin(0, 0.5);

    // 트윈 애니메이션 설정
    this.scene.tweens.add({
      targets: fill1,
      width: 228,
      duration: 20000,
      ease: 'sine.out',
      yoyo: false,
      repeat: -1,
    });

  }


  update(): void {
    console.log(this);
  }
}
