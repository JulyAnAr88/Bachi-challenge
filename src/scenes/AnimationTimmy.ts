import { Texture } from "pixi.js";
import { PhysicsContainer } from "../game/PhysicsContainer";
import { StateAnimation } from "../game/StateAnimation";


export class AnimationTimmy extends PhysicsContainer {


    private timmy:StateAnimation;
    private state: string;

    constructor(speed:number, state: string) {
        super();

        this.state = state;

        this.timmy = new StateAnimation();
        this.addChild(this.timmy)

        this.timmy.addState("run", [
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
        ], speed, true);

        this.timmy.addState("jump",
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
        ],speed)

        this.timmy.addState("idle",
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
        ],speed)

        this.timmy.playState(this.state, true);
    }

    public override update(frame:number)
    {
        this.timmy.update(frame);
    }

    public setState(state: string){
        this.state = state;
        this.timmy.playState(this.state, true);
    }
}