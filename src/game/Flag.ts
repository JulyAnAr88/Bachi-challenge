import { AnimatedSprite, Graphics, Rectangle, Sprite, Texture } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";

export class Flag extends PhysicsContainer implements IHitbox {
    
    private hitbox: Graphics;
    private bandera: AnimatedSprite;
    private banderaCaida: Sprite;
    /* dialog: MetaDialog1;
    private dialog; */
    
    constructor()
    {
        super();

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x00FFFF, 0.3);
        this.hitbox.drawRect(0,0,70,250);
        this.hitbox.endFill();
        this.hitbox.visible = false;
        
        
        this.banderaCaida = Sprite.from("Object/flagGreenHanging.png");
        this.banderaCaida.scale.set(2.5);
        this.addChild(this.banderaCaida);
        this.banderaCaida.addChild(this.hitbox);
        
        this.bandera = new AnimatedSprite (
                [
                    Texture.from("Object/flagGreen.png"),
                    Texture.from("Object/flagGreen2.png")
                    
                ], true
        );
                
                
        this.bandera.play();
        this.bandera.scale.set(2.5);
        this.bandera.animationSpeed = 0.03;
        this.bandera.position.x = 0;
        this.bandera.visible = false;
        this.addChild(this.bandera);
        this.bandera.addChild(this.hitbox);

    }   
    
    
    getHitbox(): Rectangle {
        return this.hitbox.getBounds()
    }

    public animar() {
        this.banderaCaida.visible = false;
        this.bandera.visible = true;
    }
}