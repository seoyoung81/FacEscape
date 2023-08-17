import * as Phaser from "phaser";

export class TrafficLight extends Phaser.GameObjects.Sprite {

  private trafficLightState: string = 'green';

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
  ) {
    super(scene, x, y, texture);

    this.scene = scene;
    this.scene.add.existing(this);

    // 신호등 시간 설정 (/1000 = 초)
    const GREEN_DELAY = 5000;
    const YELLOW_DELAY = 1000;
    const RED_DELAY = 2000;

    // 애니메이션 설정
    const trafficLightFrames = this.anims.generateFrameNumbers('trafficLight', { start: 0, end: 2 });
    const trafficLightFrameConfig = {
        key: 'trafficLight_anim',
        frames: trafficLightFrames,
        frameRate: 1,
        repeat: -1
    };

    // 애니메이션 생성
    const delays = [GREEN_DELAY, YELLOW_DELAY, RED_DELAY];
    this.setFrameDelays(trafficLightFrameConfig, delays);
    this.anims.create(trafficLightFrameConfig);
    this.play("trafficLight_anim");

    this.on('animationupdate', () => {
        const { index } = this.anims.currentFrame as Phaser.Animations.AnimationFrame;
        switch (index) {
        case 1:
            this.trafficLightState = 'green';
            break;
        case 2:
            this.trafficLightState = 'yellow';
            break;
        default:
            this.trafficLightState = 'red';
        }
    }, this);

  }
  
  setFrameDelays(animationConfig: any, delays: any) {
    for (let i = 0; i < animationConfig.frames.length; i++) {
        animationConfig.frames[i].duration = delays[i];
        }
  }


  getTrafficLightState() {
    return this.trafficLightState;
  }


  update(): void {
    
  }
}
