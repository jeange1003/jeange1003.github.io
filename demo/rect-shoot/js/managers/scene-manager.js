import { Scene } from '../scene.js';
import { Rect } from '../objects/rect.js';
import { Position } from '../base-types/position.js';
import { PlayerKeyboardStatus } from '../keyboard/player-keyboard-status.js';
import { canvas } from '../global/canvas.js';
import { Area } from '../base-types/area.js';
import { RewardManager } from '../managers/reward-manager.js';
import { AiRectManager } from '../managers/ai-rect-manager.js';
import { Size } from '../base-types/size.js';
import { Direction } from '../base-types/direction.js';
import { Speed } from '../base-types/speed.js';
import { ScorePanel } from '../panels/score-panel.js';
import { GameData } from '../game-data.js';
import { Settings } from '../settings.js';
import { PlayerPanel } from '../panels/player-panel.js';
import { ImageManager } from '../managers/image-manager.js';
import { SceneStatus } from '../base-types/scene-status.js';
import { context } from '../global/context.js';
import { Viewport } from '../map/viewport.js';
import { GameMap } from '../map/map.js';
import { FpsPanel } from '../panels/fps-panel.js';
export class SceneManager {
    constructor() {
        this.createScene = () => {
            const scene = new Scene();
            this.scenePanel = scene.scenePanel;
            // scene.scenePanel = this.scenePanel
            const area1 = new Area({ x1: -999999, x2: 999999, y1: -999999, y2: 999999 });
            const keyboardStatus1 = new PlayerKeyboardStatus({
                up: 'w',
                down: 's',
                left: 'a',
                right: 'd',
                fire: 'f'
            });
            const keyboardStatus2 = new PlayerKeyboardStatus({
                up: 'ArrowUp',
                down: 'ArrowDown',
                left: 'ArrowLeft',
                right: 'ArrowRight',
                fire: 'm'
            });
            const settings = new Settings({});
            const gameData = new GameData({ settings });
            const imageManager = new ImageManager();
            const viewport = new Viewport({
                center: new Position(0, 0),
                size: new Size(canvas.width, canvas.height)
            });
            const rect1 = new Rect({
                name: 'Player1',
                scene: scene,
                position: new Position(0, canvas.height / 3),
                direction: new Direction(1, 0),
                size: new Size(40, 40),
                keyboardStatus: keyboardStatus1,
                color: '#bbbbff',
                speed: new Speed(5, 5),
                hp: 100,
                maxHp: 100,
                damage: 20,
                shootSpeed: 2,
                restrictToArea: area1,
                bulletSpeed: 5,
                gameData,
                viewport: viewport
            });
            const rect2 = new Rect({
                name: 'Player2',
                scene: scene,
                position: new Position(0, canvas.height / 3 * 2),
                direction: new Direction(1, 0),
                size: new Size(40, 40),
                keyboardStatus: keyboardStatus2,
                color: '#ffbbbb',
                speed: new Speed(5, 5),
                hp: 100,
                maxHp: 100,
                damage: 20,
                shootSpeed: 2,
                restrictToArea: area1,
                bulletSpeed: 5,
                gameData,
                viewport
            });
            viewport.setPlayer1Rect(rect1);
            viewport.setPlayer2Rect(rect2);
            viewport.setPlayerRects([rect1, rect2]);
            const rewardManager = new RewardManager({ scene, rects: [rect1, rect2], gameData, settings, imageManager, viewport });
            const aiRectManager = new AiRectManager({ scene, playerRects: [rect1, rect2], gameData, viewport });
            const scorePanel = new ScorePanel({ gameData, position: new Position(canvas.width / 2 - 48, 16) });
            const player1Panel = new PlayerPanel({ rect: rect1, position: new Position(10, 16), imageManager });
            const player2Panel = new PlayerPanel({ rect: rect2, position: new Position(canvas.width / 4, 16), imageManager });
            const fpsPanel = new FpsPanel({ position: new Position(canvas.width - 100, 16) });
            const gameMap = new GameMap({ viewport });
            scene.addObject(rect1);
            scene.addObject(rect2);
            scene.addManager(aiRectManager);
            scene.addManager(rewardManager);
            scene.addPanel(scorePanel);
            scene.addPanel(player1Panel);
            scene.addPanel(player2Panel);
            scene.addPanel(fpsPanel);
            scene.setViewport(viewport);
            scene.setGameMap(gameMap);
            scene.start();
            const onPlayerDead = () => {
                if (rect1.isDead && rect2.isDead) {
                    scene.status = SceneStatus.Gameover;
                    scene.dispose();
                    keyboardStatus1.dispose();
                    keyboardStatus2.dispose();
                    document.addEventListener('keydown', this.onKeyDown);
                }
            };
            rect1.onDead(onPlayerDead.bind(this));
            rect2.onDead(onPlayerDead.bind(this));
        };
        this.onKeyDown = (e) => {
            if (e.code === 'Space') {
                context.clearRect(0, 0, canvas.width, canvas.height);
                this.createScene();
                document.removeEventListener('keydown', this.onKeyDown);
            }
        };
    }
}
