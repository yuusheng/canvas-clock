import { canvasSize } from './globalVar'
import { initCanvas, drawClock } from './components/canvas/index'
import { onTime, countDown } from './components/timer/index'
const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const ctx = initCanvas(canvas, canvasSize.width, canvasSize.height)

onTime(ctx, drawClock)

let countTime = 25
// countDown(ctx, countTime, drawClock)
