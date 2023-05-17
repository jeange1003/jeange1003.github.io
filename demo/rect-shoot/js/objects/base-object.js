export class BaseObject {
    constructor(params) {
        this.isDead = false;
        this.scene = params.scene;
        this.position = params.position;
        this.size = params.size;
        this.direction = params.direction;
    }
}
