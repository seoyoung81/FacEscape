import * as Phaser from "phaser";

export default class ButtonBackGround extends Phaser.GameObjects.Image {

    private isInteractionButtonBackGround: any;

	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, tint: number = 0xffffff, isInteractionButtonBackGround: boolean = true) {
		super(scene, x, y, texture)
        this.setTint(tint)
        this.isInteractionButtonBackGround = isInteractionButtonBackGround;
        if(isInteractionButtonBackGround) {
            this.setInteractive();
        }
	}

    setPointOverTexture(texture: string) {
        if(!this.isInteractionButtonBackGround) return this;
        this.on(Phaser.Input.Events.POINTER_OVER, ()=>{
            this.setTexture(texture);
        });

        return this;
    }

    setPointOutTexture(texture: string) {
        if(!this.isInteractionButtonBackGround) return this;
        this.on(Phaser.Input.Events.POINTER_OUT, ()=>{
            this.setTexture(texture);
        });

        return this;
    }

    setOnclick(callBack: () => void) {
        this.on(Phaser.Input.Events.POINTER_DOWN, callBack);
    }
}