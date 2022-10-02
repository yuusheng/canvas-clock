export function initCanvas(
  canvas: HTMLCanvasElement,
  canvasSize: { width: number; height: number },
) {
  const { width: w, height: h } = canvasSize
  const ratio = window.devicePixelRatio

  canvas.width = w * ratio
  canvas.height = h * ratio
  canvas.style.width = `${w}px`
  canvas.style.height = `${h}px`
  return canvas.getContext('2d')
}
