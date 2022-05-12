import { Graphics, ObservablePoint, Rectangle } from "pixi.js";
import { ScenePlayerSelect } from "../scenes/ScenePlayerSelect";
import { TickerScene } from "../scenes/TickerScene";
import { Keyboard } from "../utils/Keyboard";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";
import { PlayerAnimationBecky } from "./PlayerAnimationBecky";
import { PlayerAnimationTimmy } from "./PlayerAnimationTimmy";


export class Player extends PhysicsContainer implements IHitbox{

    private static readonly GRAVITY = 450;
    private static readonly MOVE_SPEED = 350;
    private static readonly JUMP_SPEED = 450;

    public canJump = true;
    private ninieAnimated: any;
    //private ninieAnimatedIWalk: AnimatedSprite;
    //private ninieAnimatedJump: AnimatedSprite;
    private hitbox:Graphics;

    private isDead = false;
    private maxHealth;
    private currentHealth;

    private timePassedWalk=0;

    //private isWalking = false;
    


    constructor(){
        super();

        switch (ScenePlayerSelect.PLAY_SELECT) {
            case 1:
                
                this.ninieAnimated = new PlayerAnimationTimmy(0.4, 0.25, 0);
                
                break;
            case 0:
                
                this.ninieAnimated = new PlayerAnimationBecky(0.4, 0.25, 0);
                
                break;
        
            default:
                break;
        }
        

        this.maxHealth = 100;
        this.currentHealth = this.maxHealth;

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0.3);
        this.hitbox.drawRect(-120,0,250,500);
        this.hitbox.endFill();
        this.hitbox.visible = false;
        this.hitbox.x = 0;
        this.hitbox.y = 0;
                              
        this.addChild(this.ninieAnimated);
        
        this.ninieAnimated.addChild(this.hitbox);
      

        this.acceleration.y = Player.GRAVITY;
        
        Keyboard.down.on("ArrowUp", this.jump, this);
        Keyboard.down.on("KeyW", this.jump, this);
       
    }

    public override destroy(options:any) {
        super.destroy(options);
        Keyboard.down.off("ArrowUp",this.jump);
        Keyboard.down.off("KeyW",this.jump);
    }


    public override update(deltaMS:number)
    {
        if(this.isDead){

            this.ninieAnimated.changeToDeadAnimation();            
            return;
        }

        super.update(deltaMS/1000);
        
        this.ninieAnimated.update(deltaMS / 1000/60);

        this.timePassedWalk += deltaMS/100;

        if (Keyboard.state.get("ArrowRight") || Keyboard.state.get("KeyD")){

            TickerScene.ARRANCAR = true;
            
            if (this.canJump)
            {
                //console.log("timeapretandowalk pa delante: " + this.timePassedWalk);
                this.speed.x = Player.MOVE_SPEED;
                this.ninieAnimated.scale.x = 1;
                this.ninieAnimated.changeToWalkAnimation();

                if(this.timePassedWalk > 10){
                    //console.log("ruuuun bitch");
                    this.speed.x = Player.MOVE_SPEED * 1.2;
                    this.ninieAnimated.changeToRunAnimation();
                    this.timePassedWalk =0;
                } 

            }
        }else if (Keyboard.state.get("ArrowLeft") || Keyboard.state.get("KeyA")){

            if (this.canJump)
            {
                //console.log("timeapretandowalk pa tras: " + this.timePassedWalk);
                this.speed.x = -Player.MOVE_SPEED;
                this.ninieAnimated.scale.x = -1;
                this.ninieAnimated.changeToWalkAnimation();

                if(this.timePassedWalk > 10){
                    //console.log("ruuuun bitch");

                    this.speed.x = -Player.MOVE_SPEED;
                    this.ninieAnimated.changeToRunAnimation();
                    this.timePassedWalk =0;
                } 

            }
        }else{
                this.speed.x = 0;
        }
    }     
    
 
    private jump()
    {
        if (this.canJump)
        {
            this.canJump = false;
            this.ninieAnimated.changeToJumpAnimation();
            this.speed.y = -Player.JUMP_SPEED;
        }
    }

    public getHitbox():Rectangle
    {
        return this.hitbox.getBounds()
    }

    public separate(overlap: Rectangle, platform: ObservablePoint<any>) {
        if (overlap.width < overlap.height)
                {
                    if (this.x > platform.x)
                    {
                        this.x += overlap.width;
                    }else if (this.x < platform.x)
                    {
                        this.x -= overlap.width;
                    }

                }
                else
                {                                   
                    if (this.y > platform.y)
                    {
                        this.y += overlap.height;
                        this.speed.y = 0;
                        
                    }else if (this.y < platform.y)
                    {
                        this.y -= overlap.height;
                        this.speed.y = 0;
                        this.canJump = true;
                    }
                }
    }

    public takeDamage(damage : number) : void{
        this.currentHealth -= damage;
        if(this.currentHealth <= 0){
            this.isDead = true;
        } 
    }

    public getCurrentHealth():number{
        return this.currentHealth;
    }

}