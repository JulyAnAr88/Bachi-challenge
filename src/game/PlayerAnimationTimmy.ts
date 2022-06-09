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
                Texture.from("nene/Idle (1).png"),
                Texture.from("nene/Idle (2).png"),
                Texture.from("nene/Idle (3).png"),
                Texture.from("nene/Idle (4).png"),
                Texture.from("nene/Idle (6).png"),
                Texture.from("nene/Idle (7).png"),
                Texture.from("nene/Idle (8).png"),
                Texture.from("nene/Idle (9).png"),
                Texture.from("nene/Idle (10).png"),
                Texture.from("nene/Idle (11).png"),
                Texture.from("nene/Idle (12).png"),
                Texture.from("nene/Idle (13).png"),
                Texture.from("nene/Idle (14).png"),
                Texture.from("nene/Idle (15).png"),

                
            ], true
        );

        this.ninieAnimatedIdle.play();        
        this.ninieAnimatedIdle.animationSpeed = PlayerAnimationTimmy.SPEED;
        this.ninieAnimatedIdle.visible = PlayerAnimationTimmy.VISIBLE;
        this.ninieAnimatedIdle.anchor.set(PlayerAnimationTimmy.ANCHORX,PlayerAnimationTimmy.ANCHORY);


        this.ninieAnimatedWalk = new AnimatedSprite (
            [
                Texture.from("nene/Walk (1).png"),
                Texture.from("nene/Walk (2).png"),
                Texture.from("nene/Walk (3).png"),
                Texture.from("nene/Walk (4).png"),
                Texture.from("nene/Walk (6).png"),
                Texture.from("nene/Walk (7).png"),
                Texture.from("nene/Walk (8).png"),
                Texture.from("nene/Walk (9).png"),
                Texture.from("nene/Walk (10).png"),
                Texture.from("nene/Walk (11).png"),
                Texture.from("nene/Walk (12).png"),
                Texture.from("nene/Walk (13).png"),
                Texture.from("nene/Walk (14).png"),
                Texture.from("nene/Walk (15).png"),
                
            ], true
        );

        this.ninieAnimatedWalk.play();
        this.ninieAnimatedWalk.animationSpeed = PlayerAnimationTimmy.SPEED;
        this.ninieAnimatedWalk.visible = false;
        this.ninieAnimatedWalk.anchor.set(PlayerAnimationTimmy.ANCHORX,PlayerAnimationTimmy.ANCHORY);

        this.ninieAnimatedJump = new AnimatedSprite (
            [
                Texture.from("nene/Jump (1).png"),
                Texture.from("nene/Jump (2).png"),
                Texture.from("nene/Jump (3).png"),
                Texture.from("nene/Jump (4).png"),
                Texture.from("nene/Jump (6).png"),
                Texture.from("nene/Jump (7).png"),
                Texture.from("nene/Jump (8).png"),
                Texture.from("nene/Jump (9).png"),
                Texture.from("nene/Jump (10).png"),
                Texture.from("nene/Jump (11).png"),
                Texture.from("nene/Jump (12).png"),
                Texture.from("nene/Jump (13).png"),
                Texture.from("nene/Jump (14).png"),
                Texture.from("nene/Jump (15).png"),
                
            ], true
        );

        this.ninieAnimatedJump.play();
        this.ninieAnimatedJump.animationSpeed = PlayerAnimationTimmy.SPEED;
        this.ninieAnimatedJump.visible = false;
        this.ninieAnimatedJump.anchor.set(PlayerAnimationTimmy.ANCHORX,PlayerAnimationTimmy.ANCHORY);

        this.ninieAnimatedRun = new AnimatedSprite (
            [
                Texture.from("nene/Run (1).png"),
                Texture.from("nene/Run (2).png"),
                Texture.from("nene/Run (3).png"),
                Texture.from("nene/Run (4).png"),
                Texture.from("nene/Run (6).png"),
                Texture.from("nene/Run (7).png"),
                Texture.from("nene/Run (8).png"),
                Texture.from("nene/Run (9).png"),
                Texture.from("nene/Run (10).png"),
                Texture.from("nene/Run (11).png"),
                Texture.from("nene/Run (12).png"),
                Texture.from("nene/Run (13).png"),
                Texture.from("nene/Run (14).png"),
                Texture.from("nene/Run (15).png"),
                
            ], true
        );

        this.ninieAnimatedRun.play();
        this.ninieAnimatedRun.animationSpeed = PlayerAnimationTimmy.SPEED;
        this.ninieAnimatedRun.visible = false;
        this.ninieAnimatedRun.anchor.set(PlayerAnimationTimmy.ANCHORX,PlayerAnimationTimmy.ANCHORY);

        this.ninieAnimatedDead = new AnimatedSprite (
            [
                Texture.from("nene/Dead (1).png"),
                Texture.from("nene/Dead (2).png"),
                Texture.from("nene/Dead (3).png"),
                Texture.from("nene/Dead (4).png"),
                Texture.from("nene/Dead (6).png"),
                Texture.from("nene/Dead (7).png"),
                Texture.from("nene/Dead (8).png"),
                Texture.from("nene/Dead (9).png"),
                Texture.from("nene/Dead (10).png"),
                Texture.from("nene/Dead (11).png"),
                Texture.from("nene/Dead (12).png"),
                Texture.from("nene/Dead (13).png"),
                Texture.from("nene/Dead (14).png"),
                Texture.from("nene/Dead (15).png"),
                                
            ], true
        );

        this.ninieAnimatedDead.play();
        this.ninieAnimatedDead.loop = false;
        this.ninieAnimatedDead.animationSpeed = PlayerAnimationTimmy.SPEED* 1/6;
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
        this.ninieAnimatedJump.update(PlayerAnimationTimmy.SPEED);
                    
    }

    public changeToIdleAnimation(dS: number){

        this.ninieAnimatedWalk.visible = false;
        this.ninieAnimatedIdle.visible = true;
        this.ninieAnimatedJump.visible = false;
        this.ninieAnimatedRun.visible = false;
        this.ninieAnimatedDead.visible = false;
        this.ninieAnimatedIdle.update((dS * 60));
                    
    }

    public changeToRunAnimation(dS: number){

        this.ninieAnimatedWalk.visible = false;
        this.ninieAnimatedIdle.visible = false;
        this.ninieAnimatedJump.visible = false;
        this.ninieAnimatedRun.visible = true;
        this.ninieAnimatedDead.visible = false;
        this.ninieAnimatedRun.update((dS * 60));
                    
    }

    public changeToDeadAnimation(){

        this.ninieAnimatedWalk.visible = false;
        this.ninieAnimatedIdle.visible = false;
        this.ninieAnimatedJump.visible = false;
        this.ninieAnimatedRun.visible = false;
        this.ninieAnimatedDead.visible = true;        
    }

}