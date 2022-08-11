<script setup lang="ts">
import { palette, PaletteType } from '~/utils'

const colorList = Object.keys(palette).map((v: PaletteType) => ({
  color: palette[v].smaller,
  tag: v,
}))
</script>

<template>
  <ul class="flex list-none mt2 px2 rounded">
    <li
      class="w3 h3 m-1.5 rounded-full cursor-pointer hover:bg-gray-1"
      v-for="color of colorList"
      :style="`background-color: ${color.color}`"
    ></li>
  </ul>
</template>
