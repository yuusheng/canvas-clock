import { ref } from 'vue'
import { defineStore } from 'pinia'
import { palette, PaletteType } from '~/utils'

export const useCanvas = defineStore('canvasSettings', () => {
  const canvasSize = ref({ width: 300, height: 300 })
  const circleSize = ref(130)
  const bgColor = ref(palette.blue)

  function changeBgColor(color: PaletteType) {
    bgColor.value = palette[color]
  }

  return {
    canvasSize,
    circleSize,
    bgColor,
    changeBgColor,
  }
})
