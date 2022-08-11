<script setup lang="ts">
import { toRef } from 'vue'
import { useCanvasSettings, useMatter } from '~/store'
import { palette, PaletteType } from '~/utils'
import BaseModal from '~/components/BaseModal.vue'
import ColorSelector from './ColorSelector.vue'
import MatterList from './MatterList.vue'

const matter = toRef(useMatter(), 'curMatter')
const bgColor = toRef(useCanvasSettings(), 'bgColor')
const { changeBgColor } = useCanvasSettings()

const colorList = Object.keys(palette).map((v: PaletteType) => ({
  color: palette[v].smaller,
  tag: v,
}))

let showSection = $ref(false)

function changeSectionShow() {
  showSection = !showSection
}

function toggleClick(color: PaletteType) {
  changeBgColor(color)
  changeSectionShow()
}
</script>

<template>
  <button
    p="l3 r4 y1"
    text="#323232 xs"
    border="1 gray-3/50"
    class="flex items-center rounded-10"
    :style="`background-color: ${bgColor.bg}`"
    @click="changeSectionShow"
  >
    <li
      class="w2 h2 m-1.5 rounded-full cursor-pointer list-none"
      :style="`background-color: ${bgColor.smaller}`"
    ></li>
    {{ matter?.name || '添加新类别' }}
  </button>

  <BaseModal v-model="showSection" title="类别">
    <div flex="~ col" items-center>
      <MatterList />
      <ColorSelector />

      <button
        p="x2 y2"
        w="70%"
        class="rounded-4 bg-blue-7 text-white font-bold border-0"
      >
        添加新类别
      </button>
    </div>
  </BaseModal>
</template>

<style lang="postcss" scoped></style>
