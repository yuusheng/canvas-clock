import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { palette, PaletteType } from '~/utils'

export const useCanvasSettings = defineStore('canvasSettings', () => {
  const canvasSize = ref({ width: 300, height: 300 })
  const circleSize = ref(130)
  const bgColor = ref(palette.blue)
  const countTime = ref(25)

  function changeBgColor(color: PaletteType) {
    bgColor.value = palette[color]
  }

  function changeCountTime(time: number) {
    countTime.value = time
  }

  return {
    canvasSize,
    circleSize,
    bgColor,
    countTime,
    changeBgColor,
    changeCountTime,
  }
})
