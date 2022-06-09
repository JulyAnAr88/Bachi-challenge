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
                Texture.from("nena/Idle (1).png"),
                Texture.from("nena/Idle (2).png"),
                Texture.from("nena/Idle (3).png"),
                Texture.from("nena/Idle (4).png"),
                Texture.from("nena/Idle (6).png"),
                Texture.from("nena/Idle (7).png"),
                Texture.from("nena/Idle (8).png"),
                Texture.from("nena/Idle (9).png"),
                Texture.from("nena/Idle (10).png"),
                Texture.from("nena/Idle (11).png"),
                Texture.from("nena/Idle (12).png"),
                Texture.from("nena/Idle (13).png"),
                Texture.from("nena/Idle (14).png"),
                Texture.from("nena/Idle (15).png"),
                
            ], true
        );

        this.ninieAnimatedIdle.play();        
        this.ninieAnimatedIdle.animationSpeed = PlayerAnimationBecky.SPEED;
        this.ninieAnimatedIdle.visible = PlayerAnimationBecky.VISIBLE;
        this.ninieAnimatedIdle.anchor.set(PlayerAnimationBecky.ANCHORX,PlayerAnimationBecky.ANCHORY);


        this.ninieAnimatedWalk = new AnimatedSprite (
            [
                Texture.from("nena/Walk (1).png"),
                Texture.from("nena/Walk (2).png"),
                Texture.from("nena/Walk (3).png"),
                Texture.from("nena/Walk (4).png"),
                Texture.from("nena/Walk (6).png"),
                Texture.from("nena/Walk (7).png"),
                Texture.from("nena/Walk (8).png"),
                Texture.from("nena/Walk (9).png"),
                Texture.from("nena/Walk (10).png"),
                Texture.from("nena/Walk (11).png"),
                Texture.from("nena/Walk (12).png"),
                Texture.from("nena/Walk (13).png"),
                Texture.from("nena/Walk (14).png"),
                Texture.from("nena/Walk (15).png"),
                
            ], true
        );

        this.ninieAnimatedWalk.play();
        this.ninieAnimatedWalk.animationSpeed = PlayerAnimationBecky.SPEED;
        this.ninieAnimatedWalk.visible = false;
        this.ninieAnimatedWalk.anchor.set(PlayerAnimationBecky.ANCHORX,PlayerAnimationBecky.ANCHORY);

        this.ninieAnimatedJump = new AnimatedSprite (
            [
                Texture.from("nena/Jump (1).png"),
                Texture.from("nena/Jump (2).png"),
                Texture.from("nena/Jump (3).png"),
                Texture.from("nena/Jump (4).png"),
                Texture.from("nena/Jump (6).png"),
                Texture.from("nena/Jump (7).png"),
                Texture.from("nena/Jump (8).png"),
                Texture.from("nena/Jump (9).png"),
                Texture.from("nena/Jump (10).png"),
                Texture.from("nena/Jump (11).png"),
                Texture.from("nena/Jump (12).png"),
                Texture.from("nena/Jump (13).png"),
                Texture.from("nena/Jump (14).png"),
                Texture.from("nena/Jump (15).png"),
                
            ], true
        );

        this.ninieAnimatedJump.play();
        this.ninieAnimatedJump.animationSpeed = PlayerAnimationBecky.SPEED;
        this.ninieAnimatedJump.visible = false;
        this.ninieAnimatedJump.anchor.set(PlayerAnimationBecky.ANCHORX,PlayerAnimationBecky.ANCHORY);

        this.ninieAnimatedRun = new AnimatedSprite (
            [
                Texture.from("nena/Run (1).png"),
                Texture.from("nena/Run (2).png"),
                Texture.from("nena/Run (3).png"),
                Texture.from("nena/Run (4).png"),
                Texture.from("nena/Run (6).png"),
                Texture.from("nena/Run (7).png"),
                Texture.from("nena/Run (8).png"),
                Texture.from("nena/Run (9).png"),
                Texture.from("nena/Run (10).png"),
                Texture.from("nena/Run (11).png"),
                Texture.from("nena/Run (12).png"),
                Texture.from("nena/Run (13).png"),
                Texture.from("nena/Run (14).png"),
                Texture.from("nena/Run (15).png"),
                
            ], true
        );

        this.ninieAnimatedRun.play();
        this.ninieAnimatedRun.animationSpeed = PlayerAnimationBecky.SPEED;
        this.ninieAnimatedRun.visible = false;
        this.ninieAnimatedRun.anchor.set(PlayerAnimationBecky.ANCHORX,PlayerAnimationBecky.ANCHORY);

        this.ninieAnimatedDead = new AnimatedSprite (
            [
                Texture.from("nena/Dead (1).png"),
                Texture.from("nena/Dead (2).png"),
                Texture.from("nena/Dead (3).png"),
                Texture.from("nena/Dead (4).png"),
                Texture.from("nena/Dead (6).png"),
                Texture.from("nena/Dead (7).png"),
                Texture.from("nena/Dead (8).png"),
                Texture.from("nena/Dead (9).png"),
                Texture.from("nena/Dead (10).png"),
                Texture.from("nena/Dead (11).png"),
                Texture.from("nena/Dead (12).png"),
                Texture.from("nena/Dead (13).png"),
                Texture.from("nena/Dead (14).png"),
                Texture.from("nena/Dead (15).png"),
                
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
        this.ninieAnimatedJump.update(PlayerAnimationBecky.SPEED);
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