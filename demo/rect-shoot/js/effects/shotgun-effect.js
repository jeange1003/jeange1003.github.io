import { RewardType } from "../base-types/reward-type.js";
import { clone } from "../utils/clone.js";
import { BulletEffect } from "./bullet-effect.js";
export class ShotgunEffect extends BulletEffect {
    get name() {
        return RewardType.Shotgun;
    }
    applyEffect(bullets) {
        const newBullet1 = clone(bullets[0]);
        newBullet1.position = bullets[0].position.clone().translate(0, 4);
        newBullet1.direction = bullets[0].direction.clone().rotateByDegree(13);
        newBullet1.speed = bullets[0].speed.clone().rotateByDegree(13);
        const lastBullet = bullets[bullets.length - 1];
        const newBullet2 = clone(lastBullet);
        newBullet2.position = lastBullet.position.clone().translate(0, -4);
        newBullet2.direction = lastBullet.direction.clone().rotateByDegree(-13);
        newBullet2.speed = lastBullet.speed.clone().rotateByDegree(-13);
        return [newBullet1, ...bullets, newBullet2];
    }
}
