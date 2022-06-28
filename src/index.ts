import { WebfontLoaderPlugin } from 'pixi-webfont-loader';
import { BitmapFont, Loader, TextStyle } from 'pixi.js'
import { assets } from './assets';
import { ScenePlayerSelect } from './scenes/ScenePlayerSelect';
import { SceneManager } from './utils/SceneManager';



Loader.registerPlugin(WebfontLoaderPlugin);
Loader.shared.add(assets);

Loader.shared.onComplete.add(()=>{

	const textStyle = new TextStyle({
		fill: "white",
        fontFamily: "CompleteinHim",
        fontSize: 50,
        lineJoin: "round",
        strokeThickness: 4
	})
	BitmapFont.from("Mi BitmapFont", textStyle,{chars:BitmapFont.ASCII});

	const myScene =new ScenePlayerSelect();

	SceneManager.initialize();
	SceneManager.changeScene(myScene);

	/*app.stage.addChild(currentScene);
	Ticker.shared.add(function(deltaFrame) {
		if (currentScene.update){
			currentScene.update(Ticker.shared.deltaMS,deltaFrame);
			
		};
	});*/

})


Loader.shared.load();


