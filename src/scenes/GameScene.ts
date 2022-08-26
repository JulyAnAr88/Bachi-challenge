import { Container, Rectangle, Texture, TilingSprite } from "pixi.js";
import { Player } from "../game/Player";
import { IUpdateable } from "../utils/IUpdateable";
import { Platform } from "../game/Platform";
import { checkCollision } from "../game/IHitbox";
import { Obstacles } from "./Obstacles";
import { MetaDialog1 } from "./MetaDialog1";
import { MosquitoEnemy } from "../game/MosquitoEnemy";
import { HUD } from "./HUD";
import { SnakeEnemy } from "../game/SnakeEnemy";
import { Environment } from "./Environment";
import { GameState } from "../game/GameState";
import { BadWater } from "../game/BadWater";
import { Flag } from "../game/Flag";
import { Bachi } from "../game/Bachi";
import { sound } from "@pixi/sound";
import { FinalMetaDialog } from "./FinalMetaDialog";
import { SceneManager } from "../utils/SceneManager";
import { SceneBase } from "../utils/SceneBase";
import { GodrayFilter } from "@pixi/filter-godray";
import { GameOverDialog } from "./GameOverDialog";

export class GameScene extends SceneBase implements IUpdateable{
    
    private hud: HUD;

    public static GAME_SPEED_BASE = 0;
    public static FLOOR_LEVEL = 950;

    private playerNinix: Player;
    private mosquito: MosquitoEnemy;
    private snake: SnakeEnemy;
    private objeto: Environment;   
    private flag1: Flag;
    private bachi: Bachi; 
    private obstacle: Obstacles;
    private metaDialog1: MetaDialog1;
    private gameOverDialog: GameOverDialog;

    private snakes:SnakeEnemy[];    
    private obstacles: Obstacles[];
    private platforms:Platform[];
    private aguasMalas:BadWater[];
    private mosquitos:MosquitoEnemy[];
    private entorno: Environment[];    
    private background0: TilingSprite[];
    private background1: TilingSprite[];
    private banderas: Flag[];
    private bachiAndFlag: Bachi[];
            
    private world: Container;
    private fondoVariable: Container;
    
    private timeCount = 0;
    private timePassedMosquito = 0;
    private timePassedSnake = 0;
    private timePassedObject = 0;
    private timePassedObstacle = 0;
    

    private segSnake= 8500 * 100;//
    private segEnvir= 4600 * 100;//
    private segObstacle= 5500 * 100;//
    private segMosquito= 3500 * 100;//1

    private myGodray = new GodrayFilter();
    
    private timeList: String[] = [];
    

    constructor(){

        super();

        this.world = new Container();
        this.fondoVariable = new Container();
        this.metaDialog1 = new MetaDialog1();
        this.gameOverDialog = new GameOverDialog();
        
        this.background0 = [];
        this.background1 = [];
        
        
        for (let i = 4; i > 2; i--) {
			const aux = new TilingSprite(
				Texture.from("Background " + i),
				SceneManager.WIDTH,
				SceneManager.HEIGHT
			);
			this.addChild(aux);
			this.background0.push(aux);
		}

        for (let i = 2; i > -1; i--) {
			const aux = new TilingSprite(
				Texture.from("Background " + i),
				SceneManager.WIDTH,
				SceneManager.HEIGHT
			);
			this.addChild(aux);
			this.background1.push(aux);
		}

        this.platforms = [];
        this.mosquitos = [];        
        this.entorno = [];        
        this.aguasMalas = [];
        this.banderas = [];
        this.bachiAndFlag = [];
        this.snakes = [];
        this.obstacles = [];
                
        this.obstacle = new Obstacles(0);

        this.objeto = new Environment(0);

        this.snake = new SnakeEnemy();
        this.snake.position.set(850,100);

        this.world.addChild(this.fondoVariable);
    
        let plat0_00 = new Platform("Tiles/Tile (5).png")
        plat0_00.position.set(-plat0_00.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat0_00);
        this.platforms.push(plat0_00);

        let plat0_01 = new Platform("Tiles/Tile (5).png")
        plat0_01.position.set(-plat0_00.width,GameScene.FLOOR_LEVEL - plat0_00.height);
        this.world.addChild(plat0_01);
        this.platforms.push(plat0_01);
        
        let plat0_02 = new Platform("Tiles/Tile (10).png")
        plat0_02.position.set(-plat0_00.width,GameScene.FLOOR_LEVEL - plat0_02.height*2);
        this.world.addChild(plat0_02);
        this.platforms.push(plat0_02);

        let plat0_03 = new Platform("Tiles/Tile (3).png")
        plat0_03.position.set(-plat0_00.width,GameScene.FLOOR_LEVEL - plat0_02.height*3);
        this.world.addChild(plat0_03);
        this.platforms.push(plat0_03);

        let plat0_0 = new Platform("Tiles/Tile (5).png")
        plat0_0.position.set(0,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat0_0);
        this.platforms.push(plat0_0);

        let plat0_1 = new Platform("Tiles/Tile (5).png")
        plat0_1.position.set(0,GameScene.FLOOR_LEVEL - plat0_0.height);
        this.world.addChild(plat0_1);
        this.platforms.push(plat0_1);
        
        let plat0_2 = new Platform("Tiles/Tile (11).png")
        plat0_2.position.set(0,GameScene.FLOOR_LEVEL - plat0_2.height*2);
        this.world.addChild(plat0_2);
        this.platforms.push(plat0_2);

        let plat1_0 = new Platform("Tiles/Tile (5).png")
        plat1_0.position.set(plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat1_0);
        this.platforms.push(plat1_0);

        let plat1_1 = new Platform("Tiles/Tile (10).png")
        plat1_1.position.set(plat0_0.width,GameScene.FLOOR_LEVEL - plat0_0.height);
        this.world.addChild(plat1_1);
        this.platforms.push(plat1_1);

        let plat1_2 = new Platform("Tiles/Tile (3).png")
        plat1_2.position.set(plat0_0.width,GameScene.FLOOR_LEVEL- plat0_2.height*2);
        this.world.addChild(plat1_2);
        this.platforms.push(plat1_2);

        let plat2_0 = new Platform("Tiles/Tile (5).png")
        plat2_0.position.set(plat1_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat2_0);
        this.platforms.push(plat2_0);

        let plat2_1 = new Platform("Tiles/Tile (11).png")
        plat2_1.position.set(plat1_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL- plat2_1.height);
        this.world.addChild(plat2_1);
        this.platforms.push(plat2_1);
        
        let arbol = this.objeto;
        arbol.position.set(550, GameScene.FLOOR_LEVEL - arbol.height);
        this.world.addChild(arbol);
        this.entorno.push(arbol);

        this.mosquito = new MosquitoEnemy();
        this.mosquito.position.set(550,100);
        this.world.addChild(this.mosquito);
        this.mosquitos.push(this.mosquito);

        let plat3_0 = new Platform("Tiles/Tile (10).png")
        plat3_0.position.set(plat2_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat3_0);
        this.platforms.push(plat3_0);

        let plat3_1 = new Platform("Tiles/Tile (3).png")
        plat3_1.position.set(plat2_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL- plat0_0.height);
        this.world.addChild(plat3_1);
        this.platforms.push(plat3_1);

        let plat4_0 = new Platform("Tiles/Tile (11).png")
        plat4_0.position.set(plat3_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat4_0);
        this.platforms.push(plat4_0);
                
        let plat5_0 = new Platform("Tiles/Tile (2).png")
        plat5_0.position.set(plat4_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat5_0);
        this.platforms.push(plat5_0);

        let plat6_0 = new Platform("Tiles/Tile (2).png")
        plat6_0.position.set(plat5_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat6_0);
        this.platforms.push(plat6_0);

        let plat7_0 = new Platform("Tiles/Tile (7).png")
        plat7_0.position.set(plat6_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat7_0);
        this.platforms.push(plat7_0);

        let plat8_0 = new Platform("Tiles/Tile (8).png")
        plat8_0.position.set(plat7_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat8_0);
        this.platforms.push(plat8_0);

        let plat8_1 = new Platform("Tiles/Tile (1).png")
        plat8_1.position.set(plat7_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL- plat0_0.height);
        this.world.addChild(plat8_1);
        this.platforms.push(plat8_1);

        let plat9_0 = new Platform("Tiles/Tile (5).png")
        plat9_0.position.set(plat8_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat9_0);
        this.platforms.push(plat9_0);

        let plat9_1 = new Platform("Tiles/Tile (2).png")
        plat9_1.position.set(plat8_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL- plat0_0.height);
        this.world.addChild(plat9_1);
        this.platforms.push(plat9_1);

        let plat10_0 = new Platform("Tiles/Tile (10).png")
        plat10_0.position.set(plat9_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat10_0);
        this.platforms.push(plat10_0);

        let plat10_1 = new Platform("Tiles/Tile (3).png")
        plat10_1.position.set(plat9_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL- plat0_0.height);
        this.world.addChild(plat10_1);
        this.platforms.push(plat10_1);
        
        let agua0_0 = new BadWater();        
        agua0_0.position.set(plat10_0.position.x + 2 * (plat0_0.width) - 10, GameScene.FLOOR_LEVEL + 30);
        this.world.addChild(agua0_0);
        this.aguasMalas.push(agua0_0);

        let agua1_0 = new BadWater();        
        agua1_0.position.set(agua0_0.position.x + agua0_0.width, GameScene.FLOOR_LEVEL + 30);
        this.world.addChild(agua1_0);
        this.aguasMalas.push(agua1_0);
        
        let plat11_0 = new Platform("Tiles/Tile (3).png")
        plat11_0.position.set(plat10_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat11_0);
        this.platforms.push(plat11_0);

        let plat12_0 = new Platform("Tiles/Tile (1).png")
        plat12_0.position.set(agua1_0.position.x + agua1_0.width - 10,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat12_0);
        this.platforms.push(plat12_0);

        let plat13_0 = new Platform("Tiles/Tile (2).png")
        plat13_0.position.set(plat12_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat13_0);
        this.platforms.push(plat13_0);

        let plat14_0 = new Platform("Tiles/Tile (2).png")
        plat14_0.position.set(plat13_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat14_0);
        this.platforms.push(plat14_0);

        let plat15_0 = new Platform("Tiles/Tile (2).png")
        plat15_0.position.set(plat14_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat15_0);
        this.platforms.push(plat15_0);

        let plat16_0 = new Platform("Tiles/Tile (2).png")
        plat16_0.position.set(plat15_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat16_0);
        this.platforms.push(plat16_0);

        let plat17_0 = new Platform("Tiles/Tile (2).png")
        plat17_0.position.set(plat16_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat17_0);
        this.platforms.push(plat17_0);

        let plat18_0 = new Platform("Tiles/Tile (2).png")
        plat18_0.position.set(plat17_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat18_0);
        this.platforms.push(plat18_0);

        let plat19_0 = new Platform("Tiles/Tile (2).png")
        plat19_0.position.set(plat18_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat19_0);
        this.platforms.push(plat19_0);

        let plat20_0 = new Platform("Tiles/Tile (2).png")
        plat20_0.position.set(plat19_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat20_0);
        this.platforms.push(plat20_0);

        let plat21_0 = new Platform("Tiles/Tile (2).png")
        plat21_0.position.set(plat20_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat21_0);
        this.platforms.push(plat21_0);

        let plat22_0 = new Platform("Tiles/Tile (2).png")
        plat22_0.position.set(plat21_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat22_0);
        this.platforms.push(plat22_0);

        let plat23_0 = new Platform("Tiles/Tile (2).png")
        plat23_0.position.set(plat22_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat23_0);
        this.platforms.push(plat23_0);

        let plat24_0 = new Platform("Tiles/Tile (2).png")
        plat24_0.position.set(plat23_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat24_0);
        this.platforms.push(plat24_0);

        let plat25_0 = new Platform("Tiles/Tile (2).png")
        plat25_0.position.set(plat24_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat25_0);
        this.platforms.push(plat25_0);

        let plat26_0 = new Platform("Tiles/Tile (2).png")
        plat26_0.position.set(plat25_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat26_0);
        this.platforms.push(plat26_0);

        let plat27_0 = new Platform("Tiles/Tile (2).png")
        plat27_0.position.set(plat26_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat27_0);
        this.platforms.push(plat27_0);

        let plat28_0 = new Platform("Tiles/Tile (2).png")
        plat28_0.position.set(plat27_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat28_0);
        this.platforms.push(plat28_0);

        let agua2_0 = new BadWater();        
        agua2_0.position.set(plat28_0.position.x + 2 * (plat0_0.width) - 10, GameScene.FLOOR_LEVEL + 30);
        this.world.addChild(agua2_0);
        this.aguasMalas.push(agua2_0);

        let agua3_0 = new BadWater();        
        agua3_0.position.set(agua2_0.position.x + agua0_0.width, GameScene.FLOOR_LEVEL + 30);
        this.world.addChild(agua3_0);
        this.aguasMalas.push(agua3_0);
        
        let plat29_0 = new Platform("Tiles/Tile (3).png")
        plat29_0.position.set(plat28_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat29_0);
        this.platforms.push(plat29_0);

        let plat30_0 = new Platform("Tiles/Tile (1).png")
        plat30_0.position.set(agua3_0.position.x + plat0_0.width-10,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat30_0);
        this.platforms.push(plat30_0);

        let plat31_0 = new Platform("Tiles/Tile (2).png")
        plat31_0.position.set(plat30_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat31_0);
        this.platforms.push(plat31_0);

        let plat32_0 = new Platform("Tiles/Tile (2).png")
        plat32_0.position.set(plat31_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat32_0);
        this.platforms.push(plat32_0);

        let plat33_0 = new Platform("Tiles/Tile (2).png")
        plat33_0.position.set(plat32_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat33_0);
        this.platforms.push(plat33_0);

        this.flag1 = new Flag();
        this.flag1.position.set(plat33_0.position.x,GameScene.FLOOR_LEVEL - this.flag1.height);
        this.world.addChild(this.flag1);
        this.banderas.push(this.flag1);
        
        let plat34_0 = new Platform("Tiles/Tile (2).png")
        plat34_0.position.set(plat33_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat34_0);
        this.platforms.push(plat34_0);

        let plat35_0 = new Platform("Tiles/Tile (7).png")
        plat35_0.position.set(plat34_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat35_0);
        this.platforms.push(plat35_0);

        let plat36_0 = new Platform("Tiles/Tile (8).png")
        plat36_0.position.set(plat35_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat36_0);
        this.platforms.push(plat36_0);
        
        let plat36_1 = new Platform("Tiles/Tile (1).png")
        plat36_1.position.set(plat35_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL - plat0_2.height);
        this.world.addChild(plat36_1);
        this.platforms.push(plat36_1);

        let plat37_0 = new Platform("Tiles/Tile (10).png")
        plat37_0.position.set(plat36_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat37_0);
        this.platforms.push(plat37_0);

        let plat37_1 = new Platform("Tiles/Tile (3).png")
        plat37_1.position.set(plat36_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL - plat0_0.height);
        this.world.addChild(plat37_1);
        this.platforms.push(plat37_1);

        let plat38_0 = new Platform("Tiles/Tile (11).png")
        plat38_0.position.set(plat37_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat38_0);
        this.platforms.push(plat38_0);

        let plat39_0 = new Platform("Tiles/Tile (2).png")
        plat39_0.position.set(plat38_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat39_0);
        this.platforms.push(plat39_0);

        let plat40_0 = new Platform("Tiles/Tile (2).png")
        plat40_0.position.set(plat39_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat40_0);
        this.platforms.push(plat40_0);
 
        let plat41_0 = new Platform("Tiles/Tile (2).png")
        plat41_0.position.set(plat40_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat41_0);
        this.platforms.push(plat41_0);

        let plat42_0 = new Platform("Tiles/Tile (2).png")
        plat42_0.position.set(plat41_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat42_0);
        this.platforms.push(plat42_0);

        let plat43_0 = new Platform("Tiles/Tile (2).png")
        plat43_0.position.set(plat42_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat43_0);
        this.platforms.push(plat43_0);
                
        let plat44_0 = new Platform("Tiles/Tile (2).png")
        plat44_0.position.set(plat43_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat44_0);
        this.platforms.push(plat44_0);

        let plat45_0 = new Platform("Tiles/Tile (2).png")
        plat45_0.position.set(plat44_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat45_0);
        this.platforms.push(plat45_0);

        let plat46_0 = new Platform("Tiles/Tile (2).png")
        plat46_0.position.set(plat45_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat46_0);
        this.platforms.push(plat46_0);

        let plat47_0 = new Platform("Tiles/Tile (2).png")
        plat47_0.position.set(plat46_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat47_0);
        this.platforms.push(plat47_0);

        let plat48_0 = new Platform("Tiles/Tile (2).png")
        plat48_0.position.set(plat47_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat48_0);
        this.platforms.push(plat48_0);

        let plat49_0 = new Platform("Tiles/Tile (2).png")
        plat49_0.position.set(plat48_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat49_0);
        this.platforms.push(plat49_0);

        let plat50_0 = new Platform("Tiles/Tile (2).png")
        plat50_0.position.set(plat49_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat50_0);
        this.platforms.push(plat50_0);

        let plat51_0 = new Platform("Tiles/Tile (2).png")
        plat51_0.position.set(plat50_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat51_0);
        this.platforms.push(plat51_0);

        let plat52_0 = new Platform("Tiles/Tile (2).png")
        plat52_0.position.set(plat51_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat52_0);
        this.platforms.push(plat52_0);
        
        let agua4_0 = new BadWater();        
        agua4_0.position.set(plat52_0.position.x + 2 * (plat0_0.width) - 10, GameScene.FLOOR_LEVEL + 30);
        this.world.addChild(agua4_0);
        this.aguasMalas.push(agua4_0);

        let agua5_0 = new BadWater();        
        agua5_0.position.set(agua4_0.position.x + agua0_0.width, GameScene.FLOOR_LEVEL + 30);
        this.world.addChild(agua5_0);
        this.aguasMalas.push(agua5_0);
        
        let plat53_0 = new Platform("Tiles/Tile (3).png")
        plat53_0.position.set(plat52_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat53_0);
        this.platforms.push(plat53_0);

        let plat54_0 = new Platform("Tiles/Tile (1).png")
        plat54_0.position.set(agua5_0.position.x + agua1_0.width - 10,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat54_0);
        this.platforms.push(plat54_0);

        let plat55_0 = new Platform("Tiles/Tile (2).png")
        plat55_0.position.set(plat54_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat55_0);
        this.platforms.push(plat55_0);

        let plat56_0 = new Platform("Tiles/Tile (2).png")
        plat56_0.position.set(plat55_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat56_0);
        this.platforms.push(plat56_0);

        let plat57_0 = new Platform("Tiles/Tile (2).png")
        plat57_0.position.set(plat56_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat57_0);
        this.platforms.push(plat57_0);

        let plat58_0 = new Platform("Tiles/Tile (2).png")
        plat58_0.position.set(plat57_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat58_0);
        this.platforms.push(plat58_0);

        let plat59_0 = new Platform("Tiles/Tile (2).png")
        plat59_0.position.set(plat58_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat59_0);
        this.platforms.push(plat59_0);

        let plat60_0 = new Platform("Tiles/Tile (2).png")
        plat60_0.position.set(plat59_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat60_0);
        this.platforms.push(plat60_0);

        let plat61_0 = new Platform("Tiles/Tile (2).png")
        plat61_0.position.set(plat60_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat61_0);
        this.platforms.push(plat61_0);

        let plat62_0 = new Platform("Tiles/Tile (2).png")
        plat62_0.position.set(plat61_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat62_0);
        this.platforms.push(plat62_0);

        let plat63_0 = new Platform("Tiles/Tile (2).png")
        plat63_0.position.set(plat62_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat63_0);
        this.platforms.push(plat63_0);

        let plat64_0 = new Platform("Tiles/Tile (2).png")
        plat64_0.position.set(plat63_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat64_0);
        this.platforms.push(plat64_0);

        let plat65_0 = new Platform("Tiles/Tile (2).png")
        plat65_0.position.set(plat64_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat65_0);
        this.platforms.push(plat65_0);

        let plat66_0 = new Platform("Tiles/Tile (2).png")
        plat66_0.position.set(plat65_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat66_0);
        this.platforms.push(plat66_0);

        let plat67_0 = new Platform("Tiles/Tile (2).png")
        plat67_0.position.set(plat66_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat67_0);
        this.platforms.push(plat67_0);

        let plat68_0 = new Platform("Tiles/Tile (2).png")
        plat68_0.position.set(plat67_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat68_0);
        this.platforms.push(plat68_0);

        let plat69_0 = new Platform("Tiles/Tile (2).png")
        plat69_0.position.set(plat68_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat69_0);
        this.platforms.push(plat69_0);

        let plat70_0 = new Platform("Tiles/Tile (2).png")
        plat70_0.position.set(plat69_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat70_0);
        this.platforms.push(plat70_0);

        let agua6_0 = new BadWater();        
        agua6_0.position.set(plat70_0.position.x + 2 * (plat0_0.width) - 10, GameScene.FLOOR_LEVEL + 30);
        this.world.addChild(agua6_0);
        this.aguasMalas.push(agua6_0);

        let agua7_0 = new BadWater();        
        agua7_0.position.set(agua6_0.position.x + agua0_0.width, GameScene.FLOOR_LEVEL + 30);
        this.world.addChild(agua7_0);
        this.aguasMalas.push(agua7_0);
        
        let plat71_0 = new Platform("Tiles/Tile (3).png")
        plat71_0.position.set(plat70_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat71_0);
        this.platforms.push(plat71_0);

        let plat72_0 = new Platform("Tiles/Tile (1).png")
        plat72_0.position.set(agua7_0.position.x + plat0_0.width-10,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat72_0);
        this.platforms.push(plat72_0);

        let plat73_0 = new Platform("Tiles/Tile (2).png")
        plat73_0.position.set(plat72_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat73_0);
        this.platforms.push(plat73_0);

        let plat74_0 = new Platform("Tiles/Tile (2).png")
        plat74_0.position.set(plat73_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat74_0);
        this.platforms.push(plat74_0);

        let plat75_0 = new Platform("Tiles/Tile (2).png")
        plat75_0.position.set(plat74_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat75_0);
        this.platforms.push(plat75_0);
        
        let plat76_0 = new Platform("Tiles/Tile (2).png")
        plat76_0.position.set(plat75_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat76_0);
        this.platforms.push(plat76_0);

        let plat77_0 = new Platform("Tiles/Tile (2).png")
        plat77_0.position.set(plat76_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat77_0);
        this.platforms.push(plat77_0);

        let plat78_0 = new Platform("Tiles/Tile (2).png")
        plat78_0.position.set(plat75_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat78_0);
        this.platforms.push(plat78_0);

        let plat79_0 = new Platform("Tiles/Tile (2).png")
        plat79_0.position.set(plat78_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat79_0);
        this.platforms.push(plat79_0);
        
        let plat80_0 = new Platform("Tiles/Tile (2).png")
        plat80_0.position.set(plat79_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat80_0);
        this.platforms.push(plat80_0);

        let plat81_0 = new Platform("Tiles/Tile (2).png")
        plat81_0.position.set(plat80_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat81_0);
        this.platforms.push(plat81_0);
  
        let agua8_0 = new BadWater();        
        agua8_0.position.set(plat81_0.position.x + 2 * (plat0_0.width) - 10, GameScene.FLOOR_LEVEL + 30);
        this.world.addChild(agua8_0);
        this.aguasMalas.push(agua8_0);

        let agua9_0 = new BadWater();        
        agua9_0.position.set(agua8_0.position.x + agua0_0.width, GameScene.FLOOR_LEVEL + 30);
        this.world.addChild(agua9_0);
        this.aguasMalas.push(agua9_0);
        
        let plat82_0 = new Platform("Tiles/Tile (3).png")
        plat82_0.position.set(plat81_0.position.x + plat0_0.width,GameScene.FLOOR_LEVEL);
        this.world.addChild(plat82_0);
        this.platforms.push(plat82_0);

        let agua10_0 = new BadWater();        
        agua10_0.position.set(agua9_0.position.x + agua0_0.width, GameScene.FLOOR_LEVEL + 30);
        this.world.addChild(agua10_0);
        this.aguasMalas.push(agua10_0);

        this.bachi = new Bachi();
        this.bachi.position.set(plat72_0.position.x + (plat0_0.width)*3,GameScene.FLOOR_LEVEL - (this.bachi.height * 7/9)-35);
        this.world.addChild(this.bachi);
        this.bachiAndFlag.push(this.bachi);

        let agua11_0 = new BadWater();        
        agua11_0.position.set(agua10_0.position.x + agua0_0.width, GameScene.FLOOR_LEVEL + 30);
        this.world.addChild(agua11_0);
        this.aguasMalas.push(agua11_0);


        this.playerNinix = new Player();
        this.playerNinix.x = 50;
        this.playerNinix.y = GameScene.FLOOR_LEVEL - plat0_0.height * 4;
        this.playerNinix.scale.set(0.5);
        this.world.addChild(this.playerNinix);

        this.hud = new HUD();

        this.addChild(this.world);
        this.addChild(this.hud);

        
        this.myGodray.parallel = false;
        this.myGodray.center = [0, -50];

        sound.find("victory");            
    
    }
    
    
    update(deltaTime: number, _deltaMS: number): void {
        if(GameState.IS_PAUSED){
            GameScene.GAME_SPEED_BASE = 0;
            return;
        }
        
        if(GameState.PLAY){
            GameScene.GAME_SPEED_BASE = 100;
            this.timeCount += deltaTime;
            this.hud.update(this.timeCount);
        }
                
        if (GameState.GAME_OVER) {
            GameState.PLAY = false;
            GameScene.GAME_SPEED_BASE = 0;            
            this.gameOverDialog.position.set(SceneManager.WIDTH * 1/4, SceneManager.HEIGHT * 1/6);
            this.hud.addChild(this.gameOverDialog);
            return; 
        }


         if (this.playerNinix.position.x < (SceneManager.WIDTH * 1/12)) {
            this.playerNinix.position.x = SceneManager.WIDTH * 1/12;            
        }/*elseif (this.playerNinix.position.x < 0) {
            this.playerNinix.position.x = 0;
        } */ 
        if (this.playerNinix.position.y > (SceneManager.HEIGHT - 280)) {
            this.playerNinix.position.y = SceneManager.HEIGHT - 280;            
        }

        /* const diff = (GameScene.GAME_SPEED_BASE / 1000) + 5;
		const adjustedSpeed = GameScene.GAME_SPEED_BASE * diff;*/

        for (let i = 0; i < this.background0.length; i++) {
			const background = this.background0[i];
			const factor = i / 4;
			background.tilePosition.x -= /* adjustedSpeed * */ factor * deltaTime / 100000;
		}

        for (let i = 0; i < this.background1.length ; i++) {
			const background = this.background1[i];
			const factor = (i+1)/ 4;
            
			background.tilePosition.x -= /* adjustedSpeed * */ factor * deltaTime / 5000;
		}      
        
        this.playerNinix.update(deltaTime);
        
    
        for (let platform of this.platforms) {
            //platform.speed.x = -GameScene.GAME_SPEED_BASE;
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


        for (let agua of this.aguasMalas) {
            //agua.speed.x = -GameScene.GAME_SPEED_BASE;
            agua.update(deltaTime/1000);
            const overlap = checkCollision(this.playerNinix, agua);
            
            if (overlap != null)
            {
                this.playerNinix.separate(overlap, agua.position);
                if(this.playerNinix.canJump){
                    this.playerNinix.takeDamage(agua.makeDamage());
                }
                this.hud.gatherDamagePlayer(0);
                
                
            }

            if (agua.getHitbox().right < 0){
                agua.destroy();

            }
        }

       this.aguasMalas = this.aguasMalas.filter((elem)=> !elem.destroyed);

       let timeMosquito = this.segMosquito/GameScene.GAME_SPEED_BASE;
        let timeSnake = this.segSnake/GameScene.GAME_SPEED_BASE;
        let timeObstacle = this.segObstacle/GameScene.GAME_SPEED_BASE;
        let timeEnvironment = this.segEnvir/GameScene.GAME_SPEED_BASE;
               
        this.timePassedMosquito += deltaTime;
        this.timePassedSnake += deltaTime;
        this.timePassedObject += deltaTime;
        this.timePassedObstacle += deltaTime;

        
        
       for (let bandera of this.banderas) {
        //bandera.speed.x = -GameScene.GAME_SPEED_BASE;
        bandera.update(deltaTime/1000);
        const overlap = checkCollision(this.playerNinix, bandera);
        
        if (overlap != null)
        {
            bandera.animar();     
            this.metaDialog1.position.set(SceneManager.WIDTH * 2/5, SceneManager.HEIGHT * 1/10);
            this.addChild(this.metaDialog1);

            setTimeout(() => {
                this.removeChild(this.metaDialog1);
            }, 3.5 * 1000);
        }

        if (bandera.getHitbox().right < 0){
            bandera.destroy();

        }
    }

    this.banderas = this.banderas.filter((elem)=> !elem.destroyed);

    for (let bachi of this.bachiAndFlag) {
        //bachi.speed.x = -GameScene.GAME_SPEED_BASE;
        bachi.update(deltaTime/1000);
        const overlap = checkCollision(this.playerNinix, bachi);
    
        if (overlap != null)
        {
            bachi.animar();   
            sound.play("victory", {
                loop:false,
                singleInstance:true,
                });
            

            let tiempo = HUD.TIME_NOW;
            const timeObj = {tiempo};
                console.log(tiempo);
            this.timeList.push(timeObj.tiempo);
        
            this.timeList.forEach(time =>{
                FinalMetaDialog.TIME_FINISH.push(time);
            });
                        
            sessionStorage.setItem("time", JSON.stringify(FinalMetaDialog.TIME_FINISH));
            
            const metaFinalDialog = new FinalMetaDialog(this.timeList[this.timeList.length-1]);
            metaFinalDialog.position.set(SceneManager.WIDTH * 1/4, SceneManager.HEIGHT * 1/6);
            SceneManager.addScene(metaFinalDialog);
            this.filters = [this.myGodray];
            this.filterArea = new Rectangle(0, 0, SceneManager.WIDTH, SceneManager.HEIGHT);
            GameState.IS_PAUSED = true;
            
        }

        if (bachi.getHitbox().right < 0){
            bachi.destroy();

        }   
    }

    this.bachiAndFlag = this.bachiAndFlag.filter((elem)=> !elem.destroyed);

    
        let mosquito = new MosquitoEnemy();

        if(this.timePassedMosquito > timeMosquito){
                
           this.timePassedMosquito =0;

            
            mosquito.position.set(this.playerNinix.position.x + 1800, Math.random()*470);
                                              
            this.world.addChild(mosquito);
            this.mosquitos.push(mosquito);
        }
            
        for (let mosquito of this.mosquitos) {
            mosquito.speed.x = -GameScene.GAME_SPEED_BASE;
            mosquito.speed.y = 50;

            if(mosquito.position.y > 470){
                
                mosquito.position.y = mosquito.height;
                mosquito.speed.y = Math.abs(mosquito.speed.y) * -1;
                mosquito.update(deltaTime/10);

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
                //this.playerNinix.complain();
                                
            }

            if (mosquito.getHitbox().right < 0){
                mosquito.destroy();

            }
        }
        
        this.mosquitos = this.mosquitos.filter((elem)=> !elem.destroyed);

        if(this.timePassedSnake > timeSnake){
                
            this.timePassedSnake =0;
 
            let snake = new SnakeEnemy();
            snake.position.set(this.playerNinix.position.x + 1700, GameScene.FLOOR_LEVEL - snake.width);
            snake.speed.x = -GameScene.GAME_SPEED_BASE * 10;
        
                                   
            this.world.addChild(snake);
            this.snakes.push(snake);
        }
             
        for (let snake of this.snakes) {
             snake.speed.x = -GameScene.GAME_SPEED_BASE * 1.5;
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
            obstacle.position.set(this.playerNinix.position.x + 1500, GameScene.FLOOR_LEVEL - obstacle.height);
            this.fondoVariable.addChild(obstacle);
            this.obstacles.push(obstacle);
        }
        
        for (let obstacle of this.obstacles){
            //obstacle.speed.x = -GameScene.GAME_SPEED_BASE;
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
            objeto.position.set(this.playerNinix.position.x + 1600, GameScene.FLOOR_LEVEL - objeto.height );                        
                     
            this.fondoVariable.addChild(objeto);
            this.entorno.push(objeto);
            
        }
        
        for (let objeto of this.entorno) {
            //objeto.speed.x = -GameScene.GAME_SPEED_BASE;
            objeto.update(deltaTime/1000);
        }

        this.obstacle.update(deltaTime);
        
        this.obstacles = this.obstacles.filter((elem)=> !elem.destroyed);
        this.entorno = this.entorno.filter((elem)=> !elem.destroyed);


        
        this.world.x = - this.playerNinix.x * this.worldTransform.a + SceneManager.WIDTH/6,5;
        
        //this.background.tilePosition.x -= TickerScene.GAME_SPEED_BASE * deltaTime/1500;
        
        

        //this.world.y = - this.playerNinix.y * this.worldTransform.d + SceneManager.HEIGHT/2;

    }


}