import { AnimatedSprite, Texture } from "pixi.js";
import { IPlayerAnimation } from "./IPlayerAnimation";
import { PhysicsContainer } from "./PhysicsContainer";


export class PlayerAnimationBecky extends PhysicsContainer implements IPlayerAnimation{

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

        PlayerAnimationBecky.SPEED = speed;
        PlayerAnimationBecky.ANCHORX = anchorX;
        PlayerAnimationBecky.ANCHORY = anchorY;
        
        super();

        this.ninieAnimatedIdle = new AnimatedSprite(
            [
                Texture.from("NenaIdle1"),
                Texture.from("NenaIdle2"),
                Texture.from("NenaIdle3"),
                Texture.from("NenaIdle4"),
                Texture.from("NenaIdle5"),
                Texture.from("NenaIdle6"),
                Texture.from("NenaIdle7"),
                Texture.from("NenaIdle8"),
                Texture.from("NenaIdle9"),
                Texture.from("NenaIdle10"),
                Texture.from("NenaIdle11"),
                Texture.from("NenaIdle12"),
                Texture.from("NenaIdle13"),
                Texture.from("NenaIdle14"),
                Texture.from("NenaIdle15"),
                
            ], true
        );

        this.ninieAnimatedIdle.play();
        this.ninieAnimatedIdle.loop = true;
        this.ninieAnimatedIdle.animationSpeed = PlayerAnimationBecky.SPEED;
        this.ninieAnimatedIdle.visible = PlayerAnimationBecky.VISIBLE;
        this.ninieAnimatedIdle.anchor.set(PlayerAnimationBecky.ANCHORX,PlayerAnimationBecky.ANCHORY);


        this.ninieAnimatedWalk = new AnimatedSprite (
            [
                Texture.from("NenaWalk1"),
                Texture.from("NenaWalk2"),
                Texture.from("NenaWalk3"),
                Texture.from("NenaWalk4"),
                Texture.from("NenaWalk5"),
                Texture.from("NenaWalk6"),
                Texture.from("NenaWalk7"),
                Texture.from("NenaWalk8"),
                Texture.from("NenaWalk9"),
                Texture.from("NenaWalk10"),
                Texture.from("NenaWalk11"),
                Texture.from("NenaWalk12"),
                Texture.from("NenaWalk13"),
                Texture.from("NenaWalk14"),
                Texture.from("NenaWalk15"),
                
            ], false
        );

        this.ninieAnimatedWalk.play();
        this.ninieAnimatedWalk.loop = false;
        this.ninieAnimatedWalk.animationSpeed = PlayerAnimationBecky.SPEED;
        this.ninieAnimatedWalk.visible = false;
        this.ninieAnimatedWalk.anchor.set(PlayerAnimationBecky.ANCHORX,PlayerAnimationBecky.ANCHORY);

        this.ninieAnimatedJump = new AnimatedSprite (
            [
                Texture.from("NenaJump1"),
                Texture.from("NenaJump2"),
                Texture.from("NenaJump3"),
                Texture.from("NenaJump4"),
                Texture.from("NenaJump5"),
                Texture.from("NenaJump6"),
                Texture.from("NenaJump7"),
                Texture.from("NenaJump8"),
                Texture.from("NenaJump9"),
                Texture.from("NenaJump10"),
                Texture.from("NenaJump11"),
                Texture.from("NenaJump12"),
                Texture.from("NenaJump13"),
                Texture.from("NenaJump14"),
                Texture.from("NenaJump15"),
                
            ], false
        );

        this.ninieAnimatedJump.play();
        this.ninieAnimatedJump.loop = false;
        this.ninieAnimatedJump.animationSpeed = PlayerAnimationBecky.SPEED;
        this.ninieAnimatedJump.visible = false;
        this.ninieAnimatedJump.anchor.set(PlayerAnimationBecky.ANCHORX,PlayerAnimationBecky.ANCHORY);

        this.ninieAnimatedRun = new AnimatedSprite (
            [
                Texture.from("NenaRun1"),
                Texture.from("NenaRun2"),
                Texture.from("NenaRun3"),
                Texture.from("NenaRun4"),
                Texture.from("NenaRun5"),
                Texture.from("NenaRun6"),
                Texture.from("NenaRun7"),
                Texture.from("NenaRun8"),
                Texture.from("NenaRun9"),
                Texture.from("NenaRun10"),
                Texture.from("NenaRun11"),
                Texture.from("NenaRun12"),
                Texture.from("NenaRun13"),
                Texture.from("NenaRun14"),
                Texture.from("NenaRun15"),
                
            ], false
        );

        this.ninieAnimatedRun.play();
        this.ninieAnimatedRun.loop = false;
        this.ninieAnimatedRun.animationSpeed = PlayerAnimationBecky.SPEED;
        this.ninieAnimatedRun.visible = false;
        this.ninieAnimatedRun.anchor.set(PlayerAnimationBecky.ANCHORX,PlayerAnimationBecky.ANCHORY);

        this.ninieAnimatedDead = new AnimatedSprite (
            [
                Texture.from("NenaDead1"),
                Texture.from("NenaDead2"),
                Texture.from("NenaDead3"),
                Texture.from("NenaDead4"),
                Texture.from("NenaDead5"),
                Texture.from("NenaDead6"),
                Texture.from("NenaDead7"),
                Texture.from("NenaDead8"),
                Texture.from("NenaDead9"),
                Texture.from("NenaDead10"),
                Texture.from("NenaDead11"),
                Texture.from("NenaDead12"),
                Texture.from("NenaDead13"),
                Texture.from("NenaDead14"),
                Texture.from("NenaDead15"),
                
            ], true
        );

        this.ninieAnimatedDead.play();
        this.ninieAnimatedDead.loop = false;
        this.ninieAnimatedDead.animationSpeed = PlayerAnimationBecky.SPEED * 1/6;
        this.ninieAnimatedDead.visible = false;
        this.ninieAnimatedDead.anchor.set(PlayerAnimationBecky.ANCHORX,PlayerAnimationBecky.ANCHORY);


        
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
        this.ninieAnimatedDead.gotoAndPlay(0);

    }

}