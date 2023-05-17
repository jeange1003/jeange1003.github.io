import { AttributeType } from "../base-types/attribute-type.js";
import { BuffEffect } from "./buff-effect.js";
import { RewardType } from "../base-types/reward-type.js";
export class FastShootEffect extends BuffEffect {
    get name() {
        return RewardType.FastShoot;
    }
    applyEffect(type, attribute) {
        switch (type) {
            case AttributeType.ShootSpeed:
                return attribute * 2;
            default:
                return attribute;
        }
    }
}
