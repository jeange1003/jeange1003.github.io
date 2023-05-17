import { KeyboardStatus } from './keyboard-status.js';
export class PlayerKeyboardStatus extends KeyboardStatus {
    constructor(keys) {
        super();
        this.pressedKeys = [];
        this.onKeyDown = (e) => {
            if (!this.pressedKeys.includes(e.key)) {
                this.pressedKeys.push(e.key);
            }
        };
        this.onKeyUp = (e) => {
            if (this.pressedKeys.includes(e.key)) {
                this.pressedKeys = this.pressedKeys.slice(0, this.pressedKeys.indexOf(e.key)).concat(this.pressedKeys.slice(this.pressedKeys.indexOf(e.key) + 1, this.pressedKeys.length));
            }
        };
        this.keys = keys;
        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('keyup', this.onKeyUp);
    }
    get isUpPressed() {
        return this.pressedKeys.includes(this.keys.up);
    }
    get isDownPressed() {
        return this.pressedKeys.includes(this.keys.down);
    }
    get isLeftPressed() {
        return this.pressedKeys.includes(this.keys.left);
    }
    get isRightPressed() {
        return this.pressedKeys.includes(this.keys.right);
    }
    get isFirePressed() {
        return true;
    }
    dispose() {
        document.removeEventListener('keydown', this.onKeyDown);
        document.removeEventListener('keyup', this.onKeyUp);
    }
}
