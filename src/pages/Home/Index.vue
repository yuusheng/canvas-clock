<script setup lang="ts">
import { ref } from 'vue'
import { useCanvasSettings, useMatter } from '~/store'
import { countDown } from '~/utils'
import { mattersDB } from '~/db'
import Canvas from './Canvas.vue'
import Board from './Board.vue'
import BaseInput from '~/components/BaseInput.vue'
import Header from './Header.vue'
import { storeToRefs } from 'pinia'

const countTime = ref('25')

const { bgColor } = storeToRefs(useCanvasSettings())
const { curMatter } = storeToRefs(useMatter())

async function toggleStartCount() {
  console.log(curMatter.value)
  if (!curMatter.value.name) {
    alert('请输入目标')
    return
  }
  countDown()

  mattersDB.add('matters', {
    name: curMatter.value.name,
    color: bgColor.value.button,
    time: new Date(),
  })
}
</script>

<template>
  <div h-screen w-full flex items-center divide="gray/30" divide-x>
    <div w="45%" hfull flex :style="`background-color: ${bgColor.bg}`">
      <div wfull myauto translate-y="-15" flex="~ col" text-center items-center>
        <Header />
        <Canvas ref="canvas" />
        <BaseInput v-model="countTime" />

        <button
          class="m2 w32 h8 border-0 rounded-4 cursor-pointer"
          text="sm white"
          :style="`background-color: ${bgColor.button}`"
          @click="toggleStartCount"
        >
          开始计时
        </button>
      </div>
    </div>

    <div flex-1 hfull>
      <Board />
    </div>
  </div>
</template>
