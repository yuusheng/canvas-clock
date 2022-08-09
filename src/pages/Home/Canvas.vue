<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCanvasSettings } from '~/store'
import { initCanvas, onTime, drawClock } from '~/utils'

const canvas = ref<HTMLCanvasElement | null>(null)
const { canvasSize, updateCtx } = useCanvasSettings()

const ctx = ref<CanvasRenderingContext2D>()

onMounted(() => {
  ctx.value = initCanvas(canvas.value, canvasSize)
  updateCtx(ctx.value)
  onTime()
})
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
