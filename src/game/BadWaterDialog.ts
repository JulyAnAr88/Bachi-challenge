import { AnimatedSprite, Container, Graphics, Rectangle, Texture } from "pixi.js";
import { WIDTH } from "..";
import { IDamageZone } from "./IDamageZone";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";

export class BadWaterDialog extends PhysicsContainer implements IHitbox, IDamageZone {
    
    private damage = 100;
    private hitbox: Graphics;
    private dialog = new Container();

    private aguasMalas: BadWaterDialog[];

    private objeto: AnimatedSprite;
    private objeto1: AnimatedSprite;
    private objeto2: AnimatedSprite;
    private objeto3: AnimatedSprite;
    private objeto4: AnimatedSprite;
    private objeto5: AnimatedSprite;
    private objeto6: AnimatedSprite;
    private objeto7: AnimatedSprite;
    private objeto8: AnimatedSprite;
    private objeto9: AnimatedSprite;
    private objeto10: AnimatedSprite;
    private objeto11: AnimatedSprite;
    private objeto12: AnimatedSprite;
    private objeto13: AnimatedSprite;
    
    constructor()
    {
        super();

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x00FFFF, 0.3);
        this.hitbox.drawRect(0,0,WIDTH,128);
        this.hitbox.endFill();
        //this.hitbox.visible = false;
        
        this.aguasMalas = [];

        this.objeto = new AnimatedSprite (
                [
                    Texture.from("Agua"),
                    Texture.from("Agua1")
                    
                ], true
        );
                
        //let total = WIDTH/(this.objeto.width*1.5);
       
        //for (let i=0; i<Math.round(total); i++){
                
        this.objeto.play();
        this.objeto.scale.set(1.5);
        this.objeto.animationSpeed = 0.03;
        this.objeto.position.x = 0;
        /*this.objeto.position.y = 0;*/
        
        this.dialog.addChild(this.objeto);

        this.objeto1 = new AnimatedSprite (
            [
                Texture.from("Agua"),
                Texture.from("Agua1")
                
            ], true
        );            
        this.objeto1.play();
        this.objeto1.scale.set(1.5);
        this.objeto1.animationSpeed = 0.03;
        this.objeto1.position.x = this.objeto.x + this.objeto.width;
        this.objeto1.addChild(this.hitbox);
        this.dialog.addChild(this.objeto1);
                    
        this.objeto2 = new AnimatedSprite (
            [
                Texture.from("Agua"),
                Texture.from("Agua1")
                
            ], true
        );            
        this.objeto2.play();
        this.objeto2.scale.set(1.5);
        this.objeto2.animationSpeed = 0.03;
        this.objeto2.position.x = this.objeto1.x + this.objeto.width;
        this.objeto2.addChild(this.hitbox);
        this.dialog.addChild(this.objeto2);

        this.objeto3 = new AnimatedSprite (
            [
                Texture.from("Agua"),
                Texture.from("Agua1")
                
            ], true
        );            
        this.objeto3.play();
        this.objeto3.scale.set(1.5);
        this.objeto3.animationSpeed = 0.03;
        this.objeto3.position.x = this.objeto2.x + this.objeto.width;
        this.objeto3.addChild(this.hitbox);
        this.dialog.addChild(this.objeto3);

        this.objeto4 = new AnimatedSprite (
            [
                Texture.from("Agua"),
                Texture.from("Agua1")
                
            ], true
        );            
        this.objeto4.play();
        this.objeto4.scale.set(1.5);
        this.objeto4.animationSpeed = 0.03;
        this.objeto4.position.x = this.objeto3.x + this.objeto.width;
        this.objeto4.addChild(this.hitbox);
        this.dialog.addChild(this.objeto4);

        this.objeto5 = new AnimatedSprite (
            [
                Texture.from("Agua"),
                Texture.from("Agua1")
                
            ], true
        );            
        this.objeto5.play();
        this.objeto5.scale.set(1.5);
        this.objeto5.animationSpeed = 0.03;
        this.objeto5.position.x = this.objeto4.x + this.objeto.width;
        this.objeto5.addChild(this.hitbox);
        this.dialog.addChild(this.objeto5);

        this.objeto6 = new AnimatedSprite (
            [
                Texture.from("Agua"),
                Texture.from("Agua1")
                
            ], true
        );            
        this.objeto6.play();
        this.objeto6.scale.set(1.5);
        this.objeto6.animationSpeed = 0.03;
        this.objeto6.position.x = this.objeto5.x + this.objeto.width;
        this.objeto6.addChild(this.hitbox);
        this.dialog.addChild(this.objeto6);

        this.objeto7 = new AnimatedSprite (
            [
                Texture.from("Agua"),
                Texture.from("Agua1")
                
            ], true
        );            
        this.objeto7.play();
        this.objeto7.scale.set(1.5);
        this.objeto7.animationSpeed = 0.03;
        this.objeto7.position.x = this.objeto6.x + this.objeto.width;
        this.objeto7.addChild(this.hitbox);
        this.dialog.addChild(this.objeto7);

        this.objeto8 = new AnimatedSprite (
            [
                Texture.from("Agua"),
                Texture.from("Agua1")
                
            ], true
        );            
        this.objeto8.play();
        this.objeto8.scale.set(1.5);
        this.objeto8.animationSpeed = 0.03;
        this.objeto8.position.x = this.objeto4.x + this.objeto.width;
        this.objeto8.addChild(this.hitbox);
        this.dialog.addChild(this.objeto8);

        this.objeto9 = new AnimatedSprite (
            [
                Texture.from("Agua"),
                Texture.from("Agua1")
                
            ], true
        );            
        this.objeto9.play();
        this.objeto9.scale.set(1.5);
        this.objeto9.animationSpeed = 0.03;
        this.objeto9.position.x = this.objeto8.x + this.objeto.width;
        this.objeto9.addChild(this.hitbox);
        this.dialog.addChild(this.objeto9);

        this.objeto10 = new AnimatedSprite (
            [
                Texture.from("Agua"),
                Texture.from("Agua1")
                
            ], true
        );            
        this.objeto10.play();
        this.objeto10.scale.set(1.5);
        this.objeto10.animationSpeed = 0.03;
        this.objeto10.position.x = this.objeto8.x + this.objeto.width;
        this.objeto10.addChild(this.hitbox);
        this.dialog.addChild(this.objeto10);

        this.objeto11 = new AnimatedSprite (
            [
                Texture.from("Agua"),
                Texture.from("Agua1")
                
            ], true
        );            
        this.objeto11.play();
        this.objeto11.scale.set(1.5);
        this.objeto11.animationSpeed = 0.03;
        this.objeto11.position.x = this.objeto10.x + this.objeto.width;
        this.objeto11.addChild(this.hitbox);
        this.dialog.addChild(this.objeto11);

        this.objeto12 = new AnimatedSprite (
            [
                Texture.from("Agua"),
                Texture.from("Agua1")
                
            ], true
        );            
        this.objeto12.play();
        this.objeto12.scale.set(1.5);
        this.objeto12.animationSpeed = 0.03;
        this.objeto12.position.x = this.objeto8.x + this.objeto.width;
        this.objeto12.addChild(this.hitbox);
        this.dialog.addChild(this.objeto12);

        this.objeto13 = new AnimatedSprite (
            [
                Texture.from("Agua"),
                Texture.from("Agua1")
                
            ], true
        );            
        this.objeto13.play();
        this.objeto13.scale.set(1.5);
        this.objeto13.animationSpeed = 0.03;
        this.objeto13.position.x = this.objeto12.x + this.objeto.width;
        this.objeto13.addChild(this.hitbox);
        this.dialog.addChild(this.objeto13);
    
        //}   this.aguasMalas.push(this.objeto);
        
    }   
    
    
    
    makeDamage(): number {
        return this.damage;
    }

    getHitbox(): Rectangle {
        return this.hitbox.getBounds()
    }

    public getDialogAguasMalas(): Container{
        return this.dialog;
    }

    public getArrayAguasMalas(): BadWaterDialog[]{
        return this.aguasMalas;
    }

    public getWidth():number{
        return this.objeto.width;
     }


}