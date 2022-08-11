<script setup lang="ts">
import { toRef } from 'vue'
import { useCanvasSettings, useMatter } from '~/store'
import { PaletteType, palette, Matter } from '~/utils'

const emits = defineEmits(['changeSectionShow'])

const { updateCurMatter, initMatterList, getMatterList } = useMatter()
const { changeBgColor } = useCanvasSettings()

let matterList: Matter[] = [
  { name: 'js', color: 'blue' },
  { name: '算法', color: 'green' },
]

initMatterList(matterList)

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
      class="w-full py1 pl-30% flex items-center spacex3 rounded hover:bg-gray-1/50"
      @click="toggleClick(matter.name, matter.color)"
      v-for="matter in matters"
      :key="matter.name"
    >
      <div
        class="h3 w3 rounded-full"
        :style="`background-color: ${palette[matter.color].smaller}`"
      ></div>
      <span>{{ matter.name }}</span>
    </li>
  </ul>
</template>
