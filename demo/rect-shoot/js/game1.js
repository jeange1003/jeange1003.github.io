"use strict";
// import { Scene } from './scene.js'
// import { Rect } from './objects/rect.js'
// import { Position } from './base-types/position.js'
// import { PlayerKeyboardStatus } from './keyboard/player-keyboard-status.js'
// import { canvas } from './global/canvas.js'
// import { Area } from './base-types/area.js'
// import { RewardManager } from './managers/reward-manager.js'
// import { Direction } from './base-types/direction.js'
// import { Size } from './base-types/size.js'
// import { Speed } from './base-types/speed.js'
// const scene = new Scene()
// const area1 = new Area({ x1: 0, x2: canvas.width / 3 * 2, y1: 0, y2: canvas.height })
// const area2 = new Area({ x1: canvas.width / 3, x2: canvas.width, y1: 0, y2: canvas.height })
// const keyboardStatus1 = new PlayerKeyboardStatus({
//   up: 'w',
//   down: 's',
//   left: 'a',
//   right: 'd',
//   fire: 'f'
// })
// const keyboardStatus2 = new PlayerKeyboardStatus({
//   up: 'ArrowUp',
//   down: 'ArrowDown',
//   left: 'ArrowLeft',
//   right: 'ArrowRight',
//   fire: 'm'
// })
// const rect1 = new Rect({
//   scene: scene,
//   position: new Position(100, canvas.height / 3),
//   direction: new Direction(1, 0),
//   keyboardStatus: keyboardStatus1,
//   color: 'gray',
//   speed: new Speed(10, 10),
//   size: new Size(100, 100),
//   hp: 100,
//   maxHp: 100,
//   damage: 20,
//   shootSpeed: 2,
//   restrictToArea: area1,
//   bulletSpeed: 15
// })
// const rect2 = new Rect({
//   scene: scene,
//   position: new Position(canvas.width - 100, canvas.height / 2),
//   direction: new Direction(-1, 0),
//   keyboardStatus: keyboardStatus2,
//   color: 'blue',
//   speed: new Speed(10, 10),
//   size: new Size(100, 100),
//   hp: 100,
//   maxHp: 100,
//   damage: 40,
//   shootSpeed: 1,
//   restrictToArea: area2,
//   bulletSpeed: 15
// })
// rect1.addEnemy(rect2)
// rect2.addEnemy(rect1)
// scene.addObject(rect1)
// scene.addObject(rect2)
// new RewardManager({ scene, rects: [rect1, rect2], gameData })
// scene.start()
