import { Container, Sprite, Texture } from "pixi.js";
import { ChangeScene, WIDTH } from "..";
import { Button } from "../ui/Button";
import { ScenePlayerSelect } from "./ScenePlayerSelect";


export class StartMenu extends Container {

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
        tituloGame.position.set(WIDTH/2, tituloGame.height/1.5);

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


        this.addChild(fondo, tituloGame, dialog);

    }
    onButtonRightClick():void {
        ChangeScene(new ScenePlayerSelect());
    }
    onButtonExitClick():void {
        
    }

    private onButtonConfigClick():void {
        
    }
}