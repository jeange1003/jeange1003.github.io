import { SceneStatus } from "../base-types/scene-status.js";
import { context } from "../global/context.js";
import { Panel } from "./panel.js";
export class ScenePanel extends Panel {
    constructor(params) {
        super(params);
        this.scene = params.scene;
    }
    update() {
        this.render();
    }
    render() {
        context.save();
        context.fillStyle = 'red';
        context.font = '60px Arial';
        switch (this.scene?.status) {
            case SceneStatus.BeforeStart:
                context.fillText(`Press Space To Start`, this.position.x, this.position.y);
                break;
            case SceneStatus.Gameover:
                context.fillText(`Game Over`, this.position.x, this.position.y);
                break;
            case SceneStatus.Pause:
                context.fillText(`Paused`, this.position.x, this.position.y);
                break;
        }
        context.restore();
    }
}
