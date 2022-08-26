import { NineSlicePlane, TextStyle, Texture, Text, Container } from "pixi.js";
import { GameState } from "../game/GameState";
import { Button } from "../ui/Button";
import { SceneManager } from "../utils/SceneManager";
import { GameScene } from "./GameScene";
import { StartMenu } from "./StartMenu";

export class GameOverDialog extends Container{
    private buttonRetry: Button;
    private buttonExit: Button;
    private messageDialog: any;
  
    constructor(){
        super();

        this.messageDialog = new NineSlicePlane(
            Texture.from("HUD/fondoPlayer.png"),
            35,35,35,35
        );
        this.messageDialog.width = SceneManager.WIDTH * 0.52;
        this.messageDialog.height = SceneManager.HEIGHT * 1/3;
        //namePlayer.scale.set(0.5);

        const textStyle = new TextStyle({
            align: "center",
            dropShadow: true,
            dropShadowAlpha: 0.8,
            dropShadowAngle: -3.5,
            dropShadowBlur: 3,
            dropShadowDistance: 2,
            fill: "red",
            fontFamily: "BowlCap",
            fontSize: 90,
            lineJoin: "round",
            lineHeight: 132,
            wordWrap: false            
        })
        const message = new Text('No lo lograste 😢', textStyle);
        message.position.set(this.messageDialog.width * 1/22, this.messageDialog.height * 1/8);
        this.messageDialog.addChild(message);

        const buttonTextStyle = new TextStyle({
            align: "center",
            dropShadow: true,
            dropShadowAlpha: 0.8,
            dropShadowAngle: -3.5,
            dropShadowBlur: 3,
            dropShadowDistance: 2,
            fill: "red",
            fontFamily: "BowlCap",
            fontSize: 25,
            lineJoin: "round",
            lineHeight: 22,
            wordWrap: true,
            wordWrapWidth: 150
        })

        const boton = new NineSlicePlane(
            Texture.from("boton"),
            35,35,35,35
        )
        const botonPress = new NineSlicePlane(
            Texture.from("botonPress"),
            35,35,35,35
        )

        this.buttonRetry = new Button(
            boton.texture,
            botonPress.texture,
            boton.texture,
            "Retry");
        this.buttonRetry.on("buttonClick",this.onButtonRetryClick, this);
        this.buttonRetry.position.set(this.messageDialog.width * 1/15, message.height + 25);
        this.buttonRetry.scale.set(1.8, 1.9);
        this.buttonRetry.interactive= true;
        this.buttonRetry.buttonMode= true;
        const messageRetry = new Text('Volver a intentar', buttonTextStyle);
        messageRetry.position.set(this.buttonRetry.width * 1/7, this.buttonRetry.height * 1/11)
        this.buttonRetry.addChild(messageRetry);

        this.buttonExit = new Button(
            boton.texture,
            botonPress.texture,
            boton.texture,
            "Exit");
        this.buttonExit.on("buttonClick",this.onButtonExitClick, this);
        this.buttonExit.position.set(this.buttonRetry.position.x + this.buttonRetry.width + 30, message.height + 25);
        this.buttonExit.scale.set(1.8, 1.9);
        this.buttonExit.interactive= true;
        this.buttonExit.buttonMode= true;
        const messageExit = new Text('Salir', buttonTextStyle);
        messageExit.position.set(this.buttonRetry.width * 1/5, this.buttonRetry.height * 1/7)
        this.buttonExit.addChild(messageExit);

        this.addChild(this.messageDialog, this.buttonExit, this.buttonRetry);

    }
    onButtonRetryClick() {
        this.visible = false;
        GameState.PLAY = true;
        GameState.GAME_OVER = false;
        GameState.IS_PAUSED = false;
        SceneManager.changeScene(new GameScene());
    }

    onButtonExitClick():void {
        this.visible = false;
        GameState.PLAY = true;
        GameState.GAME_OVER = false;
        SceneManager.changeScene(new StartMenu());
    }

    public update(_deltaFrame: number): void {
        
    }

}