import { AnimatedSprite, Container, Texture } from "pixi.js";

export class StateAnimation extends Container
{
    private states:Map<string,AnimatedSprite> = new Map();
    private animContainer:Container = new Container();

    constructor()
    {
        super();
        this.addChild(this.animContainer);
    }
    public playState(stateName: string, restarAnim:boolean) {
        this.animContainer.removeChildren();
        const currentState = this.states.get(stateName)
        if (currentState)
        {
            this.animContainer.addChild(currentState);
            if (restarAnim)
            {
                currentState.gotoAndPlay(0);
            }
        }
    }

    public addState(stateName: string, frames: Texture[] | string[], animationSpeed:number = 0.12, loop:boolean = true) {
        const textArray:Texture[] = [];
        for (const text of frames) {
            if (typeof text == "string")
            {
                textArray.push(Texture.from(text));
            }
            else
            {
                textArray.push(text);
            }
        }
        
        const tempAnim:AnimatedSprite = new AnimatedSprite(textArray);
        tempAnim.animationSpeed = animationSpeed;
        tempAnim.loop = loop;
        tempAnim.play();
        this.states.set(stateName, tempAnim);
    }
    
    public update(frames:number)
    {
        for (const state of this.states.values()) {
            state.update(frames);
        }
    }
}