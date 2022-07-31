<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Canvas from '~/pages/Home/Canvas.vue'
const canvas = ref()
const ctx = ref<CanvasRenderingContext2D>()

onMounted(() => {
  ctx.value = canvas.value.ctx
})
</script>

<template>
  <Canvas ref="canvas"></Canvas>
</template>
