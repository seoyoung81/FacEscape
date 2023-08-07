import Phaser from "phaser";
import { StageSelect } from "./scene/stageSelect";
import Stage01 from "./scene/stage01";
import Stage02 from "./scene/stage02";
import Stage03 from "./scene/stage03";
export const createGame = (width: number|string, height: number|string, tagName: string) => {
  const scaleObject: Phaser.Types.Core.ScaleConfig = {
    width: width,
    height: height, 
  };

  const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: "#6061ab",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 150 },
        debug: true,
        checkCollision: { up: true, down: true, left: true, right: true },
      },
    },
    parent: tagName,
    scale: scaleObject,
    scene: [StageSelect, Stage01, Stage02, Stage03],
  };

  return new Phaser.Game(gameConfig);
};
