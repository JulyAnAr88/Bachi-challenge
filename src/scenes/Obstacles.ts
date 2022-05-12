import { AnimatedSprite, Graphics, Rectangle, Texture } from "pixi.js";
import { IHitbox } from "../game/IHitbox";
import { PhysicsContainer } from "../game/PhysicsContainer";
import { IUpdateable } from "../utils/IUpdateable";

export class Obstacles extends PhysicsContainer implements IUpdateable, IHitbox{

    private objeto: any;
    private hitbox: Graphics;

    constructor(nroObjeto:number){
        super();

        switch (nroObjeto) {
            case 0:
                this.objeto = new AnimatedSprite (
                    [
                        Texture.from("Stone")
                        
                    ], true
                );
                this.objeto.play();
                this.objeto.scale.set(2);
                this.objeto.anchor.set(-0.2);
                this.objeto.animationSpeed = 0.4;
                this.addChild(this.objeto);
                
                break;
            case 1:
                this.objeto = new AnimatedSprite (
                    [
                        Texture.from("Tronco")
                        
                    ], true
                );
                this.objeto.play();
                this.objeto.scale.set(2);
                this.objeto.anchor.set(-0.2);
                this.objeto.animationSpeed = 0.4;
                this.addChild(this.objeto);
                break;
            case 2:
                this.objeto = new AnimatedSprite (
                    [
                        Texture.from("Arbusto1")
                        
                    ], true
                );
                this.objeto.play();
                this.objeto.scale.set(2);
                this.objeto.anchor.set(-0.2);
                this.objeto.animationSpeed = 0.4;
                this.addChild(this.objeto);
                break;
            
            default:
                break;
        }

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x00FFFF, 0.3);
        this.hitbox.drawRect(90,50,190,80);
        this.hitbox.endFill();
        this.hitbox.visible = false;
        this.addChild(this.hitbox);

    }

    public getHitbox():Rectangle
       {
        return this.hitbox.getBounds()
       }
    
}