<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCanvasSettings } from '~/store'
import { initCanvas, onTime, drawClock } from '~/utils'

const canvas = ref<HTMLCanvasElement | null>(null)
const canvasSettings = useCanvasSettings()

let ctx: CanvasRenderingContext2D

onMounted(() => {
  ctx = initCanvas(canvas.value, canvasSettings.canvasSize)

  onTime(ctx, drawClock)
})
</script>

<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>
