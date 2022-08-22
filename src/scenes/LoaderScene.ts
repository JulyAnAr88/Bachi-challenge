import { WebfontLoaderPlugin } from "pixi-webfont-loader";
import { BitmapFont, Graphics, Loader, TextStyle } from "pixi.js";
import { assets } from "../assets";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { StartMenu } from "./StartMenu";

export class LoaderScene extends SceneBase{
    public update(): void {}

    public bar: Graphics;

    constructor(){
        super();

        this.bar = new Graphics();
        this.setBarPercent(0);
        this.bar.x = SceneManager.WIDTH * 0.5;
        this.bar.y = SceneManager.HEIGHT * 0.5;

        this.bar.pivot.x = this.bar.width / 2;
        this.bar.pivot.y = this.bar.height / 2;

        this.addChild(this.bar);

        this.downloadAsset();
        
    }

    private setBarPercent(percent:number){
        const factor = percent / 100;
        this.bar.clear();
        this.bar.beginFill(0xFF0000, 1);
        this.bar.drawRect(0,0,SceneManager.WIDTH * 0.8 * factor, SceneManager.HEIGHT * 0.1);
        this.bar.endFill();

        this.bar.lineStyle(5, 0xFFFFFF, 1);
        this.bar.beginFill(0x000000, 0);
        this.bar.drawRect(0,0,SceneManager.WIDTH * 0.8, SceneManager.HEIGHT * 0.1);
        this.bar.endFill();

    }

    private downloadAsset(){
        Loader.registerPlugin(WebfontLoaderPlugin);
        Loader.shared.add(assets);
        Loader.shared.onProgress.add((Loader)=>this.setBarPercent(Loader.progress));
        Loader.shared.onComplete.once(this.whenLoadFinished.bind(this))


        Loader.shared.load();
    }

    private whenLoadFinished(){
    
        const textStyle = new TextStyle({
            fill: "white",
            fontFamily: "CompleteinHim",
            fontSize: 50,
            lineJoin: "round",
            strokeThickness: 4
        })
        BitmapFont.from("Mi BitmapFont", textStyle,{chars:BitmapFont.ASCII});
    
            
        SceneManager.changeScene(new StartMenu());
    }
    
}