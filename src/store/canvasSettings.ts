import type { Ref, WatchStopHandle } from 'vue'
import { computed, ref, watch, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import type { PaletteType } from '~/utils'
import { drawClock, palette } from '~/utils'

export const useCanvasSettings = defineStore('canvasSettings', () => {
  const canvasSize = ref({ width: 300, height: 300 })
  const circleSize = ref(130)
  const bgColor = ref(palette.blue)
  const countTime = ref(25)
  const ctx = ref<CanvasRenderingContext2D>()
  const min = ref<number>()
  const sec = ref<number>()
  const buttonColor = computed(() => `background-color:${bgColor.value.button}`)

  watch([min, sec, bgColor, ctx], () => {
    if (ctx.value)
      drawClock(ctx.value, min.value, sec.value)
    // console.log(`[draw] ${min.value}:${sec.value}`)
  })

  let curTimeStopper: WatchStopHandle
  function updateTime(curMin: Ref<number>, curSec: Ref<number>) {
    curTimeStopper && curTimeStopper()

    curTimeStopper = watchEffect(() => {
      min.value = curMin.value
      sec.value = curSec.value
    })
  }

  function changeBgColor(color: PaletteType) {
    bgColor.value = palette[color]
  }

  function changeCountTime(time: number) {
    countTime.value = time
  }

  function updateCtx(curCtx: CanvasRenderingContext2D) {
    ctx.value = curCtx
  }

  return {
    canvasSize,
    circleSize,
    bgColor,
    buttonColor,
    countTime,
    ctx,
    min,
    sec,
    changeBgColor,
    changeCountTime,
    updateCtx,
    updateTime,
  }
})
