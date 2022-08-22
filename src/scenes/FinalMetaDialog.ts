import { NineSlicePlane, TextStyle, Texture, Text } from "pixi.js";
import { GameState } from "../game/GameState";
import { Button } from "../ui/Button";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { GameScene } from "./GameScene";
import { StartMenu } from "./StartMenu";

export class FinalMetaDialog extends SceneBase{
    private buttonRetry: Button;
    private buttonExit: Button;
  
    constructor(){
        super();

        const messageDialog = new NineSlicePlane(
            Texture.from("HUD/fondoPlayer.png"),
            35,35,35,35
        );
        messageDialog.width = SceneManager.WIDTH * 1/2;
        messageDialog.height = SceneManager.HEIGHT * 0.4;
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
            fontSize: 105,
            lineJoin: "round",
            lineHeight: 120,
            wordWrap: true,
            wordWrapWidth: 450
        })
        const message = new Text('¡Excelente, llegaste!', textStyle);
        message.position.set(messageDialog.width * 1/7, messageDialog.height * 1/16);
        messageDialog.addChild(message);

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
            wordWrapWidth: 200
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
        this.buttonRetry.position.set(messageDialog.width * 1/15, message.height + 25);
        this.buttonRetry.scale.set(1.8, 1.9);
        this.buttonRetry.interactive= true;
        this.buttonRetry.buttonMode= true;
        const messageRetry = new Text('Jugar de nuevo', buttonTextStyle);
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

        this.addChild(messageDialog, this.buttonExit, this.buttonRetry);

    }

    onButtonRetryClick() {
        this.visible = false;
        GameState.PLAY = true;
        GameState.GAME_OVER = false;
        GameState.ISPAUSED = false;
        SceneManager.changeScene(new GameScene());
    }

    onButtonExitClick():void {
        this.visible = false;
        GameState.PLAY = true;
        GameState.GAME_OVER = false;
        SceneManager.changeScene(new StartMenu());
    }

    public update(_deltaFrame: number): void {
        //this.myGodray.time += deltaFrame/1000;
    }

}