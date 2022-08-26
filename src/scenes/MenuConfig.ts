import { sound } from "@pixi/sound";
import { Container, TextStyle, Texture, Text, NineSlicePlane } from "pixi.js";
import { GameState } from "../game/GameState";
import { Button } from "../ui/Button";
import { SceneManager } from "../utils/SceneManager";

export class MenuConfig extends Container{

    private buttonKey1:Button;
    private buttonKey2:Button;
    private btnVolumeUp:Button;
    private btnVolumeDown:Button;
    private btnSalir:Button;
    private menuDialog: any;
   
    
    constructor(){
        super();

        this.menuDialog = new NineSlicePlane(
            Texture.from("HUD/fondoPlayer.png"),
            35,35,35,35
        );
        this.menuDialog.width = SceneManager.WIDTH * 1/3;
        this.menuDialog.height = SceneManager.HEIGHT * 3/5;

        
        this.btnSalir = new Button(
            Texture.from("Salir"),
            Texture.from("SalirPress"),
            Texture.from("Salir"),
            "Config1");
        this.btnSalir.on("buttonClick",this.onButtonSalirClick, this);
        this.btnSalir.position.set(this.menuDialog.width - this.btnSalir.width* 0.5, this.btnSalir.height * 0.15);
        this.btnSalir.scale.set(0.4);
        this.btnSalir.interactive= true;
        this.btnSalir.buttonMode= true;

        this.buttonKey1 = new Button(
            Texture.from("buttonConfig1"),
            Texture.from("buttonConfig1Press"),
            Texture.from("buttonConfig1"),
            "Config1");
        this.buttonKey1.on("buttonClick",this.onButtonKey1Click, this);
        this.buttonKey1.position.set(0,this.menuDialog.height * 1/30);
        this.buttonKey1.scale.set(0.4);
        this.buttonKey1.interactive= true;
        this.buttonKey1.buttonMode= true;

        this.buttonKey2 = new Button(
            Texture.from("buttonConfig2"),
            Texture.from("buttonConfig2Press"),
            Texture.from("buttonConfig2"),
            "Config2");
        this.buttonKey2.on("buttonClick",this.onButtonKey2Click, this);
        this.buttonKey2.position.set(0, this.buttonKey1.position.y + this.buttonKey1.height * 0.95);
        this.buttonKey2.scale.set(0.4);
        this.buttonKey2.interactive= true;
        this.buttonKey2.buttonMode= true;

        const textStyle = new TextStyle({
            align: "center",
            dropShadow: true,
            dropShadowAlpha: 0.8,
            dropShadowAngle: -3.5,
            dropShadowBlur: 3,
            dropShadowDistance: 2,
            fill: "red",
            fontFamily: "BowlCap",
            fontSize: 35,
            lineJoin: "round",
            wordWrap: true,
            wordWrapWidth: 450
        });

        let volume = new Text("Volumen", textStyle); 
        volume.position.set(this.buttonKey1.width * 3/8, this.buttonKey2.position.y + this.buttonKey1.height);

        this.btnVolumeDown = new Button(
            Texture.from("Minus"),
            Texture.from("MinusPress"),
            Texture.from("Minus"),
            "Down");
        this.btnVolumeDown.on("buttonClick",this.volumeDown, this);
        this.btnVolumeDown.position.set(volume.position.x, volume.position.y + volume.height * 1.5);
        this.btnVolumeDown.scale.set(0.5);
        this.btnVolumeDown.interactive= true;
        this.btnVolumeDown.buttonMode= true;

        this.btnVolumeUp = new Button(
            Texture.from("Plus"),
            Texture.from("PlusPress"),
            Texture.from("Plus"),
            "Up");
        this.btnVolumeUp.on("buttonClick",this.volumeUp, this);
        this.btnVolumeUp.position.set(volume.position.x + volume.width - this.btnVolumeDown.width, volume.position.y + volume.height * 1.5);
        this.btnVolumeUp.scale.set(0.5);
        this.btnVolumeUp.interactive= true;
        this.btnVolumeUp.buttonMode= true;

        this.menuDialog.addChild(this.btnSalir, this.buttonKey1,this.buttonKey2, volume, this.btnVolumeDown, this.btnVolumeUp);
        this.addChild(this.menuDialog);



        }
    onButtonSalirClick() {
        GameState.IS_PAUSED = false;
        this.visible = false;
    }
    onButtonKey1Click() {
        GameState.KEYBOARD_CONFIG = 0;
        this.visible = false;
    }
    onButtonKey2Click() {
        GameState.KEYBOARD_CONFIG = 1;
        this.visible = false;
    }

    public volumeDown() {
        sound.volumeAll -= 0.05;
    }
    public volumeUp() {
        sound.volumeAll += 0.05;
    }


}