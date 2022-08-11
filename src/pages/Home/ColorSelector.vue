<script setup lang="ts">
import { provide, ref } from 'vue'
import { palette, PaletteType } from '~/utils'

const colorList = Object.keys(palette).map((v: PaletteType) => ({
  color: palette[v].smaller,
  tag: v,
}))

const { curColor } = defineProps<{ curColor: PaletteType }>()

const emits = defineEmits<{
  (e: 'changeCurColor', data: PaletteType): void
}>()
function toggleClickCircle(color: PaletteType) {
  emits('changeCurColor', color)
}
</script>

<template>
  <ul class="flex list-none mt2 px2 rounded">
    <li
      class="w3 h3 m-1.5 rounded-full cursor-pointer relative"
      v-for="color of colorList"
      :style="`background-color: ${color.color}`"
      @click="toggleClickCircle(color.tag)"
    >
      <span
        v-if="color.tag === curColor"
        class="w-1.5 h-1.5 rounded-full bg-white absolute top-0.75 left-0.75"
      ></span>
    </li>
  </ul>
</template>
