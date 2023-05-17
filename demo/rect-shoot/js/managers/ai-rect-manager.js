import { AiKeyboardStatus } from '../keyboard/ai-keyboard-status.js';
import { canvas } from '../global/canvas.js';
import { Area } from '../base-types/area.js';
import { Rect } from '../objects/rect.js';
import { Position } from '../base-types/position.js';
import { Manager } from './manager.js';
import { Size } from '../base-types/size.js';
import { Direction } from '../base-types/direction.js';
import { Speed } from '../base-types/speed.js';
class AiRectManager extends Manager {
    constructor(params) {
        super();
        this.scene = params.scene;
        this.playerRects = params.playerRects;
        this.cooldown = AiRectManager.GenerateInterval;
        this.gameData = params.gameData;
    }
    update() {
        this.cooldown--;
        if (this.cooldown <= 0) {
            this.generateAi();
            this.cooldown = AiRectManager.GenerateInterval;
        }
    }
    generateAi() {
        const area = new Area({ x1: 100, x2: canvas.width, y1: 0, y2: canvas.height });
        const aiRect = new Rect({
            name: 'AI',
            scene: this.scene,
            position: new Position(canvas.width * 2 / 3 + Math.floor(Math.random() * canvas.width / 3), Math.floor(canvas.height * Math.random())),
            size: new Size(50, 50),
            direction: new Direction(-1, 0),
            keyboardStatus: new AiKeyboardStatus(),
            color: 'gray',
            speed: new Speed(2, 2),
            hp: 40 * (1 + this.gameData.level * 0.5),
            maxHp: 40 * (1 + this.gameData.level * 0.5),
            damage: 20,
            shootSpeed: 2,
            bulletSpeed: (3 + this.gameData.level > 15) ? 15 : 3 + this.gameData.level,
            restrictToArea: area,
            gameData: this.gameData
        });
        aiRect.onDead((rect) => {
            this.gameData.addScore(Math.pow(rect.level, 2));
        });
        for (let rect of this.playerRects) {
            rect.addEnemy(aiRect);
            aiRect.addEnemy(rect);
        }
        this.scene.addObject(aiRect);
    }
}
AiRectManager.GenerateInterval = 60; // frame
export { AiRectManager };
