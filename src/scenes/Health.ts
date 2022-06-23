import { Container, Sprite } from "pixi.js";

export class Health extends Container{
   
    private corazonLleno: Sprite;
    private corazon1: Sprite;
    private corazon2: Sprite;
    private corazon0: Sprite;
    private corazon1_5: Sprite;
    private corazon2_5: Sprite;
    private corazon0_5: Sprite;
    private current: number;

    constructor (){
        super();
                
    
        this.corazonLleno = Sprite.from("HUD/hud_heartFullx3.png");
        this.corazonLleno.position.set(0,0);
        this.current = 3;
        
        this.corazon2_5 = Sprite.from("HUD/hud_heartFullx2.5.png");
        
        this.corazon2 = Sprite.from("HUD/hud_heartFullx2.png");
        
        this.corazon1_5 = Sprite.from("HUD/hud_heartFullx1.5.png");

        this.corazon1 = Sprite.from("HUD/hud_heartFullx1.png");
        
        this.corazon0_5 = Sprite.from("HUD/hud_heartFullx0.5.png");

        this.corazon0 = Sprite.from("HUD/hud_heartFullx0.png");
                
        
        this.addChild(this.corazonLleno);
  
        
    
    }

    public actualizarMedioCorazón(nroCorazon: number){

        switch (nroCorazon) {
            case 3:
                
                this.removeChild(this.corazonLleno);
                this.addChild(this.corazon2_5);
                this.current = 2.5;
                break;
           case 2:
                
                this.removeChild(this.corazon2);
                this.addChild(this.corazon1_5);
                this.current = 1.5;
                
                break;
            case 1:
                
                this.removeChild(this.corazon1);
                this.addChild(this.corazon0_5);
                this.current = 0.5;
                
                break; 
        
            default:
                break;
        }
        
        

    }

    public actualizarCorazónVacio(nroCorazon: number){
        
        switch (nroCorazon) {
            case 3:
                
                this.removeChild(this.corazon2_5);
                this.addChild(this.corazon2);
                this.current = 2;
                
                break;
            case 2:
                
                this.removeChild(this.corazon1_5);
                this.addChild(this.corazon1);
                this.current = 1;
                
                break;
            case 1:
                
                this.removeChild(this.corazon0_5);
                this.addChild(this.corazon0);
                
                break;
        
            default:
                break;
        }

    }

    public morirse(remove: number){
        
        this.removeChild(this.getCurrentSprite(remove));
        this.addChild(this.corazon0);

    }


    public getCurrent(): number{
        return this.current;
    }

    public getCurrentSprite(nroCorazon: number): Sprite{
        
        switch (nroCorazon) {
            case 3:
                
               return this.corazonLleno;
                
                break;
            case 2.5:
                
                return this.corazon2_5;
                
                break;
            case 2:
                
                return this.corazon2;
                
                break;
            case 1.5:
                
                return this.corazon1_5;
                    
                break;
            case 1:
                
                return this.corazon1;
                    
            break;
                    
            default:
                return this.corazon0;
                break;
        }
    }
}