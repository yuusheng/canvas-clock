import timer from './timer'

export function onTime(
  ctx: CanvasRenderingContext2D,
  drawClock: (ctx: CanvasRenderingContext2D, min: number, sec: number) => void
) {
  let time = new Date()
  let min = time.getMinutes()
  let sec = time.getSeconds()

  drawClock(ctx, min, sec)
  let curTimer = setTimeout(() => onTime(ctx, drawClock), 1000)
  timer.setTimer(curTimer)
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

      timer.clearTimer()
      // todo 通知
    }
  }

  let curTimer = setInterval(count(), 1000)
  timer.setTimer(curTimer)
}
