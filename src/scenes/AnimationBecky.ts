import { Texture } from "pixi.js";
import { PhysicsContainer } from "../game/PhysicsContainer";
import { StateAnimation } from "../game/StateAnimation";


export class AnimationBecky extends PhysicsContainer {


    private player:StateAnimation;
    private state: string;
    private speedAnim: number;
    private loop= true;

    constructor(speed:number, state: string) {
        super();

        this.state = state;
        this.speedAnim = speed;

        this.player = new StateAnimation();
        this.player.position.set(-95,15);
        this.player.pivot.set(2);
        this.addChild(this.player)

        this.player.addState("run", [
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
        ], this.speedAnim, true);

        this.player.addState("walk", [
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
        ], this.speedAnim, true);

        this.player.addState("jump",
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
        ], this.speedAnim, true)

        this.player.addState("idle",
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
        ], this.speedAnim, true)

        this.player.addState("dead",
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
        ], this.speedAnim, false)

        this.player.playState(this.state, this.loop);
    }

    public override update(frame:number)
    {
        this.player.update(frame);
    }

    public setState(state: string, speed:number, loop: boolean ){
        this.state = state;
        this.speedAnim = speed;
        this.loop = loop;
        this.player.playState(this.state, this.loop);
    }
}