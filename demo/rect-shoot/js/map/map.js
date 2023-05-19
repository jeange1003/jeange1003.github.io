import { canvas } from "../global/canvas.js";
import { context } from "../global/context.js";
export class GameMap {
    constructor(params) {
        this.viewport = params.viewport;
        const img = new Image();
        // img.src = "assets/images/map/background-2.png";
        img.src = "assets/images/map/background.jpg";
        // Only use the image after it's loaded
        img.onload = () => {
            const pattern = context.createPattern(img, "repeat");
            this.pattern = pattern;
        };
        // for (let x = -1000; x <= 1000; x++) {
        //   const column: string[] = []
        //   this.tileMap.push(column)
        //   for (let y = -1000; y <= 1000; y++) {
        //     column.push()
        //   }
        // }
    }
    update() {
        this.render();
    }
    render() {
        if (!this.pattern) {
            return;
        }
        context.save();
        context.beginPath();
        // https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix/DOMMatrix
        const translateX = -(this.viewport.center.x);
        const translateY = -(this.viewport.center.y);
        const scale = 1 / this.viewport.scale;
        // const angle = 0;
        let domMatrix = new DOMMatrix();
        // I don't known how is it going, just AI told me to do this.
        domMatrix = domMatrix.translate(this.viewport.originSize.width / 2, this.viewport.originSize.height / 2);
        domMatrix = domMatrix.scale(scale);
        domMatrix = domMatrix.translate(translateX, translateY);
        this.pattern.setTransform(domMatrix);
        // this.pattern.setTransform(new DOMMatrix(
        //   [
        //     Math.cos(angle) * scale,
        //     Math.sin(angle) * scale,
        //     -Math.sin(angle) * scale,
        //     Math.cos(angle) * scale,
        //     translateX,
        //     translateY
        //   ]
        // ))
        context.fillStyle = this.pattern;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore();
    }
}
