import { Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";

export class Platform extends PhysicsContainer implements IHitbox {
    private hitbox: Graphics;
        
    constructor(sprite:any)
    {
        super();
        const spr = Sprite.from(sprite);
        spr.scale.set(1.5);
        this.addChild(spr);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x00FFFF, 0.3);
        this.hitbox.drawRect(0,0,192,192);
        this.hitbox.endFill();
        this.hitbox.visible = false;
        this.addChild(this.hitbox);

    }

    public getHitbox():Rectangle
    {
        return this.hitbox.getBounds()
    }

}