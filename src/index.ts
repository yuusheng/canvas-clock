import { useCanvas } from './store'
import { canvasSize } from './globalVar'
import { initCanvas, drawClock } from './components/canvas'
import { onTime, countDown, timer } from './components/timer'
import './static/index.css'
import 'uno.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App).use(pinia).mount('#app')

const canvasSetting = useCanvas()
const bgColor = canvasSetting.bgColor

// 初始化背景、画布
const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const ctx = initCanvas(canvas, canvasSize.width, canvasSize.height)

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

  canvasSetting.changeBgColor('cyan')
  clearInterval(timer)
  countDown(ctx, countTime, drawClock)
})

export { bgColor }
