import { context } from '../global/context.js';
import { BaseObject } from './base-object.js';
import { Size } from '../base-types/size.js';
export class Bullet extends BaseObject {
    constructor(params) {
        super({
            scene: params.scene,
            position: params.position,
            size: new Size(params.damage, Math.floor(params.damage / 6)),
            direction: params.direction,
            viewport: params.viewport
        });
        this.isDead = false;
        this.borderBufferLength = 100;
        this.customUpdateFunctions = [];
        this.customHurtEnemyFunctions = [];
        this.speed = params.speed;
        this.color = params.color;
        this.enemies = params.enemys;
        this.damage = params.damage;
        this.belongToRect = params.belongToRect;
        if (isNaN(params.force)) {
            throw new Error('invalid force');
        }
        this.force = params.force;
        this.meta = new Map();
    }
    update() {
        let customResult = true;
        if (this.customUpdateFunctions.length > 0) {
            for (let func of this.customUpdateFunctions) {
                customResult = customResult && func.apply(this);
                if (!customResult) {
                    return;
                }
            }
        }
        this.speed.x += this.direction.x * this.force / 60;
        this.speed.y += this.direction.y * this.force / 60;
        if (isNaN(this.position.x)) {
            throw new Error('invalid position');
        }
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        if (this.isOutOfView()) {
            this.isDead = true;
            return;
        }
        const enemy = this.checkCollision();
        if (enemy) {
            this.hurtEnemy(enemy);
        }
        this.render();
    }
    render() {
        context.save();
        context.beginPath();
        context.lineWidth = 0;
        context.strokeStyle = 'red';
        context.fillStyle = this.color;
        const relativePosition = this.viewport.getPositionInViewport(this.position);
        const scale = 1 / this.viewport.scale;
        context.scale(scale, scale);
        context.translate(relativePosition.x, relativePosition.y);
        context.rotate(this.speed.radian);
        context.rect(-this.size.width / 2, -this.size.height / 2, this.size.width, this.size.height);
        context.fill();
        context.restore();
    }
    isOutOfView() {
        return this.viewport.isObjectOutOfViewport(this);
        // return this.position.x > this.viewport.center.x + canvas.width / 2 + this.borderBufferLength
        //   || this.position.x < this.viewport.center.x - canvas.width / 2 - this.borderBufferLength
        //   || this.position.y > this.viewport.center.y + canvas.height / 2 + this.borderBufferLength
        //   || this.position.y < this.viewport.center.y - canvas.height / 2 - this.borderBufferLength
    }
    checkCollision() {
        for (let enemy of this.enemies) {
            if (!enemy.isDead
                && this.position.x > enemy.position.x - enemy.size.width
                && this.position.x < enemy.position.x + enemy.size.width
                && this.position.y > enemy.position.y - enemy.size.height
                && this.position.y < enemy.position.y + enemy.size.height) {
                return enemy;
            }
        }
    }
    hurtEnemy(enemy) {
        let customResult = true;
        if (this.customHurtEnemyFunctions.length > 0) {
            for (let func of this.customHurtEnemyFunctions) {
                customResult = customResult && func.call(this, enemy);
                if (!customResult) {
                    return;
                }
            }
        }
        enemy.hurt(this.damage);
        this.isDead = true;
    }
    /**
     *
     * @param func A funtion to be execute before update, return value to indicate whether to execute original update function or next update function, true for execution, false for skipping.
     */
    addCustomUpdate(func) {
        this.customUpdateFunctions.push(func);
    }
    /**
     *
     * @param func Same as addCustomUpdate
     */
    addCustomHurtEnemy(func) {
        this.customHurtEnemyFunctions.push(func);
    }
}
