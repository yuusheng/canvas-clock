<script setup lang="ts">
import { useCanvasSettings, useMatter } from '~/store'
import type { PaletteType } from '~/utils'
import { palette } from '~/utils'

const emits = defineEmits(['changeSectionShow'])

const { updateCurMatter, getMatterList } = useMatter()
const { changeBgColor } = useCanvasSettings()

const matters = getMatterList()

function toggleClick(name: string, color: PaletteType) {
  updateCurMatter({ name, color })
  changeBgColor(color)
  emits('changeSectionShow')
}
</script>

<template>
  <ul mt2 flex="~ col" items-center list-none w-full>
    <li
      v-for="matter in matters"
      :key="matter.name"
      class="w-full py1 pl-30% flex items-center spacex3 rounded hover:bg-gray-1/50"
      @click="toggleClick(matter.name, matter.color)"
    >
      <div
        class="h3 w3 rounded-full"
        :style="`background-color: ${palette[matter.color].smaller}`"
      />
      <span>{{ matter.name }}</span>
    </li>
  </ul>
</template>
