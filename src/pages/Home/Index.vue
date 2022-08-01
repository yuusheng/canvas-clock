<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Canvas from './Canvas.vue'
import ColorSelector from './ColorSelector.vue'
const canvas = ref()
const ctx = ref<CanvasRenderingContext2D>()

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
        bg="[#3b6dbf] hover:[#2c528f]"
      >
        开始计时
      </button>
    </div>

    <div flex-1></div>
  </div>
</template>
