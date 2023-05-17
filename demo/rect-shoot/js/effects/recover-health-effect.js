import { RewardType } from "../base-types/reward-type.js";
import { ImmediateEffect } from "./immediate-effect.js";
export class RecoverHealthEffect extends ImmediateEffect {
    get name() {
        return RewardType.Health;
    }
    applyEffect(rect) {
        const newHp = rect.hp += 50;
        rect.hp = newHp > rect.maxHp ? rect.maxHp : newHp;
    }
}
