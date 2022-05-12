import { AnimatedSprite, Texture } from "pixi.js";
import { IPlayerAnimation } from "./IPlayerAnimation";
import { PhysicsContainer } from "./PhysicsContainer";


export class PlayerAnimationTimmy extends PhysicsContainer implements IPlayerAnimation{

    public static SPEED:number; 
    public static ANCHORX:number; 
    public static ANCHORY:number;
    public static VISIBLE = true;

    private ninieAnimatedWalk: AnimatedSprite;
    private ninieAnimatedIdle: AnimatedSprite;
    private ninieAnimatedJump: AnimatedSprite;
    private ninieAnimatedRun: AnimatedSprite;
    private ninieAnimatedDead: AnimatedSprite;

    constructor(speed:number, anchorX:number, anchorY:number){

        PlayerAnimationTimmy.SPEED = speed;
        PlayerAnimationTimmy.ANCHORX = anchorX;
        PlayerAnimationTimmy.ANCHORY = anchorY;
        
        super();

        this.ninieAnimatedIdle = new AnimatedSprite(
            [
                Texture.from("NeneIdle1"),
                Texture.from("NeneIdle2"),
                Texture.from("NeneIdle3"),
                Texture.from("NeneIdle4"),
                Texture.from("NeneIdle5"),
                Texture.from("NeneIdle6"),
                Texture.from("NeneIdle7"),
                Texture.from("NeneIdle8"),
                Texture.from("NeneIdle9"),
                Texture.from("NeneIdle10"),
                Texture.from("NeneIdle11"),
                Texture.from("NeneIdle12"),
                Texture.from("NeneIdle13"),
                Texture.from("NeneIdle14"),
                Texture.from("NeneIdle15"),
                
            ], true
        );

        this.ninieAnimatedIdle.play();
        this.ninieAnimatedIdle.animationSpeed = PlayerAnimationTimmy.SPEED;
        this.ninieAnimatedIdle.visible = PlayerAnimationTimmy.VISIBLE;
        this.ninieAnimatedIdle.anchor.set(PlayerAnimationTimmy.ANCHORX,PlayerAnimationTimmy.ANCHORY);


        this.ninieAnimatedWalk = new AnimatedSprite (
            [
                Texture.from("NeneWalk1"),
                Texture.from("NeneWalk2"),
                Texture.from("NeneWalk3"),
                Texture.from("NeneWalk4"),
                Texture.from("NeneWalk5"),
                Texture.from("NeneWalk6"),
                Texture.from("NeneWalk7"),
                Texture.from("NeneWalk8"),
                Texture.from("NeneWalk9"),
                Texture.from("NeneWalk10"),
                Texture.from("NeneWalk11"),
                Texture.from("NeneWalk12"),
                Texture.from("NeneWalk13"),
                Texture.from("NeneWalk14"),
                Texture.from("NeneWalk15"),
                
            ], true
        );

        this.ninieAnimatedWalk.play();
        this.ninieAnimatedWalk.animationSpeed = PlayerAnimationTimmy.SPEED;
        this.ninieAnimatedWalk.visible = false;
        this.ninieAnimatedWalk.anchor.set(PlayerAnimationTimmy.ANCHORX,PlayerAnimationTimmy.ANCHORY);

        this.ninieAnimatedJump = new AnimatedSprite (
            [
                Texture.from("NeneJump1"),
                Texture.from("NeneJump2"),
                Texture.from("NeneJump3"),
                Texture.from("NeneJump4"),
                Texture.from("NeneJump5"),
                Texture.from("NeneJump6"),
                Texture.from("NeneJump7"),
                Texture.from("NeneJump8"),
                Texture.from("NeneJump9"),
                Texture.from("NeneJump10"),
                Texture.from("NeneJump11"),
                Texture.from("NeneJump12"),
                Texture.from("NeneJump13"),
                Texture.from("NeneJump14"),
                Texture.from("NeneJump15"),
                
            ], true
        );

        this.ninieAnimatedJump.play();
        this.ninieAnimatedJump.animationSpeed = PlayerAnimationTimmy.SPEED;
        this.ninieAnimatedJump.visible = false;
        this.ninieAnimatedJump.anchor.set(PlayerAnimationTimmy.ANCHORX,PlayerAnimationTimmy.ANCHORY);

        this.ninieAnimatedRun = new AnimatedSprite (
            [
                Texture.from("NeneRun1"),
                Texture.from("NeneRun2"),
                Texture.from("NeneRun3"),
                Texture.from("NeneRun4"),
                Texture.from("NeneRun5"),
                Texture.from("NeneRun6"),
                Texture.from("NeneRun7"),
                Texture.from("NeneRun8"),
                Texture.from("NeneRun9"),
                Texture.from("NeneRun10"),
                Texture.from("NeneRun11"),
                Texture.from("NeneRun12"),
                Texture.from("NeneRun13"),
                Texture.from("NeneRun14"),
                Texture.from("NeneRun15"),
                
            ], true
        );

        this.ninieAnimatedRun.play();
        this.ninieAnimatedRun.animationSpeed = PlayerAnimationTimmy.SPEED;
        this.ninieAnimatedRun.visible = false;
        this.ninieAnimatedRun.anchor.set(PlayerAnimationTimmy.ANCHORX,PlayerAnimationTimmy.ANCHORY);

        this.ninieAnimatedDead = new AnimatedSprite (
            [
                Texture.from("NeneDead1"),
                Texture.from("NeneDead2"),
                Texture.from("NeneDead3"),
                Texture.from("NeneDead4"),
                Texture.from("NeneDead5"),
                Texture.from("NeneDead6"),
                Texture.from("NeneDead7"),
                Texture.from("NeneDead8"),
                Texture.from("NeneDead9"),
                Texture.from("NeneDead10"),
                Texture.from("NeneDead11"),
                Texture.from("NeneDead12"),
                Texture.from("NeneDead13"),
                Texture.from("NeneDead14"),
                Texture.from("NeneDead15"),
                
            ], true
        );

        this.ninieAnimatedDead.play();
        this.ninieAnimatedDead.animationSpeed = PlayerAnimationTimmy.SPEED;
        this.ninieAnimatedDead.visible = false;
        this.ninieAnimatedDead.anchor.set(PlayerAnimationTimmy.ANCHORX,PlayerAnimationTimmy.ANCHORY);


        
        this.addChild(this.ninieAnimatedIdle, this.ninieAnimatedWalk, this.ninieAnimatedJump, this.ninieAnimatedRun, this.ninieAnimatedDead);    

    }

    public changeToWalkAnimation(){
    
       
        this.ninieAnimatedWalk.visible = true;
        this.ninieAnimatedIdle.visible = false;
        this.ninieAnimatedJump.visible = false;
        this.ninieAnimatedRun.visible = false;
        this.ninieAnimatedDead.visible = false;
       
    }

    public changeToJumpAnimation(){
        
        this.ninieAnimatedWalk.visible = false;
        this.ninieAnimatedIdle.visible = false;
        this.ninieAnimatedJump.visible = true;
        this.ninieAnimatedRun.visible = false;
        this.ninieAnimatedDead.visible = false;
                    
    }

    public changeToIdleAnimation(){

        this.ninieAnimatedWalk.visible = false;
        this.ninieAnimatedIdle.visible = true;
        this.ninieAnimatedJump.visible = false;
        this.ninieAnimatedRun.visible = false;
        this.ninieAnimatedDead.visible = false;
                    
    }

    public changeToRunAnimation(){

        this.ninieAnimatedWalk.visible = false;
        this.ninieAnimatedIdle.visible = false;
        this.ninieAnimatedJump.visible = false;
        this.ninieAnimatedRun.visible = true;
        this.ninieAnimatedDead.visible = false;
                    
    }

    public changeToDeadAnimation(){

        this.ninieAnimatedWalk.visible = false;
        this.ninieAnimatedIdle.visible = false;
        this.ninieAnimatedJump.visible = false;
        this.ninieAnimatedRun.visible = false;
        this.ninieAnimatedDead.visible = true;

    }

}