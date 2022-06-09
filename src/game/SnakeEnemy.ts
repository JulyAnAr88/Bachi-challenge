import { AnimatedSprite, Graphics, Rectangle, Texture } from "pixi.js";
import { IDamageZone } from "./IDamageZone";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";

export class SnakeEnemy extends PhysicsContainer implements IHitbox, IDamageZone {
    public hitbox: Graphics;
    //private hitCircle: Graphics;
    private snakeAnimated: AnimatedSprite;
    private damage = 1;

    OBJECT_TYPE = "ENEMY";
    
    constructor()
    {
        super();

        this.snakeAnimated = new AnimatedSprite (
            [
                Texture.from("Enemies/snake/tile000.png"),
                Texture.from("Enemies/snake/tile001.png"),
                Texture.from("Enemies/snake/tile002.png"),
                Texture.from("Enemies/snake/tile003.png"),
                Texture.from("Enemies/snake/tile004.png"),
                Texture.from("Enemies/snake/tile005.png"),
                Texture.from("Enemies/snake/tile006.png"),
                Texture.from("Enemies/snake/tile007.png"),
                                
            ], true
        );
        this.snakeAnimated.play();
        this.snakeAnimated.animationSpeed = 0.3;
        this.snakeAnimated.scale.set(2);
        this.addChild(this.snakeAnimated);

        /*this.hitCircle = new Graphics();
        this.hitCircle.beginFill(0x0000FF,0.0);
        this.hitCircle.drawCircle(30,35,25);
        this.hitCircle.position.set(-30,-30);
        this.addChild(this.hitCircle);*/

        const zero: Graphics = new Graphics();
        zero.beginFill(0xFF00FF);
        zero.drawCircle(0, 0, 10);
        zero.endFill;
        //this.addChild(zero);
        
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x00FFFF, 0.3);
        this.hitbox.drawRect(5,5,60,90);
        this.hitbox.endFill();
        this.hitbox.visible = false;
        this.addChild(this.hitbox);

        this.addChild(this.snakeAnimated);
        
        this.snakeAnimated.addChild(this.hitbox);

        
    }

    public getHitbox():Rectangle
    {
        return this.hitbox.getBounds()
    }

    public makeDamage():number{
        return this.damage;
    }
}