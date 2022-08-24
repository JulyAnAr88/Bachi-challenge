import { Sprite, TextStyle, Texture, Text } from "pixi.js";
import { Tween } from "tweedle.js";
import { GameState } from "../game/GameState";
import { Button } from "../ui/Button";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { AnimationBecky } from "./AnimationBecky";
import { AnimationTimmy } from "./AnimationTimmy";
import { GameScene } from "./GameScene";

export class ScenePlayerSelect extends SceneBase {

    public static PLAY_SELECT: number;
    private buttonBecky: Button;
    private buttonTimmy: Button;
    private buttonEdit: Button;
    private playerTimmy: AnimationTimmy;
    private playerBecky: AnimationBecky;
    private namePlayer: Text;
    private nameTextStyle: TextStyle;
    private tituloElige: Sprite;

    constructor(){
        super();

        const fondo= Sprite.from("FondoUI");

        this.tituloElige= Sprite.from("TituloElige");
        this.tituloElige.scale.set(0.5);
        this.tituloElige.anchor.set(0.5);
        this.tituloElige.position.set(SceneManager.WIDTH/2, this.tituloElige.height/1.5);

        this.nameTextStyle = new TextStyle({
            align: "center",
            dropShadow: true,
            dropShadowAlpha: 0.8,
            dropShadowAngle: -3.5,
            dropShadowBlur: 3,
            dropShadowDistance: 2,
            fill: "red",
            fontFamily: "BowlCap",
            fontSize: 55,
            lineJoin: "round",
            lineHeight: 22,
            wordWrap: false
        })
        this.namePlayer = new Text('Dale un nombre', this.nameTextStyle);
        this.namePlayer.position.set(this.tituloElige.position.x * 0.7, this.tituloElige.position.y + 130)

        this.buttonEdit = new Button(
            Texture.from("Edit"),
            Texture.from("EditPress"),
            Texture.from("Edit"),
            "Edit");
        this.buttonEdit.on("buttonClick",this.onButtonEditClick, this);
        this.buttonEdit.position.x = this.tituloElige.position.x + this.tituloElige.width * 1/3;
        this.buttonEdit.position.y = this.tituloElige.position.y + 150;
        this.buttonEdit.scale.set(0.1);
        this.buttonEdit.interactive= true;
        this.buttonEdit.buttonMode= true;

        this.buttonBecky = new Button(
            Texture.from("marcoPlayer"),
            Texture.from("marcoPlayerPress"),
            Texture.from("marcoPlayer"),
            "Becky");
        this.buttonBecky.on("buttonClick",this.onButtonBeckyClick, this);
        this.buttonBecky.position.x =  this.buttonBecky.width * 4.5;
        this.buttonBecky.position.y = this.tituloElige.position.y + 250;
        this.buttonBecky.scale.set(2.2);
        this.buttonBecky.interactive= true;
        this.buttonBecky.buttonMode= true;

        this.buttonTimmy = new Button(
            Texture.from("marcoPlayer"),
            Texture.from("marcoPlayerPress"),
            Texture.from("marcoPlayer"),
            "Timmy");
        this.buttonTimmy.on("buttonClick",this.onButtonTimmyClick, this);
        this.buttonTimmy.position.x = this.buttonBecky.position.x + this.buttonBecky.width * 1.5;
        this.buttonTimmy.position.y = this.tituloElige.position.y + 250;
        this.buttonTimmy.scale.set(2.2);
        this.buttonTimmy.interactive= true;
        this.buttonTimmy.buttonMode= true;

        this.playerTimmy = new AnimationTimmy(0.5, "idle");
        this.playerTimmy.x = this.buttonTimmy.position.x + this.buttonTimmy.width* 3/4;
        this.playerTimmy.y = this.buttonTimmy.position.y + this.buttonTimmy.height/8;
        this.playerTimmy.scale.set(-0.55,0.55);

        this.playerBecky = new AnimationBecky(0.5, "idle");        
        this.playerBecky.x = this.buttonBecky.position.x + this.buttonBecky.width/3;
        this.playerBecky.y = this.buttonBecky.position.y + this.buttonBecky.height/7;
        this.playerBecky.scale.set(0.5);


        this.addChild(fondo, this.tituloElige, this.namePlayer, this.buttonBecky, this.buttonTimmy, this.playerTimmy, this.playerBecky, this.buttonEdit);
    }
    async onButtonEditClick() {
        let nombre = prompt("Ingresa un nombre");
        const nameObj = {nombre};
        sessionStorage.setItem("name", JSON.stringify(nameObj));
        this.removeChild(this.namePlayer);
        this.namePlayer = new Text(JSON.stringify(nombre), this.nameTextStyle);
        this.namePlayer.position.set(this.tituloElige.position.x * 0.7, this.tituloElige.position.y + 130);
        this.addChild(this.namePlayer);
    }


    onButtonTimmyClick() {

        this.playerTimmy.scale.set(0.55);
        
        this.playerTimmy.setState("walk", 0.5, true);
        new Tween(this.playerTimmy)
            .to({x: this.playerTimmy.x + 40},700)
            .start()
            .onComplete(()=>{
                this.playerTimmy.setState("jump", 0.3, false);
                new Tween(this.playerTimmy)
                    .to({x: this.playerTimmy.x + 150, y: this.playerTimmy.y + 300},800)
                    .start()
                    .onComplete(()=>{
                        this.playerTimmy.setState("run", 0.5, true);
                        new Tween(this.playerTimmy)
                            .to({x: SceneManager.WIDTH + this.playerTimmy.width},2000)
                            .start()
                            .onComplete(()=>{
                                GameState.ISPAUSED = false;
                                ScenePlayerSelect.PLAY_SELECT = 1;
                                SceneManager.changeScene(new GameScene());
                            });
                    });
        });
        
    }


    onButtonBeckyClick() {
              
        this.playerBecky.setState("walk", 0.5, true);
        new Tween(this.playerBecky)
            .to({x: this.playerBecky.x + 40},700)
            .start()
            .onComplete(()=>{
                this.playerBecky.setState("jump", 0.3, false);
                new Tween(this.playerBecky)
                    .to({x: this.playerBecky.x + 150, y: this.playerBecky.y + 300},800)
                    .start()
                    .onComplete(()=>{
                        this.playerBecky.setState("run", 0.5, true);
                        new Tween(this.playerBecky)
                            .to({x: SceneManager.WIDTH + this.playerBecky.width},2000)
                            .start()
                            .onComplete(()=>{                        
                                ScenePlayerSelect.PLAY_SELECT = 0;
                                GameState.ISPAUSED = false;
                                SceneManager.changeScene(new GameScene());
                            });
                    });
        });
    }

    public update()
    {
    }
}