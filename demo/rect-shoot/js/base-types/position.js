import { Vector2 } from "./vector2.js";
export class Position extends Vector2 {
    clone() {
        return new Position(this.x, this.y);
    }
}
