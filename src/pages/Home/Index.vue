<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue'
import { useCanvasSettings } from '~/store'
import Canvas from './Canvas.vue'
import ColorSelector from './ColorSelector.vue'

const canvas = ref()
const ctx = ref<CanvasRenderingContext2D>()

const { bgColor, countTime } = toRefs(useCanvasSettings())

function startCount() {
  console.log('count')
}

onMounted(() => {
  ctx.value = canvas.value.ctx
})
</script>

<template>
  <div h-screen flex="~" text-center items-center justify-between>
    <div flex="~ col" text-center items-center>
      <ColorSelector />
      <Canvas ref="canvas" />
      <button
        class="m2 w32 h8 border-0 rounded-4 cursor-pointer"
        text="sm white"
        :style="`background-color: ${bgColor.bigger}`"
        @click="startCount"
      >
        开始计时
      </button>
    </div>

    <div flex-1></div>
  </div>
</template>
