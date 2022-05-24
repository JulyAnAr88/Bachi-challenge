import { sound } from "@pixi/sound";
import { Container, NineSlicePlane, Sprite, TextStyle, Texture, Text } from "pixi.js";
import { HEIGHT, WIDTH } from "..";
import { Button } from "../ui/Button";
import { ToggleButton } from "../ui/ToggleButton";
import { IUpdateable } from "../utils/IUpdateable";
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
    /*private secondUnity: number;
    
    private minuteDecena: number;*/
    private cont = 0;
    private second = 0;
    private message: Text;
    private minute = 0;
    

    private textStyle = new TextStyle({
        fill: "white",
        fontFamily: "CompleteinHim",
        fontSize: 50,
        lineJoin: "round",
        strokeThickness: 4
    });
    

    constructor (){
        super();

        const fondoPlayer: Sprite = Sprite.from("FondoPlayer");
        fondoPlayer.position.x = 10;
        fondoPlayer.position.y = 10;
        fondoPlayer.scale.set(2.8);

        this.corazonLleno = new Health;
        this.corazonLleno.position.x = 155;
        this.corazonLleno.position.y = 10;
        this.corazonLleno.scale.set(1.2);

        this.dialog.position.x = this.corazonLleno.position.x;
        this.dialog.position.y = this.corazonLleno.position.y + 62;
            
        const namePlayer = new NineSlicePlane(
            Texture.from("FondoPlayer"),
            35,35,35,35
        );
        namePlayer.width = this.corazonLleno.width * 2;
        namePlayer.height = fondoPlayer.height;
        namePlayer.scale.set(0.5);

        
        switch (ScenePlayerSelect.PLAY_SELECT) {
            case 0:

                this.textNamePlayer = Sprite.from("Becky")                
                
                break;
            case 1:

                this.textNamePlayer = Sprite.from("Timmy")
                                
                break;
        
            default:
                break;
        }
    
        this.textNamePlayer.position.x = namePlayer.position.x + namePlayer.width/12;
        this.textNamePlayer.position.y = namePlayer.position.y + namePlayer.height/14;
        this.textNamePlayer.anchor.set(0.2);
        this.textNamePlayer.scale.set(0.35);
             
        namePlayer.addChild(this.textNamePlayer);

        this.dialog.addChild(namePlayer);        
        
        this.buttonMenu = new Button(
            Texture.from("BotonMenu"),
            Texture.from("BotonMenuPressed"),
            Texture.from("BotonMenuPressed"),
           "Menu");
        this.buttonMenu.on("buttonClick",this.onButtonClick, this);       
        this.buttonMenu.position.x = WIDTH - this.buttonMenu.width * 2;
        this.buttonMenu.position.y = this.buttonMenu.height * 1/3;
        this.buttonMenu.scale.set(1.7);
        this.buttonMenu.interactive= true;
        this.buttonMenu.buttonMode= true;

        let str = "0:0";
        this.contador = new Container;

        this.message = new Text(str, this.textStyle);

        this.contador.position.set(this.buttonMenu.position.x - this.buttonMenu.width * 1.5, this.buttonMenu.height * 1/3);
        this.contador.addChild(this.message);

        const toggleMute = new ToggleButton(Texture.from("MusicOn"), Texture.from("MusicOff"));
        toggleMute.position.set(this.contador.position.x - toggleMute.width - 20, this.buttonMenu.height * 1/9);
        //toggleMute.scale.set(2);
        toggleMute.on(ToggleButton.TOGGLE_EVENT, this.toggleMute, this);
        
        
        
        
        this.addChild(fondoPlayer, this.dialog, this.corazonLleno, this.buttonMenu,this.contador, toggleMute);
    }


    update(_deltaTime: number, _deltaFrame?: number): void {

        /*let str = this.countdown(deltaTime);
        this.message = new Text(str, this.textStyle);
        console.log(str);
        this.contador.addChild(this.message);
        this.addChild(this.contador);   */
        
      
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
        let dialogo = new MenuDialog();
        dialogo.visible = true;
        dialogo.position.set(WIDTH * 1/3, HEIGHT * 1/7);
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
        let str = "";
                        
        this.cont += Math.trunc(deltaTime / 1000);

        if (this.cont > 59) {
            this.second += 1;
            this.cont = 0;        

            if (this.second > 59){
                this.minute += 1;
               
                str = this.minute + ":" + this.second;
                console.log("if "+str);
                this.message = new Text(str, this.textStyle);
                this.second = 0; 
            } 
        }    
        

        return str;
    }
}