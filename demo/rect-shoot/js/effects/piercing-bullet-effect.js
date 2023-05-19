import { RewardType } from "../base-types/reward-type.js";
import { BulletEffect } from "./bullet-effect.js";
export class PiercingBulletEffect extends BulletEffect {
    get name() {
        return RewardType.Piercing;
    }
    applyEffect(bullets) {
        const result = bullets.map(bullet => {
            bullet.meta.set('life', 2);
            bullet.addCustomHurtEnemy(function (enemy) {
                enemy.hurt(this.damage);
                this.enemies = this.enemies.filter(e => e !== enemy);
                const life = this.meta.get('life');
                this.meta.set('life', life - 1);
                if (life - 1 <= 0) {
                    this.isDead = true;
                }
                return false;
            });
            return bullet;
        });
        return result;
    }
}
