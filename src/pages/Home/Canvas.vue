<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCanvasSettings } from '~/store'
import { initCanvas, onTime, drawClock } from '~/utils'

const canvas = ref<HTMLCanvasElement | null>(null)
const { canvasSize } = useCanvasSettings()

const ctx = ref<CanvasRenderingContext2D>()

onMounted(() => {
  ctx.value = initCanvas(canvas.value, canvasSize)

  onTime(ctx.value, drawClock)
})

defineExpose({ ctx })
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
