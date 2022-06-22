import { WebfontLoaderPlugin } from 'pixi-webfont-loader';
import { Application, BitmapFont, Loader, TextStyle, Ticker } from 'pixi.js'
import { Group } from 'tweedle.js';
import { assets } from './assets';

/*import { StartMenu } from './scenes/StartMenu';
import { SoundScene } from './scenes/SoundScene';
import { TickerScene } from './scenes/TickerScene';*/
import { ScenePlayerSelect } from './scenes/ScenePlayerSelect';
import { Keyboard } from './utils/Keyboard';

export const WIDTH = 1920;
export const HEIGHT = 1080;

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: WIDTH,
	height: HEIGHT
});

Keyboard.initialize();

window.addEventListener("resize", ()=>{
	const scaleX = window.innerWidth / app.screen.width;
	const scaleY = window.innerHeight / app.screen.height;
	const scale = Math.min(scaleX, scaleY);

	const gameWidth = Math.round(app.screen.width * scale);
	const gameHeight = Math.round(app.screen.height * scale);

	const marginHorizontal = Math.floor((window.innerWidth - gameWidth) / 2);
	const marginVertical = Math.floor((window.innerHeight - gameHeight) / 2);

	app.view.style.width = gameWidth + "px";
	app.view.style.height = gameHeight + "px";

	app.view.style.marginLeft = marginHorizontal + "px";
	app.view.style.marginRight = marginHorizontal + "px";

	app.view.style.marginTop = marginVertical + "px";
	app.view.style.marginBottom = marginVertical + "px";
});
window.dispatchEvent(new Event("resize"));

Loader.registerPlugin(WebfontLoaderPlugin);
Loader.shared.add(assets);

let currentScene:any = undefined;

Loader.shared.onComplete.add(()=>{

	const textStyle = new TextStyle({
		fill: "white",
        fontFamily: "CompleteinHim",
        fontSize: 50,
        lineJoin: "round",
        strokeThickness: 4
	})
	BitmapFont.from("Mi BitmapFont", textStyle,{chars:BitmapFont.ASCII});

	currentScene = new ScenePlayerSelect();
	app.stage.addChild(currentScene);
	Ticker.shared.add(function(deltaFrame) {
		if (currentScene.update){
			currentScene.update(Ticker.shared.deltaMS,deltaFrame);
			Group.shared.update();
		};
	});

})

export function ChangeScene(newScene:any){
	currentScene.destroy();
	app.stage.addChild(newScene);
	currentScene=newScene;
}

Loader.shared.load();


