import { Vector2 } from "./vector2.js";
export class Direction extends Vector2 {
    clone() {
        return new Direction(this.x, this.y);
    }
}
