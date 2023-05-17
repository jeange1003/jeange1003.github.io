import { KeyboardStatus } from './keyboard-status.js';
export class AiKeyboardStatus extends KeyboardStatus {
    constructor() {
        super();
        this.fire = false;
        this.horizen = '';
        this.pressLength = 0;
        this.vertical = '';
        this.pressLength = Math.random() * 60 * 5;
        setInterval(() => {
            this.resetVerticalButton();
            this.resetHorizeonButton();
            this.resetFireButton();
        }, 1000);
    }
    resetVerticalButton() {
        const random = Math.random();
        this.vertical = random < 0.3 ? 'up' : random > 0.7 ? 'down' : '';
    }
    resetHorizeonButton() {
        const random = Math.random();
        this.horizen = random < 0.3 ? 'left' : random > 0.7 ? 'right' : '';
    }
    resetFireButton() {
        const random = Math.random();
        this.fire = random > 0.9;
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
