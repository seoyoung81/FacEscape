import * as Phaser from "phaser";
import Button from "../components/Button";
import ButtonBackGround from "../components/ButtonBackGround";

import background from "../assets/images/background.png";
import focusBtn from "../assets/images/focusBtn.svg";
import stageBtn from "../assets/images/stageBtn.svg";
import lockBtn from "../assets/images/lockBtn.svg";
import stageButtons from "../assets/data/stageButtons.json";

import { STAGE_EVENT } from "../event";

interface StageSelectButton {
  id: string;
  sceneName: string;
  y: number;
  x: number;
  hasInteract: boolean;
  texture: string;
}

export class StageSelect extends Phaser.Scene {
  constructor() {
    super({
      key: "StageSelect",
    });

    // this.startData:any = {};
  }
  preload(): void {
    this.load.image("background", background);
    this.load.svg("stageBtn", stageBtn);
    this.load.svg("focusBtn", focusBtn);
    this.load.svg("lockBtn", lockBtn);
    this.load.json("stageButtons", stageButtons);

    this.events.addListener(STAGE_EVENT.SELECT_SUCCESS, (stage: string) => {
      this.game.scene.getScene(stage).scene.restart();

      this.scene.start(stage);
    });
  }

  create(): void {
    const bg = this.add.image(0, 0, "background").setOrigin(0).setScale(1);
    bg.displayWidth = this.cameras.main.width;
    bg.displayHeight = this.cameras.main.height;
    bg.depth = -1;

    this.input.manager.enabled = true;
    this.addStageButtons();
  }

  addStageButtons(): void {
    const stages: StageSelectButton[] =
      this.cache.json.get("stageButtons").stages;
    stages.forEach((stage) => {
      if (stage.hasInteract) {
        this.add.existing(this.makeInteractButton(stage));
      } else {
        this.add.existing(this.makeLockButtonBackGround(stage));
      }
    });
  }

  makeInteractButton(stage: any): Button {
    const button = new Button(this, stage.x, stage.y, stage.texture, "#DB7500");
    button.setLabel(stage.id).setLabelStyle({
      font: "bold 56px Arial",
    });

    button
      .setOnClick(() => {
        this.game.events.emit(STAGE_EVENT.SELECT, stage.sceneName);
      })
      .setOnPointerOver("focusBtn", "white")
      .setOnPointOut("stageBtn", "#DB7500");
    return button;
  }

  makeLockButtonBackGround(stage: any): ButtonBackGround {
    const button = new ButtonBackGround(
      this,
      stage.x,
      stage.y,
      stage.texture,
      0xffffff,
      false
    );
    return button;
  }
}
