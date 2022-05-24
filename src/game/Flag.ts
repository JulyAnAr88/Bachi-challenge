import { AnimatedSprite, Graphics, Rectangle, Sprite, Texture } from "pixi.js";
//import { MetaDialog1 } from "../scenes/MetaDialog1";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";

export class Flag extends PhysicsContainer implements IHitbox {
    
    private hitbox: Graphics;
    private bandera: AnimatedSprite;
    private banderaCaida: Sprite;
    //private dialog;
    
    constructor()
    {
        super();

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x00FFFF, 0.3);
        this.hitbox.drawRect(0,0,70,250);
        this.hitbox.endFill();
        this.hitbox.visible = false;
        
        
        this.banderaCaida = Sprite.from("BanderaVerdeCaida");
        this.banderaCaida.scale.set(2.5);
        this.addChild(this.banderaCaida);
        this.banderaCaida.addChild(this.hitbox);
        
        this.bandera = new AnimatedSprite (
                [
                    Texture.from("BanderaVerde1"),
                    Texture.from("BanderaVerde2")
                    
                ], true
        );
                
                
        this.bandera.play();
        this.bandera.scale.set(2.5);
        this.bandera.animationSpeed = 0.03;
        this.bandera.position.x = 0;
        this.bandera.visible = false;
        this.addChild(this.bandera);
        this.bandera.addChild(this.hitbox);

        /*this.dialog = new MetaDialog1();
        this.addChild(this.dialog);*/
    }   
    
    
    getHitbox(): Rectangle {
        return this.hitbox.getBounds()
    }

    public animar() {
        this.banderaCaida.visible = false;
        this.bandera.visible = true;
        /*this.dialog.position.set(contenedor.width * 2/5, 0);
        this.dialog.visible = true;
        contenedor.addChild(this)
        setTimeout(() => {
            this.dialog.visible = false;
        }, 8 * 1000);

        contenedor.addChild(this.dialog);*/

    }
}