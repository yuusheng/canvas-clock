<script setup lang="ts">
import { ref, toRef, watch } from 'vue'
import { useCanvasSettings } from '~/store'
import { countDown } from '~/utils'
import Canvas from './Canvas.vue'
import ColorSelector from './ColorSelector.vue'
import Board from './Board.vue'

const bgColor = toRef(useCanvasSettings(), 'bgColor')

const countTime = ref(25)

const { changeCountTime } = useCanvasSettings()
watch(countTime, () => {
  changeCountTime(countTime.value)
})
</script>

<template>
  <div h-screen flex="~" text-center items-center justify-between>
    <div flex="~ col" text-center items-center>
      <ColorSelector />
      <Canvas ref="canvas" />
      <input type="text" v-model="countTime" />
      <button
        class="m2 w32 h8 border-0 rounded-4 cursor-pointer"
        text="sm white"
        :style="`background-color: ${bgColor.bigger}`"
        @click="countDown"
      >
        开始计时
      </button>
    </div>

    <div flex-1>
      <Board />
    </div>
  </div>
</template>
