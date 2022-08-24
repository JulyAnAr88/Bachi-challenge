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
    private timeMessage: Text;
    //private timeList: String[] = [];

    public static TIME_FINISH: String[] = [];

     
    constructor(time: String){
        super();

        //FinalMetaDialog.TIME_FINISH.push("00:00");
        
        const messageDialog = new NineSlicePlane(
            Texture.from("HUD/fondoPlayer.png"),
            35,35,35,35
        );
        messageDialog.width = SceneManager.WIDTH * 1/2;
        messageDialog.height = SceneManager.HEIGHT * 0.6;
        
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

        const timeStyle = new TextStyle({
            align: "center",
            dropShadow: true,
            dropShadowAlpha: 0.8,
            dropShadowAngle: -3.5,
            dropShadowBlur: 3,
            dropShadowDistance: -1,
            fill: "white",
            fontFamily: "BowlbyOne-Regular",
            fontSize: 60,
            lineHeight: 100,
            lineJoin: "round",
            strokeThickness: 1,
            textBaseline: "middle",
            whiteSpace: "normal",
            wordWrap: false,
            leading: 14
        });
        
                    
        this.timeMessage = new Text('Tu tiempo: '+ time, timeStyle);
        this.timeMessage.position.set(messageDialog.width * 1/4, message.height + 50);
        messageDialog.addChild(this.timeMessage);
            
        if (FinalMetaDialog.TIME_FINISH.length == 1){
            const pastTimeMessage = new Text('Tiempo anterior: 00:00', timeStyle);
            pastTimeMessage.position.set(messageDialog.width * 1/7, this.timeMessage.height * 1/2 + this.timeMessage.position.y + 15);
            messageDialog.addChild(pastTimeMessage);
        }else{
            const pastTimeMessage = new Text('Tiempo anterior: '+ FinalMetaDialog.TIME_FINISH[FinalMetaDialog.TIME_FINISH.length - 2], timeStyle);
            pastTimeMessage.position.set(messageDialog.width * 1/7, this.timeMessage.height * 1/2 + this.timeMessage.position.y + 15);
            messageDialog.addChild(pastTimeMessage);
        }     
        
             

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
        this.buttonRetry.position.set(messageDialog.width * 1/15, this.timeMessage.position.y + this.timeMessage.height + 50);
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
        this.buttonExit.position.set(this.buttonRetry.position.x + this.buttonRetry.width + 30, this.timeMessage.position.y + this.timeMessage.height + 50);
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