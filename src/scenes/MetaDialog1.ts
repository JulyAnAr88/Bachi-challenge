import { Container, NineSlicePlane, TextStyle, Texture, Text } from "pixi.js";
import { HEIGHT, WIDTH } from "..";

export class MetaDialog1 extends Container{
    constructor(){
        super();

        const messageDialog = new NineSlicePlane(
            Texture.from("FondoPlayer"),
            35,35,35,35
        );
        messageDialog.width = WIDTH * 1/4;
        messageDialog.height = HEIGHT * 1/7;
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
            fontSize: 35,
            lineJoin: "round",
            wordWrap: true,
            wordWrapWidth: 450
        })
        const message = new Text('¡Bien hecho!\nEstás a medio camino\n¡Sigue así!', textStyle);
        message.position.set(messageDialog.width * 1/22, messageDialog.height * 1/13);
        messageDialog.addChild(message);

        this.addChild(messageDialog);

    }

}