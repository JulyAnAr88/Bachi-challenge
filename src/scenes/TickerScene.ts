import { Container, Texture, TilingSprite } from "pixi.js";
import { Player } from "../game/Player";
import { HEIGHT, WIDTH } from "..";
import { IUpdateable } from "../utils/IUpdateable";
import { Platform } from "../game/Platform";
import { checkCollision } from "../game/IHitbox";
import { MosquitoEnemy } from "../game/MosquitoEnemy";
import { HUD } from "./HUD";
import { SnakeEnemy } from "../game/SnakeEnemy";
import { BadWaterDialog } from "../game/BadWaterDialog";
import { Environment } from "./Environment";
import { Obstacles } from "./Obstacles";
import { GameState } from "../game/GameState";

export class TickerScene extends Container implements IUpdateable{
    
    private hud: HUD;

    private static GAME_SPEED_BASE = 0;
    public static FLOOR_LEVEL = 900;

    private playerNinix: Player;
    private mosquito: MosquitoEnemy;
    private snake: SnakeEnemy;
    private objeto: Environment;
    private obstacle: Obstacles;

    private platforms:Platform[];
    private mosquitos:MosquitoEnemy[];
    private snakes:SnakeEnemy[];
    private entorno: Environment[];
    private obstacles: Obstacles[];
    private background0: TilingSprite[];
    private background1: TilingSprite[];
            
    private world: Container;
    private fondoVariable: Container;
    //private background: TilingSprite;

    private timePassedPlataform = 0;
    private timePassedMosquito = 0;
    private timePassedSnake = 0;
    private timePassedObject = 0;
    private timePassedObstacle = 0;

    private segSnake= 21000 * 100;//7,5
    private segEnvir= 11200 * 100;//4
    private segObstacle= 17000 * 100;//6
    private segMosquito= 7000 * 100;//2
    private segPlatform= 5450 * 50;//3
    
    public score: number;
    
    
    
    constructor(){

        super();

        this.world = new Container();
        this.fondoVariable = new Container();
        
        this.background0 = [];
        this.background1 = [];
        
        /*= new TilingSprite(Texture.from("Background"), WIDTH, HEIGHT);
        this.background.scale.set(1,1.45);
        this.addChild(this.background);*/

        for (let i = 4; i > 2; i--) {
			const aux = new TilingSprite(
				Texture.from("Background " + i),
				WIDTH,
				HEIGHT
			);
			this.world.addChild(aux);
			this.background0.push(aux);
		}

        for (let i = 2; i > -1; i--) {
			const aux = new TilingSprite(
				Texture.from("Background " + i),
				WIDTH,
				HEIGHT
			);
			this.world.addChild(aux);
			this.background1.push(aux);
		}

        this.platforms = [];
        this.mosquitos = [];
        this.snakes = [];
        this.entorno = [];
        this.obstacles = [];
                
        this.obstacle = new Obstacles(0);

        this.objeto = new Environment(0);

        this.score = 0;

        this.snake = new SnakeEnemy();
        this.snake.position.set(850,100);

        let agua = new BadWaterDialog();        
        agua.getDialogAguasMalas().position.set(0, TickerScene.FLOOR_LEVEL + 30);
        this.world.addChild(agua.getDialogAguasMalas());

        this.world.addChild(this.fondoVariable);

        let plat0_0 = new Platform("Tile5")
        plat0_0.position.set(0,TickerScene.FLOOR_LEVEL);
        this.world.addChild(plat0_0);
        this.platforms.push(plat0_0);

        let plat0_1 = new Platform("Tile5")
        plat0_1.position.set(0,TickerScene.FLOOR_LEVEL - plat0_0.height);
        this.world.addChild(plat0_1);
        this.platforms.push(plat0_1);
        
        let plat0_2 = new Platform("Tile2")
        plat0_2.position.set(0,TickerScene.FLOOR_LEVEL - plat0_2.height*2);
        this.world.addChild(plat0_2);
        this.platforms.push(plat0_2);

        let plat1_0 = new Platform("Tile5")
        plat1_0.position.set(plat0_0.width,TickerScene.FLOOR_LEVEL);
        this.world.addChild(plat1_0);
        this.platforms.push(plat1_0);

        let plat1_1 = new Platform("Tile10")
        plat1_1.position.set(plat0_0.width,TickerScene.FLOOR_LEVEL - plat0_0.height);
        this.world.addChild(plat1_1);
        this.platforms.push(plat1_1);

        let plat1_2 = new Platform("Tile3")
        plat1_2.position.set(plat0_0.width,TickerScene.FLOOR_LEVEL- plat0_2.height*2);
        this.world.addChild(plat1_2);
        this.platforms.push(plat1_2);

        let plat2_0 = new Platform("Tile5")
        plat2_0.position.set(plat1_0.position.x + plat0_0.width,TickerScene.FLOOR_LEVEL);
        this.world.addChild(plat2_0);
        this.platforms.push(plat2_0);

        let plat2_1 = new Platform("Tile11")
        plat2_1.position.set(plat1_0.position.x + plat0_0.width,TickerScene.FLOOR_LEVEL- plat2_1.height);
        this.world.addChild(plat2_1);
        this.platforms.push(plat2_1);
        
        let arbol = this.objeto;
        arbol.position.set(550, TickerScene.FLOOR_LEVEL - arbol.height);
        this.world.addChild(arbol);
        this.entorno.push(arbol);
        
        this.mosquito = new MosquitoEnemy();
        this.mosquito.position.set(850,100);
        this.world.addChild(this.mosquito);
        this.mosquitos.push(this.mosquito);

        let plat3_0 = new Platform("Tile10")
        plat3_0.position.set(plat2_0.position.x + plat0_0.width,TickerScene.FLOOR_LEVEL);
        this.world.addChild(plat3_0);
        this.platforms.push(plat3_0);

        let plat3_1 = new Platform("Tile3")
        plat3_1.position.set(plat2_0.position.x + plat0_0.width,TickerScene.FLOOR_LEVEL- plat0_0.height);
        console.log(plat3_1.position.x);
        this.world.addChild(plat3_1);
        this.platforms.push(plat3_1);

        let plat4_0 = new Platform("Tile11")
        plat4_0.position.set(plat3_0.position.x + plat0_0.width,TickerScene.FLOOR_LEVEL);
        this.world.addChild(plat4_0);
        this.platforms.push(plat4_0);
                
        let plat5_0 = new Platform("Tile2")
        plat5_0.position.set(plat4_0.position.x + plat0_0.width,TickerScene.FLOOR_LEVEL);
        this.world.addChild(plat5_0);
        this.platforms.push(plat5_0);

        let plat6_0 = new Platform("Tile2")
        plat6_0.position.set(plat5_0.position.x + plat0_0.width,TickerScene.FLOOR_LEVEL);
        this.world.addChild(plat6_0);
        this.platforms.push(plat6_0);

        let plat7_0 = new Platform("Tile7")
        plat7_0.position.set(plat6_0.position.x + plat0_0.width,TickerScene.FLOOR_LEVEL);
        this.world.addChild(plat7_0);
        this.platforms.push(plat7_0);

        let plat8_0 = new Platform("Tile8")
        plat8_0.position.set(plat7_0.position.x + plat0_0.width,TickerScene.FLOOR_LEVEL);
        this.world.addChild(plat8_0);
        this.platforms.push(plat8_0);

        let plat8_1 = new Platform("Tile1")
        plat8_1.position.set(plat7_0.position.x + plat0_0.width,TickerScene.FLOOR_LEVEL- plat0_0.height);
        this.world.addChild(plat8_1);
        this.platforms.push(plat8_1);

        let plat9_0 = new Platform("Tile5")
        plat9_0.position.set(plat8_0.position.x + plat0_0.width,TickerScene.FLOOR_LEVEL);
        this.world.addChild(plat9_0);
        this.platforms.push(plat9_0);

        let plat9_1 = new Platform("Tile2")
        plat9_1.position.set(plat8_0.position.x + plat0_0.width,TickerScene.FLOOR_LEVEL- plat0_0.height);
        this.world.addChild(plat9_1);
        this.platforms.push(plat9_1);

        let plat10_0 = new Platform("Tile10")
        plat10_0.position.set(plat9_0.position.x + plat0_0.width,TickerScene.FLOOR_LEVEL);
        this.world.addChild(plat10_0);
        this.platforms.push(plat10_0);

        let plat10_1 = new Platform("Tile3")
        plat10_1.position.set(plat9_0.position.x + plat0_0.width,TickerScene.FLOOR_LEVEL- plat0_0.height);
        this.world.addChild(plat10_1);
        this.platforms.push(plat10_1);

        let plat11_0 = new Platform("Tile11")
        plat11_0.position.set(plat10_0.position.x + plat0_0.width,TickerScene.FLOOR_LEVEL);
        this.world.addChild(plat11_0);
        this.platforms.push(plat11_0);

        this.playerNinix = new Player();
        this.playerNinix.x = 100;
        this.playerNinix.y = TickerScene.FLOOR_LEVEL - plat0_0.height * 3;
        this.playerNinix.scale.set(0.5);
        this.world.addChild(this.playerNinix);

        this.hud = new HUD();

        this.addChild(this.world);
        this.addChild(this.hud);
                

        
    
    }
    
    
    update(deltaTime: number, _deltaFrame: number): void {

        if(GameState.PLAY){
            TickerScene.GAME_SPEED_BASE = 100;
        }
        
        if (GameState.GAME_OVER) {
       
            return; 
        }

        //const diff = (this.score / 10) + 1;
        console.log("player x: " + this.playerNinix.position.x);
        const diff = (TickerScene.GAME_SPEED_BASE / 1000) + 5;
		const adjustedSpeed = TickerScene.GAME_SPEED_BASE * diff;

        for (let i = 0; i < this.background0.length; i++) {
			const background = this.background0[i];
			const factor = i / 4;
			background.tilePosition.x -= adjustedSpeed * factor * deltaTime / 10000;
			//background.tilePosition.x -= TickerScene.GAME_SPEED_BASE * deltaTime * factor;
		}

        for (let i = 0; i < this.background1.length ; i++) {
			const background = this.background1[i];
			const factor = (i+1)/ 4;
            /*console.log("adjustedSpeed1: " + adjustedSpeed);
            console.log("factor1: " + factor);*/
            
			background.tilePosition.x -= adjustedSpeed * factor * deltaTime / 1000;
			//background.tilePosition.x -= TickerScene.GAME_SPEED_BASE * deltaTime * factor;
            //console.log("background1 " + (i-1) +": "+ background.tilePosition.x);
		}

        console.log("tileposition: " + this.background1[2].tilePosition.x);

        let timePlatform = this.segPlatform/TickerScene.GAME_SPEED_BASE;
        let timeMosquito = this.segMosquito/TickerScene.GAME_SPEED_BASE;
        let timeSnake = this.segSnake/TickerScene.GAME_SPEED_BASE;
        let timeObstacle = this.segObstacle/TickerScene.GAME_SPEED_BASE;
        let timeEnvironment = this.segEnvir/TickerScene.GAME_SPEED_BASE;
        //private timeFlag = 3550 * 300/this.gameSpeed;

        /**console.log("timeplat: "+timePlatform);
        console.log("timeenviro: "+timeEnvironment);
        console.log("timesnake: "+timeSnake);
        console.log("timemosqui: "+timeMosquito);
        console.log("timeobstaculo: "+timeObstacle);
        console.log("gamespeed: "+TickerScene.GAME_SPEED_BASE);*/
        
        this.timePassedPlataform += deltaTime;
        this.timePassedMosquito += deltaTime;
        this.timePassedSnake += deltaTime;
        this.timePassedObject += deltaTime;
        this.timePassedObstacle += deltaTime;

        this.playerNinix.update(deltaTime);
        

        if(this.timePassedPlataform > timePlatform){
            TickerScene.GAME_SPEED_BASE += 5;
            this.timePassedPlataform =0;

            let plat = new Platform("Tile2")
            plat.position.set(WIDTH,TickerScene.FLOOR_LEVEL);
            this.world.addChild(plat);
            this.platforms.push(plat);           

        }
     
        for (let platform of this.platforms) {
            platform.speed.x = -TickerScene.GAME_SPEED_BASE;
            platform.update(deltaTime/1000);
            const overlap = checkCollision(this.playerNinix, platform);
            if (overlap != null)
            {
                this.playerNinix.separate(overlap, platform.position);
            }

            if (platform.getHitbox().right < 0){
                platform.destroy();

            }
        }

        this.platforms = this.platforms.filter((elem)=> !elem.destroyed);

        let mosquito = new MosquitoEnemy();

        if(this.timePassedMosquito > timeMosquito){
                
           this.timePassedMosquito =0;

            
            mosquito.position.set(WIDTH, Math.random()*470);
                                              
            this.world.addChild(mosquito);
            this.mosquitos.push(mosquito);
        }
            
        for (let mosquito of this.mosquitos) {
            mosquito.speed.x = -TickerScene.GAME_SPEED_BASE;
            mosquito.speed.y=50;

            if(mosquito.y > 470){
                
                mosquito.y= 470;
                mosquito.speed.y=-100;
                mosquito.update(deltaTime/1000);

            }                        
            

            mosquito.update(deltaTime/1000);
            const overlap = checkCollision(this.playerNinix, mosquito);
            
            if (overlap != null)
            {
                this.playerNinix.separate(overlap, mosquito.position);
                if(this.playerNinix.canJump){
                    this.playerNinix.takeDamage(mosquito.makeDamage());
                }
                this.hud.gatherDamagePlayer(this.playerNinix.getCurrentHealth());
                                
            }

            if (mosquito.getHitbox().right < 0){
                mosquito.destroy();

            }
        }
        
        this.mosquitos = this.mosquitos.filter((elem)=> !elem.destroyed);

        if(this.timePassedSnake > timeSnake){
                
            this.timePassedSnake =0;
 
            let snake = new SnakeEnemy();
            snake.position.set(WIDTH, TickerScene.FLOOR_LEVEL - snake.width);
            snake.speed.x = -TickerScene.GAME_SPEED_BASE * 10;
        
                                   
            this.world.addChild(snake);
            this.snakes.push(snake);
        }
             
        for (let snake of this.snakes) {
             snake.speed.x = -TickerScene.GAME_SPEED_BASE;
             snake.update(deltaTime/1000);
             const overlap = checkCollision(this.playerNinix, snake);
             
             if (overlap != null)
             {
                 this.playerNinix.separate(overlap, snake.position);
                 if(this.playerNinix.canJump){
                     this.playerNinix.takeDamage(snake.makeDamage());
                 }
                 this.hud.gatherDamagePlayer(this.playerNinix.getCurrentHealth());
                 
                 
             }
 
             if (snake.getHitbox().right < 0){
                 snake.destroy();
 
             }
         }
 
        this.snakes = this.snakes.filter((elem)=> !elem.destroyed);

        this.snake.update(deltaTime);

        if(this.timePassedObstacle > timeObstacle){
                            
            this.timePassedObstacle =0;
            let obstacle = new Obstacles(Math.trunc((Math.random()*10)) % 3);
            obstacle.position.set(WIDTH, TickerScene.FLOOR_LEVEL - obstacle.height);
            //this.fondoVariable.addChild(obstacle);
            this.obstacles.push(obstacle);
        }
        
        for (let obstacle of this.obstacles){
            obstacle.speed.x = -TickerScene.GAME_SPEED_BASE;
            obstacle.update(deltaTime/1000);
            const overlap = checkCollision(this.playerNinix, obstacle);
            if (overlap != null)
            {
                this.playerNinix.separate(overlap, obstacle.position);
            }

            if (obstacle.getHitbox().right < 0){
                obstacle.destroy();
            }
        }

        if(this.timePassedObject > timeEnvironment){
               
            this.timePassedObject =0;   
            let objeto = new Environment(Math.trunc((Math.random()*10)) % 3);
            objeto.position.set(WIDTH, TickerScene.FLOOR_LEVEL - objeto.height );                        
                     
            //this.fondoVariable.addChild(objeto);
            this.entorno.push(objeto);
            
        }
        
        for (let objeto of this.entorno) {
            objeto.speed.x = -TickerScene.GAME_SPEED_BASE;
            objeto.update(deltaTime/1000);
        }

        this.obstacle.update(deltaTime);
        
        this.obstacles = this.obstacles.filter((elem)=> !elem.destroyed);
        this.entorno = this.entorno.filter((elem)=> !elem.destroyed);


        
        //this.world.x = - this.playerNinix.x * this.worldTransform.a + WIDTH/7,5;
        
        //this.background.tilePosition.x -= TickerScene.GAME_SPEED_BASE * deltaTime/1500;
        
        

        //this.world.y = - this.playerNinix.y * this.worldTransform.d + HEIGHT/2;

    }


}