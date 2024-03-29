<script setup lang="ts">
import { ref, toRef } from 'vue'
import ColorSelector from './ColorSelector.vue'
import MatterList from './MatterList.vue'
import BaseModal from '~/components/BaseModal.vue'
import BaseInput from '~/components/BaseInput.vue'
import { useCanvasSettings, useMatter } from '~/store'
import type { PaletteType } from '~/utils'

const matter = toRef(useMatter(), 'curMatter')
const bgColor = toRef(useCanvasSettings(), 'bgColor')
const { addMatter } = useMatter()

let showSection = $ref(false)
function changeSectionShow() {
  showSection = !showSection
}

let newTypeModal = $ref(false)
function toggleNewType() {
  newTypeModal = !newTypeModal
}

const typeName = ref<string>()
const curColor = ref<PaletteType>('blue')

function changeCurColor(color: PaletteType) {
  curColor.value = color
}

function toggleSave() {
  addMatter({
    name: typeName.value,
    color: curColor.value,
  })
  toggleNewType()
  reset()
}

function reset() {
  typeName.value = ''
  curColor.value = 'blue'
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
    />
    {{ matter?.name || '添加新类别' }}
  </button>

  <BaseModal v-model="showSection" title="类别">
    <div flex="~ col" items-center>
      <MatterList h100 @change-section-show="changeSectionShow" />

      <button
        p="x2 y2"
        w="70%"
        class="rounded-4 text-white font-bold border-0"
        :style="`background-color: ${bgColor.button}`"
        @click="toggleNewType"
      >
        添加新类别
      </button>
      <BaseModal v-model="newTypeModal" title="新类别">
        <div flex="~ col" items-center>
          <BaseInput v-model="typeName" placeholder="类别名称" />
          <ColorSelector
            :cur-color="curColor"
            @change-cur-color="changeCurColor"
          />
          <div wfull flex justify-between>
            <button p="x3.5 y1.7" border-0 bg-white text-4 cursor-pointer>
              归档
            </button>
            <button
              p="x3.5 y1.7"
              text="white 4"
              class="border-0 rounded-4 font-bold cursor-pointer"
              :style="`background-color: ${bgColor.button}`"
              @click="toggleSave"
            >
              保存
            </button>
          </div>
        </div>
      </BaseModal>
    </div>
  </BaseModal>
</template>

<style lang="postcss" scoped></style>
