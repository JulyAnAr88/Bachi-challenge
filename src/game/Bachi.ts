import { AnimatedSprite, Container, Graphics, Rectangle, Sprite, Texture } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";

export class Bachi extends PhysicsContainer implements IHitbox{
    
    private hitbox: Graphics;
    private bandera: AnimatedSprite;
    private banderaCaida: Sprite;
    private bachi: Sprite;
    private dialog = new Container();
    
    constructor()
    {
        super();

        this.banderaCaida = Sprite.from("BanderaRojaCaida");

        this.bachi = Sprite.from("Bachi");
        //this.bachi.scale.set(0.3);
        this.bachi.position.set(this.banderaCaida.width + 50,0);
        this.dialog.addChild(this.bachi);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x00FFFF, 0.3);
        this.hitbox.drawRect(0,50,this.banderaCaida.width + 50,this.bachi.height * 2/3);
        this.hitbox.endFill();
        this.hitbox.visible = false;
        
        
        this.banderaCaida.scale.set(2.5);
        this.banderaCaida.position.set(0,this.bachi.height * 3/8);
        this.dialog.addChild(this.banderaCaida);
        
        this.bandera = new AnimatedSprite (
                [
                    Texture.from("BanderaRoja1"),
                    Texture.from("BanderaRoja2")
                    
                ], true
        );
                                
        this.bandera.play();
        this.bandera.scale.set(2.5);
        this.bandera.animationSpeed = 0.03;
        this.bandera.position.set(0,this.bachi.height * 3/8);
        this.bandera.visible = false;
        this.dialog.addChild(this.bandera);

        this.dialog.addChild(this.hitbox);

        this.addChild(this.dialog);
    }   
    
    
    
    
    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

    public animar() {
        this.banderaCaida.visible = false;
        this.bandera.visible = true;
    }

}