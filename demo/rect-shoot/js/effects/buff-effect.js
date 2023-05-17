import { BaseEffect } from "./base-effect.js";
export class BuffEffect extends BaseEffect {
    constructor(params) {
        super();
        this.remainTime = params.remainTime;
    }
}
