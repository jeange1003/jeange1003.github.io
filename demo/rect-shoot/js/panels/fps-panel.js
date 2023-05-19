import { context } from "../global/context.js";
import { Panel } from "./panel.js";
export class FpsPanel extends Panel {
    constructor(params) {
        super(params);
        this.lastTime = Date.now();
    }
    update() {
        this.render();
        this.lastTime = Date.now();
    }
    render() {
        context.save();
        context.fillStyle = '#dddddd';
        context.fillText(`FPS: ${Math.floor(1000 / (Date.now() - this.lastTime))}`, this.position.x, this.position.y + 16);
        context.restore();
    }
}
