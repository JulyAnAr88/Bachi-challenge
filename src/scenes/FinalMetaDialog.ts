import { Container, NineSlicePlane, TextStyle, Texture, Text } from "pixi.js";
import { SceneManager } from "../utils/SceneManager";

export class FinalMetaDialog extends Container{
    constructor(){
        super();

        const messageDialog = new NineSlicePlane(
            Texture.from("HUD/fondoPlayer.png"),
            35,35,35,35
        );
        messageDialog.width = SceneManager.WIDTH * 1/2;
        messageDialog.height = SceneManager.HEIGHT * 1/3;
        //namePlayer.scale.set(0.5);

        const textStyle = new TextStyle({
            align: "center",
            dropShadow: true,
            dropShadowAlpha: 0.8,
            dropShadowAngle: -3.5,
            dropShadowBlur: 3,
            dropShadowDistance: 2,
            fill: "red",
            fontFamily: "BowlCap",
            fontSize: 130,
            lineJoin: "round",
            lineHeight: 75,
            wordWrap: true,
            wordWrapWidth: 450
        })
        const message = new Text('¡Excelente!\n¡Llegaste!', textStyle);
        message.position.set(messageDialog.width * 1/22, messageDialog.height * 1/13);
        messageDialog.addChild(message);

        this.addChild(messageDialog);

    }

}