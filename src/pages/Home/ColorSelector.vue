<script setup lang="ts">
import { useCanvasSettings } from '~/store/canvasSettings.js'
import { palette, PaletteType } from '~/utils'

const { changeBgColor } = useCanvasSettings()

const colorList: { color: string; tag: PaletteType }[] = [
  {
    tag: 'blue',
    color: palette.blue.smaller,
  },
  {
    tag: 'cyan',
    color: palette.cyan.smaller,
  },
  {
    tag: 'green',
    color: palette.green.smaller,
  },
  {
    tag: 'purple',
    color: palette.purple.smaller,
  },
  {
    tag: 'red',
    color: palette.red.smaller,
  },
]

function changeColor(color: PaletteType) {
  changeBgColor(color)
}
</script>

<template>
  <button p="x-3 y-1" text="white sm" class="bg-blue-600 border-0 rounded">
    改变颜色
  </button>

  <ul list-none flex="~">
    <li
      text-6xl
      v-for="color of colorList"
      :style="`color: ${color.color}`"
      @click="changeColor(color.tag)"
    >
      ·
    </li>
  </ul>
</template>

<style lang="postcss" scoped>
.list__item {
  @apply hover:bg-gray-4 cursor-pointer;
  width: 5rem;
}
</style>
