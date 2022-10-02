<script setup lang="ts">
import { provide, ref } from 'vue'
import type { PaletteType } from '~/utils'
import { palette } from '~/utils'

const { curColor } = defineProps<{ curColor: PaletteType }>()

const emits = defineEmits<{
  (e: 'changeCurColor', data: PaletteType): void
}>()

const colorList = Object.keys(palette).map((v: PaletteType) => ({
  color: palette[v].smaller,
  tag: v,
}))

function toggleClickCircle(color: PaletteType) {
  emits('changeCurColor', color)
}
</script>

<template>
  <ul class="flex list-none mt2 px2 rounded">
    <li
      v-for="color of colorList"
      :key="color.color"
      class="w3 h3 m-1.5 rounded-full cursor-pointer relative"
      :style="`background-color: ${color.color}`"
      @click="toggleClickCircle(color.tag)"
    >
      <span
        v-if="color.tag === curColor"
        class="w-1.5 h-1.5 rounded-full bg-white absolute top-0.75 left-0.75"
      />
    </li>
  </ul>
</template>
