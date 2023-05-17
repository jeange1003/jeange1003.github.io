import { BaseEffect } from "./base-effect.js";
export class BulletEffect extends BaseEffect {
    constructor(params) {
        super();
        this.remainTime = params.remainTime;
    }
}
