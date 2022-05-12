import { Container, Texture, TilingSprite } from "pixi.js";
import { Player } from "../game/Player";
import { HEIGHT, WIDTH } from "..";
import { IUpdateable } from "../utils/IUpdateable";
import { Platform } from "../game/Platform";
import { checkCollision } from "../game/IHitbox";
import { MosquitoEnemy } from "../game/MosquitoEnemy";
import { HUD } from "./HUD";
import { SnakeEnemy } from "../game/SnakeEnemy";
import { BadWater } from "../game/BadWater";
import { Environment } from "./Environment";
import { Obstacles } from "./Obstacles";

export class TickerScene extends Container implements IUpdateable{
    
    private hud: HUD;

    private gameSpeed = 150;

    private playerNinix: Player;
    private mosquito: MosquitoEnemy;
    private snake: SnakeEnemy;
    private objeto: Environment;
    private objeto1: Obstacles;

    private platforms:Platform[];
    private mosquitos:MosquitoEnemy[];
    private snakes:SnakeEnemy[];
    private entorno: Environment[];
    private obstacles: Obstacles[];
        
    private world: Container;
    private fondoVariable: Container;
    private background: TilingSprite;

    private timePassedPlataform = 0;
    private timePassedMosquito = 0;
    private timePassedSnake = 0;
    private timePassedObject = 0;
    private timePassedObstacle = 0;
    
    public static ARRANCAR = false;
    
    
    
    constructor(){

        super();

        this.world = new Container();
        this.fondoVariable = new Container();
        
        this.background = new TilingSprite(Texture.from("Background"), WIDTH, HEIGHT);
        this.background.scale.set(1,1.45);

        this.addChild(this.background);

        this.platforms = [];
        this.mosquitos = [];
        this.snakes = [];
        this.entorno = [];
        this.obstacles = [];
                
        this.objeto1 = new Obstacles(0);

        this.objeto = new Environment(0);

        this.snake = new SnakeEnemy();
        this.snake.position.set(850,100);

        let agua = new BadWater();        
        agua.getDialogAguasMalas().position.set(0, 935);
        this.world.addChild(agua.getDialogAguasMalas());
        
        let plat = new Platform("Tile2")
        plat.position.set(0,900);
        this.world.addChild(plat);
        this.platforms.push(plat);

        let plat1 = new Platform("Tile2")
        plat1.position.set(192,900);
        this.world.addChild(plat1);
        this.platforms.push(plat1);

        let plat1_1 = new Platform("Tile2")
        plat1_1.position.set(plat1.position.x + 192,900);
        this.world.addChild(plat1_1);
        this.platforms.push(plat1_1);
        
        let arbol = this.objeto;
        arbol.position.set(150, 950 - arbol.height * 2.5);
        this.fondoVariable.addChild(arbol.getObject());
        this.world.addChild(this.fondoVariable);
        this.entorno.push(arbol);
        
        this.mosquito = new MosquitoEnemy();
        this.mosquito.position.set(850,100);
        this.world.addChild(this.mosquito);
        this.mosquitos.push(this.mosquito);

        let plat2 = new Platform("Tile3")
        plat2.position.set(plat1_1.position.x + 192,900);
        console.log(plat2.position.x);
        this.world.addChild(plat2);
        this.platforms.push(plat2);

        let plat3 = new Platform("Tile1")
        plat3.position.set(plat2.position.x + plat3.width*3,900);
        this.world.addChild(plat3);
        this.platforms.push(plat3);
                
        let plat4 = new Platform("Tile2")
        plat4.position.set(plat3.position.x + 192,900);
        this.world.addChild(plat4);
        this.platforms.push(plat4);

        let plat5 = new Platform("Tile7")
        plat5.position.set(plat4.position.x + 192,900);
        this.world.addChild(plat5);
        this.platforms.push(plat5);

        let plat6 = new Platform("Tile8")
        plat6.position.set(plat5.position.x + 192,900);
        this.world.addChild(plat6);
        this.platforms.push(plat6);

        let plat7 = new Platform("Tile1")
        plat7.position.set(plat5.position.x + 192,750);
        this.world.addChild(plat7);
        this.platforms.push(plat7);

        let plat8 = new Platform("Tile5")
        plat8.position.set(plat7.position.x + 192,900);
        this.world.addChild(plat8);
        this.platforms.push(plat8);

        let plat9 = new Platform("Tile2")
        plat9.position.set(plat7.position.x + 192,750);
        this.world.addChild(plat9);
        this.platforms.push(plat9);

        let plat10 = new Platform("Tile10")
        plat10.position.set(plat8.position.x + 192,900);
        this.world.addChild(plat10);
        this.platforms.push(plat10);

        let plat11 = new Platform("Tile3")
        plat11.position.set(plat8.position.x + 192,750);
        this.world.addChild(plat11);
        this.platforms.push(plat11);

        let plat12 = new Platform("Tile11")
        plat12.position.set(plat10.position.x + 192,900);
        this.world.addChild(plat12);
        this.platforms.push(plat12);

        this.playerNinix = new Player();
        this.playerNinix.x = 100;
        this.playerNinix.y = 750;
        this.playerNinix.scale.set(0.5);
        this.world.addChild(this.playerNinix);

        this.hud = new HUD();

        this.addChild(this.hud);
        this.addChild(this.world);
       
    
    }
    
    
    update(deltaTime: number, _deltaFrame: number): void {
        
        this.timePassedPlataform += deltaTime;
        this.timePassedMosquito += deltaTime;
        this.timePassedSnake += deltaTime;
        this.timePassedObject += deltaTime;
        this.timePassedObstacle += deltaTime;

        this.playerNinix.update(deltaTime);
        //this.aguasMalas.update(deltaTime);
        

        console.log(6000 * 95/this.gameSpeed)
        if(this.timePassedPlataform > 6000 * 100/this.gameSpeed){
            this.gameSpeed += 2.5;
            this.timePassedPlataform =0;

            let plat = new Platform("Tile2")
            plat.position.set(WIDTH,900);
            this.world.addChild(plat);
            this.platforms.push(plat);           

        }
     
        for (let platform of this.platforms) {
            platform.speed.x = -this.gameSpeed;
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

        if(this.timePassedMosquito > 3500 * 400/this.gameSpeed){
                
           this.timePassedMosquito =0;

            
            mosquito.position.set(WIDTH, Math.random()*470);
                                              
            this.world.addChild(mosquito);
            this.mosquitos.push(mosquito);
        }
            
        for (let mosquito of this.mosquitos) {
            mosquito.speed.x = -this.gameSpeed;
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

        if(this.timePassedSnake > 5500 * 400/this.gameSpeed){
                
            this.timePassedSnake =0;
 
            let snake = new SnakeEnemy();
            snake.position.set(WIDTH, 900 - snake.width);
            snake.speed.x = -this.gameSpeed * 10;
        
                                   
            this.world.addChild(snake);
            this.snakes.push(snake);
        }
             
        for (let snake of this.snakes) {
             snake.speed.x = -this.gameSpeed;
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

        if(this.timePassedObstacle > 4000 * 400/this.gameSpeed){
                            
            this.timePassedObstacle =0;
            let plat = new Obstacles(Math.round((Math.random()*10)) % 3);
            plat.position.set(WIDTH, 900 - plat.height * 1.2);
            this.fondoVariable.addChild(plat);
            this.obstacles.push(plat);
        }
        
        for (let objeto1 of this.obstacles){
            objeto1.speed.x = -this.gameSpeed;
            objeto1.update(deltaTime/1000);
            const overlap = checkCollision(this.playerNinix, objeto1);
            if (overlap != null)
            {
                this.playerNinix.separate(overlap, objeto1.position);
            }

            if (objeto1.getHitbox().right < 0){
                objeto1.destroy();
            }
        }

        if(this.timePassedObject > 3000 * 400/this.gameSpeed){
                
            this.timePassedObject =0;  
 
            let objeto = new Environment(Math.round((Math.random()*10)) % 3);
            objeto.position.set(WIDTH, 950 - objeto.height * 2.5);                        
                     
            //this.fondoVariable.addChild(objeto.getObject());
            this.entorno.push(objeto);
            
        }
        
        for (let objeto of this.entorno) {
            objeto.speed.x = -this.gameSpeed;
            objeto.update(deltaTime/1000);
        }


        this.objeto.update(deltaTime);
        this.objeto1.update(deltaTime);

        this.obstacles = this.obstacles.filter((elem)=> !elem.destroyed);

        this.entorno = this.entorno.filter((elem)=> !elem.destroyed);




        
        //this.world.x = - this.playerNinix.x * this.worldTransform.a + WIDTH/7,5;
        
        this.background.tilePosition.x -= this.gameSpeed * deltaTime/1500;
        
        

        //this.world.y = - this.playerNinix.y * this.worldTransform.d + HEIGHT/2;

    }


}