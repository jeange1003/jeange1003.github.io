import { AttributeType } from "../base-types/attribute-type.js";
import { RewardType } from "../base-types/reward-type.js";
import { BuffEffect } from "./buff-effect.js";
export class PowerUpEffect extends BuffEffect {
    get name() {
        return RewardType.PowerUp;
    }
    applyEffect(type, attribute) {
        switch (type) {
            case AttributeType.Damage:
                return attribute * 2;
            default:
                return attribute;
        }
    }
}
