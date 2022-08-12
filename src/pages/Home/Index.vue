<script setup lang="ts">
import { ref, toRef } from 'vue'
import { useCanvasSettings } from '~/store'
import { countDown } from '~/utils'
import Canvas from './Canvas.vue'
import Board from './Board.vue'
import BaseInput from '~/components/BaseInput.vue'
import Header from './Header.vue'

const bgColor = toRef(useCanvasSettings(), 'bgColor')

const countTime = ref('25')

const { changeCountTime } = useCanvasSettings()
// watchEffect(() => {
//   changeCountTime(countTime.value)
// })
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
          :style="`background-color: ${bgColor.bigger}`"
          @click="countDown"
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
