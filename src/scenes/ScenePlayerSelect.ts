import { Container, Sprite, Texture } from "pixi.js";
import { ChangeScene, WIDTH } from "..";
import { PlayerAnimationBecky } from "../game/PlayerAnimationBecky";
import { PlayerAnimationTimmy } from "../game/PlayerAnimationTimmy";
import { Button } from "../ui/Button";
import { GameScene } from "./GameScene";
//import { TickerScene } from "./TickerScene";

export class ScenePlayerSelect extends Container {

    public static PLAY_SELECT: number;
    private buttonBecky:Button;
    private buttonTimmy:Button;
    private playerTimmy: PlayerAnimationTimmy;
    private playerBecky: PlayerAnimationBecky;
    

    constructor(){
        super();
    

        const fondo= Sprite.from("FondoUI");

        const tituloElige= Sprite.from("TituloElige");
        tituloElige.scale.set(0.5);
        tituloElige.anchor.set(0.5);
        tituloElige.position.set(WIDTH/2, tituloElige.height/1.5);

        const fondoPlayer = Sprite.from("HUD/fondoPlayer2.png");
        fondoPlayer.position.x = fondoPlayer.width * 4.5;
        fondoPlayer.position.y = tituloElige.position.y + 200;
        fondoPlayer.scale.set(2.2);

        const fondoPlayer1: Sprite = Sprite.from("HUD/fondoPlayer2.png");
        fondoPlayer1.position.x = fondoPlayer.position.x + fondoPlayer.width * 1.5;
        fondoPlayer1.position.y = tituloElige.position.y + 200;
        fondoPlayer1.scale.set(2.2);

        this.buttonBecky = new Button(
            Texture.from("buttonbecky"),
            Texture.from("buttonbeckyPress"),
            Texture.from("buttonbecky"),
            "Becky");
        this.buttonBecky.on("buttonClick",this.onButtonBeckyClick, this);
        this.buttonBecky.position.x =  fondoPlayer.position.x;
        this.buttonBecky.position.y = fondoPlayer.position.y + fondoPlayer.height + 20;
        this.buttonBecky.scale.set(0.2);
        this.buttonBecky.interactive= true;
        this.buttonBecky.buttonMode= true;

        this.buttonTimmy = new Button(
            Texture.from("buttontimmy"),
            Texture.from("buttontimmyPress"),
            Texture.from("buttontimmy"),
            "Timmy");
        this.buttonTimmy.on("buttonClick",this.onButtonTimmyClick, this);
        this.buttonTimmy.position.x = fondoPlayer1.position.x;
        this.buttonTimmy.position.y = fondoPlayer1.position.y + fondoPlayer1.height + 20;
        this.buttonTimmy.scale.set(0.2);
        this.buttonTimmy.interactive= true;
        this.buttonTimmy.buttonMode= true;

        this.playerTimmy = new PlayerAnimationTimmy(0.4, 0.25, 0);
        this.playerTimmy.scale.x = -1;
        this.playerTimmy.x = fondoPlayer1.position.x + fondoPlayer1.width/2;
        this.playerTimmy.y = fondoPlayer1.position.y + fondoPlayer1.height/8;
        this.playerTimmy.scale.set(0.5);

        this.playerBecky = new PlayerAnimationBecky(0.4, 0.25, 0);        
        this.playerBecky.x = fondoPlayer.position.x + fondoPlayer.width/3;
        this.playerBecky.y = fondoPlayer.position.y + fondoPlayer.height/7;
        this.playerBecky.scale.set(0.5);

        this.addChild(fondo, tituloElige, fondoPlayer, fondoPlayer1, this.buttonBecky, this.buttonTimmy, this.playerTimmy, this.playerBecky);
    }


    onButtonTimmyClick() {
        ScenePlayerSelect.PLAY_SELECT = 1;
        //ChangeScene(new TickerScene());
        ChangeScene(new GameScene());
    }


    onButtonBeckyClick() {
        ScenePlayerSelect.PLAY_SELECT = 0;
        //ChangeScene(new TickerScene());
        ChangeScene(new GameScene());
    }
}