import { Position } from "../base-types/position.js";
import { Size } from "../base-types/size.js";
export class Viewport {
    constructor(params) {
        this.scale = 1;
        this.playerRects = [];
        this.center = params.center;
        this.originSize = params.size;
    }
    get size() {
        return new Size(this.originSize.width * this.scale, this.originSize.height * this.scale);
    }
    isObjectOutOfViewport(object) {
        const halfWidth = this.originSize.width / 2;
        const halfHeight = this.originSize.height / 2;
        return object.position.x < this.center.x - halfWidth * this.scale
            || object.position.y < this.center.y - halfHeight * this.scale
            || object.position.x > this.center.x + halfWidth * this.scale
            || object.position.y > this.center.y + halfHeight * this.scale;
    }
    getPositionInViewport(position) {
        return new Position((position.x - (this.center.x - this.originSize.width * this.scale / 2)), (position.y - (this.center.y - this.originSize.height * this.scale / 2)));
    }
    setPlayer1Rect(rect) {
        this.player1Rect = rect;
    }
    setPlayer2Rect(rect) {
        this.player2Rect = rect;
    }
    setPlayerRects(rects) {
        this.playerRects = rects;
    }
    getCenterOfPlayers() {
        const alivePlayerRects = this.playerRects.filter(rect => !rect.isDead);
        if (alivePlayerRects.length === 0) {
            return this.center;
        }
        const x = alivePlayerRects.reduce((prev, cur) => {
            return prev + cur.position.x;
        }, 0) / alivePlayerRects.length;
        const y = alivePlayerRects.reduce((prev, cur) => {
            return prev + cur.position.y;
        }, 0) / alivePlayerRects.length;
        return new Position(x, y);
        // if (!this.player1Rect || !this.player2Rect) {
        //   return this.center
        // }
        // const position1 = this.player1Rect.position
        // const position2 = this.player2Rect.position
        // return new Position((position1.x + position2.x) / 2, (position1.y + position2.y) / 2)
    }
    getDiffDirectionOfPlayers() {
        if (!this.player1Rect || !this.player2Rect) {
            return this.center;
        }
        const position1 = this.player1Rect.position;
        const position2 = this.player2Rect.position;
        return position1.substract(position2);
    }
    setScale() {
        const aliveRects = this.playerRects.filter(rect => !rect.isDead);
        if (aliveRects.length <= 1) {
            this.scale = 1;
            return;
        }
        let maxX = this.playerRects.reduce((prev, cur) => cur.position.x > prev ? cur.position.x : prev, 0);
        let minX = this.playerRects.reduce((prev, cur) => cur.position.x < prev ? cur.position.x : prev, 0);
        let maxY = this.playerRects.reduce((prev, cur) => cur.position.y > prev ? cur.position.y : prev, 0);
        let minY = this.playerRects.reduce((prev, cur) => cur.position.y < prev ? cur.position.y : prev, 0);
        let widthScale = (maxX - minX) / (this.originSize.width - 200);
        let heightScale = (maxY - minY) / (this.originSize.height - 200);
        // let widthScale = Math.abs(diffDirection.x) / (this.originSize.width - 200)
        // let heightScale = Math.abs(diffDirection.y) / (this.originSize.height - 200)
        widthScale = widthScale > 1 ? widthScale : 1;
        heightScale = heightScale > 1 ? heightScale : 1;
        this.scale = widthScale > heightScale ? widthScale : heightScale;
    }
    update() {
        this.center = this.getCenterOfPlayers();
        this.setScale();
    }
}
