import { AttributeType } from '../base-types/attribute-type.js';
import { Direction } from '../base-types/direction.js';
import { Position } from '../base-types/position.js';
import { Speed } from '../base-types/speed.js';
import { context } from '../global/context.js';
import { BaseObject } from './base-object.js';
import { Bullet } from './bullet.js';
class Rect extends BaseObject {
    constructor(params) {
        super({
            scene: params.scene,
            position: params.position,
            size: params.size,
            direction: params.direction
        });
        this.isDead = false;
        this.buffEffects = [];
        this.bulletEffects = [];
        this.onDeadCallbacks = [];
        this.gameData = params.gameData;
        this.name = params.name;
        this.keyboardStatus = params.keyboardStatus;
        this.color = params.color;
        this.speed = params.speed;
        this.cooldown = 0;
        this.hp = params.hp;
        this.maxHp = params.maxHp;
        this.damage = params.damage;
        this.shootSpeed = params.shootSpeed;
        this.restrictToArea = params.restrictToArea;
        this.enemys = params.enemys || [];
        this.bulletSpeed = params.bulletSpeed;
        this.level = params.gameData.level;
    }
    get speed() {
        return this.applyBuffEffect(AttributeType.Speed, this._speed);
    }
    set speed(value) {
        this._speed = value;
    }
    get damage() {
        return this.applyBuffEffect(AttributeType.Damage, this._damage);
    }
    set damage(value) {
        this._damage = value;
    }
    get shootSpeed() {
        return this.applyBuffEffect(AttributeType.ShootSpeed, this._shootSpeed);
    }
    set shootSpeed(value) {
        this._shootSpeed = value;
    }
    addBuffEffect(effect) {
        this.buffEffects.push(effect);
    }
    removeBuffEffect(effect) {
        this.buffEffects = this.buffEffects.filter(e => e !== effect);
    }
    applyBuffEffect(attributeType, attribute) {
        if (this.buffEffects.length) {
            let _attribute = attribute;
            for (let effect of this.buffEffects) {
                _attribute = effect.applyEffect(attributeType, _attribute);
            }
            return _attribute;
        }
        return attribute;
    }
    addBulletEffect(effect) {
        this.bulletEffects.push(effect);
    }
    removeBulletEffect(effect) {
        this.bulletEffects = this.bulletEffects.filter(e => e !== effect);
    }
    applyBulletEffect(originBullet) {
        let afterEffectBullet = [originBullet];
        for (let effect of this.bulletEffects) {
            afterEffectBullet = effect.applyEffect(afterEffectBullet);
        }
        return afterEffectBullet;
    }
    update() {
        this.changePosition();
        this.shadeEffect();
        this.render();
    }
    render() {
        this.renderSelf();
        this.renderHp();
    }
    changePosition() {
        const newPosition = this.position.clone();
        if (this.keyboardStatus.isLeftPressed) {
            newPosition.x = this.position.x - this.speed.x;
        }
        else if (this.keyboardStatus.isRightPressed) {
            newPosition.x = this.position.x + this.speed.x;
        }
        if (this.keyboardStatus.isUpPressed) {
            newPosition.y = this.position.y - this.speed.y;
        }
        else if (this.keyboardStatus.isDownPressed) {
            newPosition.y = this.position.y + this.speed.y;
        }
        if (this.restrictToArea.isInArea(newPosition)) {
            this.position = newPosition;
        }
        if (this.cooldown > 0) {
            this.cooldown--;
        }
        if (this.keyboardStatus.isFirePressed && this.cooldown <= 0) {
            this.fire();
            this.cooldown = Math.floor(60 / this.shootSpeed);
        }
    }
    shadeEffect() {
        const effects = [...this.buffEffects, ...this.bulletEffects];
        for (let effect of effects) {
            effect.remainTime = Math.floor(effect.remainTime - 1);
        }
        this.buffEffects = this.buffEffects.filter(effect => effect.remainTime > 0);
        this.bulletEffects = this.bulletEffects.filter(effect => effect.remainTime > 0);
    }
    fire() {
        const originBullet = new Bullet({
            scene: this.scene,
            position: new Position(this.position.x + this.direction.x * this.size.width + this.direction.x * 20, this.position.y + this.direction.y * this.size.height + this.direction.y * 20),
            direction: new Direction(this.direction.x, this.direction.y),
            speed: new Speed(this.direction.x * this.bulletSpeed, this.direction.y * this.bulletSpeed),
            color: this.color,
            enemys: this.enemys,
            damage: this.damage,
            force: 15
        });
        let afterEffectBullets = this.applyBulletEffect(originBullet);
        for (let bullet of afterEffectBullets) {
            this.scene.addObject(bullet);
        }
    }
    renderSelf() {
        context.beginPath();
        context.lineWidth = 0;
        context.strokeStyle = 'red';
        context.fillStyle = this.color;
        context.rect(this.position.x - this.size.width / 2, this.position.y - this.size.height / 2, this.size.width, this.size.height);
        context.fill();
    }
    renderHp() {
        context.beginPath();
        context.lineWidth = 0;
        context.strokeStyle = 'green';
        context.fillStyle = this.color;
        context.rect(this.position.x - this.size.width / 2, this.position.y - this.size.height / 2 - 15, this.size.width * (this.hp / this.maxHp), 5);
        context.fill();
    }
    addEnemy(enemy) {
        this.enemys.push(enemy);
    }
    removeEnemy(enemy) {
        this.enemys = this.enemys.filter((e) => e !== enemy);
    }
    hurt(damage) {
        if (this.isDead) {
            return;
        }
        this.hp -= damage;
        if (this.hp <= 0) {
            this.dead();
            this.enemys.forEach((e) => e.removeEnemy(this));
        }
    }
    onDead(callback) {
        this.onDeadCallbacks.push(callback);
    }
    dead() {
        this.isDead = true;
        for (let callback of this.onDeadCallbacks) {
            callback(this);
        }
    }
}
Rect.MaxSpeed = new Speed(15, 15);
export { Rect };
