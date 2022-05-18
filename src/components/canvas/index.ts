import { drawClock } from './draw'

export interface ICanvasSize {
  width: number
  height: number
}

export function initCanvas(canvas: HTMLCanvasElement, w: number, h: number) {
  const ratio = window.devicePixelRatio
  canvas.width = w * ratio
  canvas.height = h * ratio
  canvas.style.width = `${w}px`
  canvas.style.height = `${h}px`
  return canvas.getContext('2d')
}

export { drawClock }
