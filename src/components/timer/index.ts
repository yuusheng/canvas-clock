export let timer: NodeJS.Timer

export function onTime(
  ctx: CanvasRenderingContext2D,
  drawClock: (ctx: CanvasRenderingContext2D, min: number, sec: number) => void
) {
  let time = new Date()
  let min = time.getMinutes()
  let sec = time.getSeconds()

  drawClock(ctx, min, sec)
  timer = setTimeout(() => onTime(ctx, drawClock), 1000)
}

export function countDown(
  ctx: CanvasRenderingContext2D,
  countTime: number,
  drawClock: (ctx: CanvasRenderingContext2D, min: number, sec: number) => void
) {
  let endTime = Date.now() + countTime * 60 * 1000
  function count() {
    let time = endTime - Date.now()
    if (time > 0) {
      let sec = ((time / 1000) | 0) % 60
      let min = (time / 1000 / 60) | 0

      drawClock(ctx, min, sec)
      return count
    } else {
      console.log('结束计时')
      clearInterval(timer)
      // todo 通知
    }
  }

  timer = setInterval(count(), 1000)
}
