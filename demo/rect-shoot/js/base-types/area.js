export class Area {
    constructor(params) {
        this.x1 = params.x1;
        this.x2 = params.x2;
        this.y1 = params.y1;
        this.y2 = params.y2;
    }
    isInArea(position) {
        return position.x > this.x1 && position.x < this.x2 && position.y > this.y1 && position.y < this.y2;
    }
}
