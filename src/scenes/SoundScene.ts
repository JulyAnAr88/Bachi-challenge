import { sound } from "@pixi/sound";
import { Container, Texture } from "pixi.js";
import { ToggleButton } from "../ui/ToggleButton";
import { IUpdateable } from "../utils/IUpdateable";
import { SceneBase } from "../utils/SceneBase";

export class SoundScene extends SceneBase implements IUpdateable {

    constructor()
    {
        super();

        sound.play("Chamarrito");
        const allCont = new Container();
        this.addChild(allCont);
        allCont.scale.set(3);

        const toggleMute = new ToggleButton(Texture.from("MusicOn"), Texture.from("MusicOff"));
        toggleMute.position.set(500,200);
        toggleMute.on(ToggleButton.TOGGLE_EVENT, this.toggleMute, this);
        allCont.addChild(toggleMute);



    }
    update(_deltaTime: number, _deltaFrame?: number): void {
       
    }

    public toggleMute(unMute:boolean) {
        if (unMute) 
        {
            sound.unmuteAll();
        }else
        {
            sound.muteAll();
        }
    }
    
}