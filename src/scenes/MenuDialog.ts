import { Container, NineSlicePlane, Texture } from "pixi.js";
import { GameState } from "../game/GameState";
import { Button } from "../ui/Button";
import { SceneManager } from "../utils/SceneManager";
import { MenuConfig } from "./MenuConfig";
import { ScenePlayerSelect } from "./ScenePlayerSelect";
import { StartMenu } from "./StartMenu";

export class MenuDialog extends Container{

    private buttonExit:Button;
    private buttonConfig:Button;
    private buttonChangeCharacter:Button;
    private buttonReturn: Button;
    private menuDialog: any;
    private buttonDialog: Container;
    
    constructor(){
        super();

        this.menuDialog = new NineSlicePlane(
            Texture.from("HUD/fondoPlayer.png"),
            35,35,35,35
        );
        this.menuDialog.width = SceneManager.WIDTH * 1/3;
        this.menuDialog.height = SceneManager.HEIGHT * 4/7;

        this.buttonReturn = new Button(
            Texture.from("buttonReturn"),
            Texture.from("buttonReturnPress"),
            Texture.from("buttonReturn"),
            "Return");
        this.buttonReturn.on("buttonClick",this.onButtonReturnClick, this);
        this.buttonReturn.position.set(this.menuDialog.width * 1/7,0);
        this.buttonReturn.scale.set(0.3);
        this.buttonReturn.interactive= true;
        this.buttonReturn.buttonMode= true;

        this.buttonChangeCharacter = new Button(
            Texture.from("buttonChangePj"),
            Texture.from("buttonChangePjPress"),
            Texture.from("buttonChangePj"),
            "ChangeCharacter");
        this.buttonChangeCharacter.on("buttonClick",this.onButtonChangeCharacterClick, this);
        this.buttonChangeCharacter.position.set(this.menuDialog.width * 1/7,this.buttonReturn.height * 0.3 + 80);
        this.buttonChangeCharacter.scale.set(0.3);
        this.buttonChangeCharacter.interactive= true;
        this.buttonChangeCharacter.buttonMode= true;

        this.buttonConfig = new Button(
            Texture.from("buttonConfig"),
            Texture.from("buttonConfigPress"),
            Texture.from("buttonConfig"),
            "Config");
        this.buttonConfig.on("buttonClick",this.onButtonConfigClick, this);
        this.buttonConfig.position.set(this.menuDialog.width * 1/7,this.buttonChangeCharacter.position.y + this.buttonChangeCharacter.height * 0.3 + 80);
        this.buttonConfig.scale.set(0.3);
        this.buttonConfig.interactive= true;
        this.buttonConfig.buttonMode= true;
        
        this.buttonExit = new Button(
            Texture.from("buttonExit"),
            Texture.from("buttonExitPress"),
            Texture.from("buttonExit"),
            "Exit");
        this.buttonExit.on("buttonClick",this.onButtonExitClick, this);
        this.buttonExit.position.set(this.menuDialog.width * 1/7,this.buttonConfig.position.y + this.buttonChangeCharacter.height * 0.3 + 80);
        this.buttonExit.scale.set(0.3);
        this.buttonExit.interactive= true;
        this.buttonExit.buttonMode= true;
    
        this.buttonDialog = new Container();
        this.buttonDialog.addChild(this.buttonReturn, this.buttonChangeCharacter, this.buttonConfig, this.buttonExit);
        this.menuDialog.addChild(this.buttonDialog);

        this.addChild(this.menuDialog);



    }
    onButtonReturnClick() {
        GameState.ISPAUSED = false
        this.visible = false;
    }

    onButtonChangeCharacterClick():void {
        GameState.PLAY = true;
        SceneManager.changeScene(new ScenePlayerSelect());
    }
    onButtonExitClick():void {
        SceneManager.changeScene(new StartMenu());
    }

    private onButtonConfigClick():void {
        let menuConfig = new MenuConfig();
        this.removeChild(this.menuDialog);
        this.addChild(menuConfig);
    }
}