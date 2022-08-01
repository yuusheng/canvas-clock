<script setup lang="ts">
import { toRefs } from 'vue'
import { useCanvasSettings } from '~/store'
import { palette, PaletteType } from '~/utils'

const { changeBgColor, bgColor } = toRefs(useCanvasSettings())

const colorList = Object.keys(palette).map((v: PaletteType) => ({
  color: palette[v].bigger,
  tag: v,
}))

let showSection = $ref(false)

function showChangeSection() {
  showSection = !showSection
}
</script>

<template>
  <button
    p="x-3 y-1"
    text="white sm"
    class="border-0 rounded"
    :style="`background-color: ${bgColor.bigger}`"
    @click="showChangeSection"
  >
    改变颜色
  </button>

  <ul list-none mt2 px2 flex="~" rounded shadow="md gray/25" v-if="showSection">
    <li
      class="w3 h3 m-1.5 rounded-full cursor-pointer"
      v-for="color of colorList"
      :style="`background-color: ${color.color}`"
      @click="changeBgColor(color.tag)"
    ></li>
  </ul>
</template>

<style lang="postcss" scoped></style>
