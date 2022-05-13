import { Container, Sprite } from "pixi.js";

export class Health extends Container{

    //private dialog = new Container();
    
    private corazonLleno: Sprite;
    private corazon1: Sprite;
    private corazon2: Sprite;
    private corazon0: Sprite;
    private corazon1_5: Sprite;
    private corazon2_5: Sprite;
    private corazon0_5: Sprite;

    constructor (){
        super();
                
    
        this.corazonLleno = Sprite.from("HeartFull");
        this.corazonLleno.position.set(0,0);
        
        this.corazon2_5 = Sprite.from("HeartFullx2.5");
        
        this.corazon2 = Sprite.from("HeartFullx2");
        
        this.corazon1_5 = Sprite.from("HeartFullx1.5");

        this.corazon1 = Sprite.from("HeartFullx1");
        
        this.corazon0_5 = Sprite.from("HeartFullx0.5");

        this.corazon0 = Sprite.from("HeartFullx0");
                
        
        this.addChild(this.corazonLleno);

        
        
        /*this.addChild(this.dialog);
        this.corazones.push(corazonLleno4);

        for (let i = 0; i < this.corazones.length; i++) {
            
            this.dialog.addChild(this.corazones[i]);
        }
        */
  
        
    
    }

    public actualizarMedioCorazón(nroCorazon: number){

        switch (nroCorazon) {
            case 3:
                
                this.removeChild(this.corazonLleno);
                this.addChild(this.corazon2_5);
                
                break;
           case 2:
                
                this.removeChild(this.corazon2);
                this.addChild(this.corazon1_5);
                
                break;
            case 1:
                
                this.removeChild(this.corazon1);
                this.addChild(this.corazon0_5);
                
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
                
                break;
            case 2:
                
                this.removeChild(this.corazon1_5);
                this.addChild(this.corazon1);
                
                break;
            case 1:
                
                this.removeChild(this.corazon0_5);
                this.addChild(this.corazon0);
                
                break;
        
            default:
                break;
        }

    }
}