<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useCanvasSettings } from '~/store'
import { initCanvas, onTime } from '~/utils'

const canvas = ref<HTMLCanvasElement | null>()
const { canvasSize, updateCtx } = useCanvasSettings()

const ctx = ref<CanvasRenderingContext2D>()

onMounted(() => {
  ctx.value = initCanvas(canvas.value, canvasSize)
  updateCtx(ctx.value)
  onTime()
})

onUnmounted(() => {
  ctx.value = null
  canvas.value = null
})
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
