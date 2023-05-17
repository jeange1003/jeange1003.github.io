import { Vector2 } from "./vector2.js";
export class Speed extends Vector2 {
    clone() {
        return new Speed(this.x, this.y);
    }
}
