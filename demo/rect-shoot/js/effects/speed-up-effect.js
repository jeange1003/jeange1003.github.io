import { AttributeType } from "../base-types/attribute-type.js";
import { RewardType } from "../base-types/reward-type.js";
import { Speed } from "../base-types/speed.js";
import { Rect } from "../objects/rect.js";
import { BuffEffect } from "./buff-effect.js";
export class SpeedUpEffect extends BuffEffect {
    get name() {
        return RewardType.SpeedUp;
    }
    applyEffect(type, attribute) {
        switch (type) {
            case AttributeType.Speed:
                let x = attribute.x + 5;
                if (x > Rect.MaxSpeed.x) {
                    x = Rect.MaxSpeed.x;
                }
                let y = attribute.y + 5;
                if (y > Rect.MaxSpeed.y) {
                    y = Rect.MaxSpeed.y;
                }
                return new Speed(x, y);
            default:
                return attribute;
        }
    }
}
