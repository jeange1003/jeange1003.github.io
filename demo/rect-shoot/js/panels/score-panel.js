import { context } from "../global/context.js";
import { Panel } from "./panel.js";
export class ScorePanel extends Panel {
    constructor(params) {
        super(params);
        this.gameData = params.gameData;
    }
    update() {
        this.render();
    }
    render() {
        context.save();
        context.fillStyle = '#dddddd';
        context.font = '16px Arial';
        context.fillText(`Score: ${this.gameData.score}`, this.position.x, this.position.y);
        context.fillText(`Level: ${this.gameData.level}`, this.position.x, this.position.y + 16);
        context.restore();
    }
}
