import { KeyboardStatus } from './keyboard-status.js';
export class AiKeyboardStatus extends KeyboardStatus {
    constructor(params) {
        super();
        this.fire = false;
        this.horizen = '';
        this.pressLength = 0;
        this.vertical = '';
        this.pressLength = Math.random() * 60 * 5;
        this.playerRects = params.playerRects;
        this.targetRect = params.playerRects[Math.floor(Math.random() * params.playerRects.length)];
        setInterval(() => {
            this.updateTargetRect();
            this.resetVerticalButton();
            this.resetHorizeonButton();
            this.resetFireButton();
        }, 300);
    }
    updateTargetRect() {
        const aliveRects = this.playerRects.filter(rect => !rect.isDead);
        if (aliveRects.length === 0 || !this.controlledRect) {
            return;
        }
        let nearestDistance = Infinity;
        let nearestRect = aliveRects[0];
        for (let rect of aliveRects) {
            const distance = rect.position.distance(this.controlledRect.position);
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestRect = rect;
            }
        }
        this.targetRect = nearestRect;
    }
    resetVerticalButton() {
        if (!this.controlledRect) {
            return;
        }
        const yDiff = this.targetRect.position.y - this.controlledRect.position.y;
        if (yDiff > 0) {
            this.vertical = 'down';
        }
        else if (yDiff < 0) {
            this.vertical = 'up';
        }
        else {
            this.vertical = '';
        }
        // const random = Math.random()
        // this.vertical = random < 0.3 ? 'up' : random > 0.7 ? 'down' : ''
    }
    resetHorizeonButton() {
        if (!this.controlledRect) {
            return;
        }
        const xDiff = this.targetRect.position.x - this.controlledRect.position.x;
        if (xDiff > 0) {
            this.horizen = 'right';
        }
        else if (xDiff < 0) {
            this.horizen = 'left';
        }
        else {
            this.horizen = '';
        }
        // const random = Math.random()
        // this.horizen = random < 0.3 ? 'left' : random > 0.7 ? 'right' : ''
    }
    resetFireButton() {
        this.fire = false;
        // const random = Math.random()
        // this.fire =  random > 0.9
    }
    controlTarget(rect) {
        this.controlledRect = rect;
    }
    get isUpPressed() {
        return this.vertical === 'up';
    }
    get isDownPressed() {
        return this.vertical === 'down';
    }
    get isLeftPressed() {
        return this.horizen === 'left';
    }
    get isRightPressed() {
        return this.horizen === 'right';
    }
    get isFirePressed() {
        return this.fire;
    }
}
