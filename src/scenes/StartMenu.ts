import { sound } from "@pixi/sound";
import { Container, Sprite, Texture } from "pixi.js";
import { Button } from "../ui/Button";
import { ToggleButton } from "../ui/ToggleButton";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { MenuConfig } from "./MenuConfig";
import { ScenePlayerSelect } from "./ScenePlayerSelect";


export class StartMenu extends SceneBase {
    
    private buttonExit:Button;
    private buttonConfig:Button;
    private buttonRight:Button;

         
    
    constructor(){
        super();
        const dialog = new Container();

        const fondo= Sprite.from("FondoUI");

        const tituloGame= Sprite.from("TituloGame");
        tituloGame.scale.set(0.5);
        tituloGame.anchor.set(0.5);
        tituloGame.position.set(SceneManager.WIDTH/2, tituloGame.height/1.5);

        

        this.buttonRight = new Button(
            Texture.from("buttoncomenzar"),
            Texture.from("buttoncomenzarPress"),
            Texture.from("buttoncomenzar"),
            "Right");
        this.buttonRight.on("buttonClick",this.onButtonRightClick, this);
        this.buttonRight.position.set(0);
        this.buttonRight.scale.set(0.3);
        this.buttonRight.interactive= true;
        this.buttonRight.buttonMode= true;

        this.buttonConfig = new Button(
            Texture.from("buttonConfig"),
            Texture.from("buttonConfigPress"),
            Texture.from("buttonConfig"),
            "Config");
        this.buttonConfig.on("buttonClick",this.onButtonConfigClick, this);
        this.buttonConfig.position.y = this.buttonRight.height * 0.3 + 80;
        this.buttonConfig.scale.set(0.3);
        this.buttonConfig.interactive= true;
        this.buttonConfig.buttonMode= true;
        
        this.buttonExit = new Button(
            Texture.from("buttonExit"),
            Texture.from("buttonExitPress"),
            Texture.from("buttonExit"),
            "Exit");
        this.buttonExit.on("buttonClick",this.onButtonExitClick, this);
        this.buttonExit.position.y = this.buttonConfig.position.y + this.buttonRight.height * 0.3 + 80;
        this.buttonExit.scale.set(0.3);
        this.buttonExit.interactive= true;
        this.buttonExit.buttonMode= true;
        
        dialog.position.x = tituloGame.position.x * 3/4;
        dialog.position.y = tituloGame.position.y * 2.5;
        dialog.addChild(this.buttonRight, this.buttonConfig, this.buttonExit);
        
        sound.find("Chamarrito");

        const toggleMute = new ToggleButton(Texture.from("MusicOn"), Texture.from("MusicOff"));
        toggleMute.position.set(dialog.position.x * 2, tituloGame.position.y * 4);
        toggleMute.scale.set(2);
        toggleMute.on(ToggleButton.TOGGLE_EVENT, this.toggleMute, this);

        
        this.addChild(fondo, tituloGame, dialog, toggleMute);
        this.cortina();

    }
    onButtonRightClick():void {
        SceneManager.changeScene(new ScenePlayerSelect());
    }

    onButtonExitClick():void {
        
    }

    private onButtonConfigClick():void {
        let menuConfig = new MenuConfig();
        menuConfig.position.set(SceneManager.WIDTH * 1/3, SceneManager.HEIGHT * 1/7);
        this.addChild(menuConfig);
        
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

    public cortina(){
        sound.play("Chamarrito", {
            loop:true,
            singleInstance:true,
            });
    }

    public update(): void {
        throw new Error("Method not implemented.");
    }

}