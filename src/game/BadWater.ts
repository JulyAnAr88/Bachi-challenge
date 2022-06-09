import { AnimatedSprite, Graphics, Rectangle, Texture } from "pixi.js";
import { IDamageZone } from "./IDamageZone";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";

export class BadWater extends PhysicsContainer implements IHitbox, IDamageZone {
    
    private damage = 100;
    private hitbox: Graphics;

    private objeto: AnimatedSprite;
    
    
    constructor()
    {
        super();

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x00FFFF, 0.3);
        this.hitbox.drawRect(0,0,128,128);
        this.hitbox.endFill();
        this.hitbox.visible = false;
        

        this.objeto = new AnimatedSprite (
                [
                    Texture.from("Tiles/Agua.png"),
                    Texture.from("Tiles/Agua1.png")
                    
                ], true
        );
                
                
        this.objeto.play();
        this.objeto.scale.set(1.5);
        this.objeto.animationSpeed = 0.03;
        this.objeto.position.x = 0;
        this.addChild(this.objeto);
        this.objeto.addChild(this.hitbox);
    }   
    
    
    
    makeDamage(): number {
        return this.damage;
    }

    getHitbox(): Rectangle {
        return this.hitbox.getBounds()
    }

}