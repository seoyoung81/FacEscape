import Phaser from "phaser";
import { StageSelect } from "./scene/stageSelect";

export const createGame = (width: number, height: number, tagName: string) => {
    const scaleObject: Phaser.Types.Core.ScaleConfig = {
        width: width,
        height: height,
    };
    
    const gameConfig: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
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
        scene: [StageSelect],
    };

    return new Phaser.Game(gameConfig);
}