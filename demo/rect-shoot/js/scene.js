import { canvas } from './global/canvas.js';
import { context } from './global/context.js';
import { SceneStatus } from './base-types/scene-status.js';
import { ScenePanel } from './panels/scene-panel.js';
import { Position } from './base-types/position.js';
export class Scene {
    constructor() {
        this.objects = [];
        this.managers = [];
        this.panels = [];
        this.status = SceneStatus.BeforeStart;
        this.scenePanel = new ScenePanel({ scene: this, position: new Position(canvas.width / 2 - 300, canvas.height / 2) });
        this.requestId = 0;
        this.render = () => {
            if (this.status !== SceneStatus.Running) {
                this.scenePanel.render();
                return;
            }
            context.clearRect(0, 0, canvas.width, canvas.height);
            for (let manager of this.managers) {
                manager.update();
            }
            this.viewport.update();
            this.gameMap.update();
            for (let i = this.objects.length - 1; i >= 0; i--) {
                const obj = this.objects[i];
                obj.update();
            }
            for (let i = this.objects.length - 1; i >= 0; i--) {
                const obj = this.objects[i];
                if (obj.isDead) {
                    this.removeObject(obj);
                }
            }
            for (let panel of this.panels) {
                panel.update();
            }
            this.requestId = requestAnimationFrame(this.render);
        };
        this.onStart = (e) => {
            this.render();
            if (e.code === 'Space') {
                this.status = SceneStatus.Running;
                this.render();
                document.removeEventListener('keydown', this.onStart);
            }
        };
        this.onVisibilityChange = () => {
            if (document.hidden) {
                this.status = SceneStatus.Pause;
            }
            else {
                this.status = SceneStatus.Running;
            }
        };
    }
    start() {
        this.scenePanel.render();
        document.addEventListener('keydown', this.onStart);
        document.addEventListener('visibilitychange', this.onVisibilityChange, false);
    }
    addObject(obj) {
        this.objects.push(obj);
    }
    removeObject(obj) {
        this.objects.splice(this.objects.indexOf(obj), 1);
    }
    addManager(manager) {
        this.managers.push(manager);
    }
    addPanel(panel) {
        this.panels.push(panel);
    }
    setScenePanel(scenePanel) {
        this.scenePanel = scenePanel;
    }
    setViewport(viewport) {
        this.viewport = viewport;
    }
    setGameMap(gameMap) {
        this.gameMap = gameMap;
    }
    dispose() {
        document.removeEventListener('keydown', this.onStart);
        document.removeEventListener('visibilitychange', this.onVisibilityChange, false);
        cancelAnimationFrame(this.requestId);
    }
}
