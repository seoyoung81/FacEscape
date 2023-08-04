import * as Phaser from "phaser";
import Button from "../components/Button";
import ButtonBackGround from "../components/ButtonBackGround";
import { io } from "socket.io-client";

import background from "../assets/images/background.png";
import focusBtn from "../assets/images/focusBtn.svg";
import stageBtn from "../assets/images/stageBtn.svg";
import lockBtn from "../assets/images/lockBtn.svg";
import stageButtons from "../assets/data/stageButtons.json";

interface StageSelectButton {
  id: string;
  sceneName: string;
  y: number;
  x: number;
  hasInteract: boolean;
  texture: string;
}

export class StageSelect extends Phaser.Scene {
  private socket: any;

  constructor() {
    super({
      key: "StageSelect",
    });
  }

  preload(): void {
    this.socket = io("http://localhost:3050", {
      transports: ["websocket", "polling"],
    });
    console.log(this.socket);
    this.load.image("background", background);
    this.load.svg("stageBtn", stageBtn);
    this.load.svg("focusBtn", focusBtn);
    this.load.svg("lockBtn", lockBtn);
    this.load.json("stageButtons", stageButtons);
  }

  create(): void {
    this.add.image(480, 300, "background");
    this.input.manager.enabled = true;
    this.addStageButtons();
    this.socket.on("test", (stage: string) => {
      console.log(stage);
      this.scene.start(stage);
    });
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
        this.socket.emit("stageChange", stage.sceneName);
        this.scene.start(stage.sceneName);
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
