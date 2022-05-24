import { Container, NineSlicePlane, TextStyle, Texture, Text } from "pixi.js";
import { HEIGHT, WIDTH } from "..";

export class FinalMetaDialog extends Container{
    constructor(){
        super();

        const messageDialog = new NineSlicePlane(
            Texture.from("FondoPlayer"),
            35,35,35,35
        );
        messageDialog.width = WIDTH * 1/2;
        messageDialog.height = HEIGHT * 1/3;
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
            fontSize: 135,
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