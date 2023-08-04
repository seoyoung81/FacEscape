import * as Phaser from "phaser";
import map from "../assets/data/stage01.json";
import background from "../assets/images/background.png";
import terrain from "../assets/images/Terrain.png";


import trafficLight from "../assets/images/trafficLight.png"


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



  private trafficLight!: Phaser.GameObjects.Sprite;
  private trafficLightState: string = 'green';
  private prevPlayerX: number = 0;
  private prevPlayerY: number = 0;



  preload(): void {
    this.load.tilemapTiledJSON("map", map);
    this.load.image("bg", background);
    this.load.image("terrain", terrain);

          
    this.load.spritesheet('trafficLight', trafficLight, { 
      frameWidth: 256,
      frameHeight: 256,
    });

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
    this.trafficLight = this.add.sprite(this.game.canvas.width/2, this.game.canvas.height/6, 'traffic_light').setScrollFactor(0);


    // 신호등 시간 설정 (/1000 = 초)
    const GREEN_DELAY = 5000;
    const YELLOW_DELAY = 1000;
    const RED_DELAY = 2000;


    
    // 맵 서브 애니메이션 생성
    const trafficLightFrames = this.anims.generateFrameNumbers('trafficLight', { start: 0, end: 2 });
    const trafficLightFrameConfig = {
        key: 'trafficLight_anim',
        frames: trafficLightFrames,
        frameRate: 1,
        repeat: -1
    };

    // 초록-노랑-빨강 순서대로 지연 시간 배분
    const delays = [GREEN_DELAY, YELLOW_DELAY, RED_DELAY];
    this.setFrameDelays(trafficLightFrameConfig, delays);
    this.anims.create(trafficLightFrameConfig);
    this.trafficLight.anims.play('trafficLight_anim');

    this.trafficLight.on('animationupdate', () => {
        const { index } = this.trafficLight.anims.currentFrame as Phaser.Animations.AnimationFrame;
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




  update(): void {
    console.log(this.trafficLightState)
  }



  setFrameDelays(animationConfig: any, delays: any) {
    for (let i = 0; i < animationConfig.frames.length; i++) {
        animationConfig.frames[i].duration = delays[i];

        }
  }





}
