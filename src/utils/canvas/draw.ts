import { useCanvasSettings } from '~/store/canvasSettings'

export function drawClock(
  ctx: CanvasRenderingContext2D,
  min: number,
  sec: number,
) {
  const { canvasSize, circleSize, bgColor } = useCanvasSettings()

  const labelColor = { big: '#999', small: '#d9d9d9' }

  ctx.save()
  ctx.clearRect(0, 0, canvasSize.width * 2, canvasSize.height * 2)
  // 设置中心点，此时300，300变成了坐标的0，0
  ctx.translate(canvasSize.width, canvasSize.height)
  ctx.save()

  // 画大圆
  drawCircle(ctx, circleSize, true, bgColor.bigger)

  drawCircleByAngle(ctx, circleSize, min, sec, bgColor.smaller)

  drawCircle(ctx, 0.25 * circleSize, true, '#fff', bgColor.shadow)

  drawPointer(ctx, min, sec, circleSize * 1.2, bgColor.pointer, bgColor.shadow)

  drawCircle(ctx, 0.16 * circleSize, true, '#fff', bgColor.shadow)

  // 绘制刻度，也是跟绘制时分秒针一样，只不过刻度是死的
  ctx.lineWidth = 1
  const smallScale = {
    begin: circleSize * 1.3,
    end: circleSize * 1.38,
  }
  for (let i = 0; i < 60; i++) {
    ctx.rotate((2 * Math.PI) / 60)
    ctx.beginPath()
    ctx.moveTo(smallScale.begin, 0)
    ctx.lineTo(smallScale.end, 0)
    ctx.lineWidth = 4
    ctx.strokeStyle = labelColor.small
    ctx.lineCap = 'round'
    ctx.stroke()
    ctx.closePath()
  }
  ctx.restore()

  ctx.save()
  ctx.lineWidth = 1
  const bigScale = {
    begin: circleSize * 1.24,
    end: circleSize * 1.4,
  }
  for (let i = 0; i < 12; i++) {
    ctx.rotate((2 * Math.PI) / 12)
    ctx.beginPath()
    ctx.moveTo(bigScale.begin, 0)
    ctx.lineTo(bigScale.end, 0)
    ctx.strokeStyle = labelColor.big
    ctx.lineWidth = 4
    ctx.lineCap = 'round'
    ctx.stroke()
    ctx.closePath()
  }

  ctx.restore()
  ctx.restore()
}

export function drawCircle(
  ctx: CanvasRenderingContext2D,
  radius = 100,
  full = true,
  bgColor = '#fff',
  shadow?: string,
) {
  ctx.save()
  ctx.beginPath()

  ctx.arc(0, 0, radius, 0, 2 * Math.PI)

  if (shadow) {
    ctx.shadowOffsetX = -3
    ctx.shadowOffsetY = 3
    ctx.shadowBlur = 15
    ctx.shadowColor = shadow
  }
  if (full) {
    ctx.fillStyle = bgColor
    ctx.fill()
  }
  else {
    ctx.stroke()
  }

  ctx.closePath()
  ctx.restore()
}

function getAngle(minute: number, sec: number) {
  return ((2 * Math.PI) / 60) * minute + ((2 * Math.PI) / 60) * (sec / 60)
}

export function drawCircleByAngle(
  ctx: CanvasRenderingContext2D,
  radius = 100,
  minute: number,
  sec: number,
  bgColor = '#fff',
) {
  ctx.save()

  ctx.beginPath()
  const curAngle = getAngle(minute, sec)
  ctx.rotate(-Math.PI / 2)
  ctx.moveTo(0, 0)
  ctx.arc(0, 0, radius, 0, curAngle)

  ctx.fillStyle = bgColor
  ctx.fill()

  ctx.closePath()
  ctx.restore()
}

export function drawPointer(
  ctx: CanvasRenderingContext2D,
  minute: number,
  sec: number,
  long: number,
  color?: string,
  shadow?: string,
) {
  // 时针
  ctx.rotate(
    ((2 * Math.PI) / 60) * minute
      + ((2 * Math.PI) / 60) * (sec / 60)
      - Math.PI / 2,
  )

  ctx.beginPath()
  // moveTo设置画线起点
  ctx.moveTo(0, 0)
  // lineTo设置画线经过点
  ctx.lineTo(long, 0)
  // 设置线宽
  ctx.lineWidth = 10
  ctx.strokeStyle = color || '#000'
  ctx.shadowOffsetX = -2
  ctx.shadowOffsetY = -2
  ctx.shadowBlur = 6
  ctx.shadowColor = shadow
  ctx.lineCap = 'round'
  ctx.stroke()

  ctx.closePath()
  // 恢复成上一次save的状态
  ctx.restore()

  // 恢复完再保存一次
  ctx.save()
}

export function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.save()
  ctx.beginPath()
  ctx.arc(x + radius, y + radius, radius, Math.PI, (Math.PI * 3) / 2)
  ctx.lineTo(width - radius + x, y)
  ctx.arc(
    width - radius + x,
    radius + y,
    radius,
    (Math.PI * 3) / 2,
    Math.PI * 2,
  )
  ctx.lineTo(width + x, height + y - radius)
  ctx.arc(width - radius + x, height - radius + y, radius, 0, (Math.PI * 1) / 2)
  ctx.lineTo(radius + x, height + y)
  ctx.arc(radius + x, height - radius + y, radius, (Math.PI * 1) / 2, Math.PI)
  ctx.closePath()
  ctx.restore()
}
