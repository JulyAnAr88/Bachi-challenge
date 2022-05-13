import { AnimatedSprite, Graphics, Rectangle, Texture } from "pixi.js";
import { IDamageZone } from "./IDamageZone";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";

export class MosquitoEnemy extends PhysicsContainer implements IHitbox, IDamageZone {
    public hitbox: Graphics;
    //private hitCircle: Graphics;
    private mosquitoAnimated: AnimatedSprite;
    private damage = 0.5;

    OBJECT_TYPE = "ENEMY";
    
    constructor()
    {
        super();

        this.mosquitoAnimated = new AnimatedSprite (
            [
                Texture.from("Mosquito1"),
                Texture.from("Mosquito2"),
                Texture.from("Mosquito3"),
                Texture.from("Mosquito4"),
                Texture.from("Mosquito5"),
                Texture.from("Mosquito6"),
                Texture.from("Mosquito7"),
                Texture.from("Mosquito8"),
                Texture.from("Mosquito9"),
                Texture.from("Mosquito10"),
                Texture.from("Mosquito11"),
                Texture.from("Mosquito12"),
                
            ], true
        );
        this.mosquitoAnimated.play();
        this.mosquitoAnimated.animationSpeed = 0.4;
        this.mosquitoAnimated.scale.set(2);
        /*this.mosquitoAnimated.anchor.set(0.2,0);

        
        this.addChild(this.mosquitoAnimated);*/

        const zero: Graphics = new Graphics();
        zero.beginFill(0xFF00FF);
        zero.drawCircle(0, 0, 10);
        zero.endFill;
        /*this.addChild(zero);

        this.hitCircle = new Graphics();
        this.hitCircle.beginFill(0x0000FF,0.0);
        this.hitCircle.drawCircle(30,35,25);
        this.hitCircle.position.set(-30,-30);
        this.addChild(this.hitCircle);*/
        
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x00FFFF, 0.3);
        this.hitbox.drawRect(5,5,60,90);
        this.hitbox.endFill();
        this.hitbox.visible = false;
        this.addChild(this.hitbox);

        this.addChild(this.mosquitoAnimated);
        
        this.mosquitoAnimated.addChild(this.hitbox);

        
    }

    public getHitbox():Rectangle
    {
        return this.hitbox.getBounds()
    }

    public makeDamage():number{
        return this.damage;
    }

    /*public override update(deltaMS:number){

        super.update(deltaMS/1000);
        this.mosquitoAnimated.update(deltaMS / 1000/60);
        
    }*/
    
}