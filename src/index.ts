import { canvasSize } from './globalVar'
import { initCanvas, drawClock } from './components/canvas/index'
import { onTime, countDown, timer } from './components/timer/index'
import palette from './components/canvas/color'
import './static/index.css'
import 'uno.css'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App).mount('#app')

// 初始化背景、画布
let bgColor = palette.blue
const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const ctx = initCanvas(canvas, canvasSize.width, canvasSize.height)

console.log('1')
// 计时部分
onTime(ctx, drawClock)

// 倒计时部分，默认计时25min
let countTime = 25
const startCount = document.querySelector('#startCount')
// 输入框
let countTimeInput = <HTMLInputElement>document.getElementById('countTime')
countTimeInput.value = '25'
// 按钮按下开始倒计时25min
startCount.addEventListener('click', () => {
  if (countTimeInput.value) {
    countTime = +countTimeInput.value
  } else {
    countTime = 25
  }

  bgColor = palette.cyan
  clearInterval(timer)
  countDown(ctx, countTime, drawClock)
})

export { bgColor }
