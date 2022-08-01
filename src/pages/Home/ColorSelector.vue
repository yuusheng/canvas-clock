<script setup lang="ts">
import { useCanvasSettings } from '~/store'
import { palette, PaletteType } from '~/utils'

const { changeBgColor } = useCanvasSettings()

const colorList = Object.keys(palette).map((v: PaletteType) => ({
  color: palette[v].bigger,
  tag: v,
}))
</script>

<template>
  <button p="x-3 y-1" text="white sm" class="bg-blue-600 border-0 rounded">
    改变颜色
  </button>

  <ul list-none flex="~">
    <li
      class="w3 h3 m-1.5 rounded-full cursor-pointer"
      v-for="color of colorList"
      :style="`background-color: ${color.color}`"
      @click="changeBgColor(color.tag)"
    ></li>
  </ul>
</template>

<style lang="postcss" scoped>
.list__item {
  @apply hover:bg-gray-4 cursor-pointer;
  width: 5rem;
}
</style>
