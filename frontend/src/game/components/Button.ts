import * as Phaser from "phaser";
import ButtonBackGround from "./ButtonBackGround";

export default class Button extends Phaser.GameObjects.Container {
    private button: ButtonBackGround;
    private label: Phaser.GameObjects.Text;

	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, textColor: string = 'black', tint: number = 0xffffff) {
		super(scene, x, y);
		this.button = new ButtonBackGround(scene, 0, 0, texture, tint, false);
		this.label = scene.add.text(0, 0, '', { color: textColor }).setOrigin(0.5, 0.5);          
		this.add(this.button);
		this.add(this.label);
        
        this.setSize(this.button.width, this.button.height);
        this.setInteractive();
	}

    setOnClick(callBack: () => void) {
        this.on(Phaser.Input.Events.POINTER_DOWN, callBack);
        return this;
    }

    setOnPointerOver(texture: string, textColor: string) {
        this.on(Phaser.Input.Events.POINTER_OVER, this.setUIChangeCallBack(texture, textColor));
        return this;
    }

    setOnPointOut(texture: string, textColor: string) {
        this.on(Phaser.Input.Events.POINTER_OUT, this.setUIChangeCallBack(texture, textColor));
        return this;
    }

	setLabel(text: string) {
		this.label.text = text;
		return this;
	}

	setLabelStyle(style: object) {
		this.label.setStyle(style);
		return this;
	}

    private setUIChangeCallBack(texture: string, textColor: string) {
        return () => {
            this.button.setTexture(texture);
            this.label.setColor(textColor);
        }
    }
}