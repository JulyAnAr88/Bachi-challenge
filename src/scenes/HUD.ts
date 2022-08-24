import { sound } from "@pixi/sound";
import { Container, NineSlicePlane, Sprite, TextStyle, Texture, Text, BitmapText } from "pixi.js";
import { GameState } from "../game/GameState";
import { Button } from "../ui/Button";
import { ToggleButton } from "../ui/ToggleButton";
import { IUpdateable } from "../utils/IUpdateable";
import { SceneManager } from "../utils/SceneManager";
import { Health } from "./Health";
import { MenuDialog } from "./MenuDialog";
import { ScenePlayerSelect } from "./ScenePlayerSelect";

export class HUD extends Container implements IUpdateable{

    private buttonMenu:Button;
    private corazonLleno: Health;
    private damage = 100;
    private dialog = new Container();

    private textNamePlayer:any;
    private contador: Container;
 
    private message: BitmapText;
    
    private str = "00:00"; 
    public static TIME_NOW = "00:00";
        

    constructor (){
        super();

        const fondoPlayer: Sprite = Sprite.from("HUD/fondoPlayer.png");
        fondoPlayer.position.x = 10;
        fondoPlayer.position.y = 10;
        fondoPlayer.scale.set(2.8);

        this.corazonLleno = new Health;
        this.corazonLleno.position.x = 155;
        this.corazonLleno.position.y = 10;
        this.corazonLleno.scale.set(1.2);

        this.dialog.position.x = this.corazonLleno.position.x;
        this.dialog.position.y = this.corazonLleno.position.y + 62;
            
        const fondoNamePlayer = new NineSlicePlane(
            Texture.from("HUD/fondoPlayer.png"),
            35,35,35,35
        );
        
        fondoNamePlayer.scale.set(0.5);

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
            wordWrap: true,
            wordWrapWidth: 450
        })

        let namePlayer = JSON.stringify(sessionStorage.getItem("name"));

        if (namePlayer == "null"){
            switch (ScenePlayerSelect.PLAY_SELECT) {
            case 0:

                this.textNamePlayer = new Text('Becky', textStyle);
                
                
                break;
            case 1:

                this.textNamePlayer = new Text('Timmy', textStyle);
                
                break;
        
            default:
                break;
            }
    
        }else{
            this.textNamePlayer = new Text(namePlayer.substring(15, namePlayer.length-4), textStyle);
        }        
        this.textNamePlayer.position.x = fondoNamePlayer.position.x + fondoNamePlayer.width/12;
        this.textNamePlayer.position.y = fondoNamePlayer.position.y;

        
        fondoNamePlayer.height = this.textNamePlayer.height + 20;
        fondoNamePlayer.width = this.textNamePlayer.width + 20;
             
        fondoNamePlayer.addChild(this.textNamePlayer);

        this.dialog.addChild(fondoNamePlayer);        
        
        this.buttonMenu = new Button(
            Texture.from("HUD/tan.png"),
            Texture.from("HUD/tan_pressed.png"),
            Texture.from("HUD/tan_pressed.png"),
           "Menu");
        this.buttonMenu.on("buttonClick",this.onButtonClick, this);       
        this.buttonMenu.position.x = SceneManager.WIDTH - this.buttonMenu.width * 2;
        this.buttonMenu.position.y = this.buttonMenu.height * 1/3;
        this.buttonMenu.scale.set(1.7);
        this.buttonMenu.interactive= true;
        this.buttonMenu.buttonMode= true;

        
        this.contador = new Container;

        
        this.message = new BitmapText(this.str,{fontName:"Mi BitmapFont"})

        this.contador.position.set(this.buttonMenu.position.x - this.buttonMenu.width * 2, this.buttonMenu.height * 1/3);
        this.contador.addChild(this.message);

        const toggleMute = new ToggleButton(Texture.from("MusicOn"), Texture.from("MusicOff"));
        toggleMute.position.set(this.contador.position.x - toggleMute.width - 20, this.buttonMenu.height * 1/9);
        
        toggleMute.on(ToggleButton.TOGGLE_EVENT, this.toggleMute, this);        
        
        this.addChild(fondoPlayer, this.dialog, this.corazonLleno, this.buttonMenu,this.contador, toggleMute);
    }


    update(deltaTime: number, _deltaFrame?: number): void {

        this.removeChild(this.contador);
        this.message.text = this.countdown(deltaTime);
        HUD.TIME_NOW = this.message.text;
        this.contador.addChild(this.message);
        this.addChild(this.contador);
        
      
        if((100) > this.damage && this.damage >= (100 * 5/6)){
            this.corazonLleno.actualizarMedioCorazón(3);
            
        }        
        if ((100 * 5/6) > this.damage && this.damage >= (100 * 2/3)) {
            this.corazonLleno.actualizarCorazónVacio(3);
            
        }
        if((100 * 2/3) > this.damage && this.damage >= (100 * 1/2)){
            this.corazonLleno.actualizarMedioCorazón(2);
            
        }        
        if ((100 * 1/2) > this.damage && this.damage >= (100 * 1/3)) {
            this.corazonLleno.actualizarCorazónVacio(2);
            
        }
        if((100 * 1/3) > this.damage && this.damage >= (100 * 1/6)){
            this.corazonLleno.actualizarMedioCorazón(1);
            
        }
        if (this.damage <= 0) {
            
            if(this.corazonLleno.getCurrent() > 0.5){
                
                this.corazonLleno.morirse(this.corazonLleno.getCurrent());
            }else{
                
                this.corazonLleno.actualizarCorazónVacio(1);
                
            }
            
            
        }

    }

    public gatherDamagePlayer(damage:number){
        
        this.damage = damage;
        this.update(1);
    }


    private onButtonClick() {
        GameState.ISPAUSED = true;
        let dialogo = new MenuDialog();
        dialogo.visible = true;
        dialogo.position.set(SceneManager.WIDTH * 1/3, SceneManager.HEIGHT * 1/7);
        this.addChild(dialogo);
    }

    public toggleMute(unMute:boolean) {
        if (unMute) 
        {
            sound.unmuteAll();
        }else
        {
            sound.muteAll();
        }
    }

    public countdown(deltaTime: number): string{
        const date = new Date(deltaTime);

        var minutes = date.getUTCMinutes();
        var seconds = date.getUTCSeconds();
        var min = minutes.toString();
        var sec = seconds.toString();

    if (minutes < 10)
        min = "0" + minutes.toString();

    if (seconds < 10)
        sec = "0" + seconds;

        var str = min + ":" + sec;

        return str;
    }
}