import { Texture } from "pixi.js";
import { PhysicsContainer } from "../game/PhysicsContainer";
import { StateAnimation } from "../game/StateAnimation";


export class AnimationTimmy extends PhysicsContainer {


    private player:StateAnimation;
    private state: string;
    private speedAnim: number;
    private loop= true;

    constructor(speed:number, state: string) {
        super();

        this.state = state;
        this.speedAnim = speed;

        this.player = new StateAnimation();
        //this.player.pivot.set(3,1);
        this.addChild(this.player)

        this.player.addState("run", [
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
        ], this.speedAnim, true);

        this.player.addState("walk", [
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
        ], this.speedAnim, true);

        this.player.addState("jump",
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
        ], this.speedAnim, true)

        this.player.addState("idle",
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
        ], this.speedAnim, true)

        this.player.addState("dead",
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