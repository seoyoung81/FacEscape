import Phaser from "phaser";
import { StageSelect } from "./scene/stageSelect";
import Stage01 from "./scene/stage01";
import Stage02 from "./scene/stage02";
import Stage03 from "./scene/stage03";
// import Stage04 from "./scene/stage04";

export const createGame = (canvas: HTMLCanvasElement) => {
  const scaleObject: Phaser.Types.Core.ScaleConfig = {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  };

  const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    backgroundColor: "#6061ab",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 500 },
        debug: true,
        checkCollision: { up: true, down: true, left: true, right: true },
      },
    },
    parent: "game",
    dom: {
      createContainer: true,
    },
    canvas: canvas,
    scale: scaleObject,
    scene: [StageSelect, Stage01, Stage02, Stage03],
  };

  return new Phaser.Game(gameConfig);
};
