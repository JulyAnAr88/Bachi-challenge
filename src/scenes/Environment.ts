import { AnimatedSprite, Texture } from "pixi.js";
import { PhysicsContainer } from "../game/PhysicsContainer";
import { IUpdateable } from "../utils/IUpdateable";


export class Environment extends PhysicsContainer implements IUpdateable{

    private objeto: any;

    constructor(nroObjeto:number){
        super();

        switch (nroObjeto) {
            case 0:
                this.objeto = new AnimatedSprite (
                    [
                        Texture.from("Arbol1")
                        
                    ], true
                );
                this.objeto.play();
                this.objeto.scale.set(2.5);
                this.objeto.anchor.set(-0.2);
                this.objeto.animationSpeed = 0.4;
                this.addChild(this.objeto);
                
                break;
            case 1:
                this.objeto = new AnimatedSprite (
                    [
                        Texture.from("Arbol2")
                        
                    ], true
                );
                this.objeto.play();
                this.objeto.scale.set(2.5);
                this.objeto.anchor.set(-0.2);
                this.objeto.animationSpeed = 0.4;
                this.addChild(this.objeto);
                break;
            case 2:
                this.objeto = new AnimatedSprite (
                    [
                        Texture.from("Arbusto")
                        
                    ], true
                );
                this.objeto.play();
                this.objeto.scale.set(2.5);
                this.objeto.anchor.set(-0.2);
                this.objeto.animationSpeed = 0.4;
                this.addChild(this.objeto);
                break;
            
            default:
                break;
        }


    }
    
    public getObject():AnimatedSprite{
        return this.objeto;
    }

    public override update(deltaMS:number){
        super.update(deltaMS/100);
    }

    
}