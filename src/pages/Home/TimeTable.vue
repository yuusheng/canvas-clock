<script setup lang="ts">
import { toRef } from 'vue'
import { useCanvasSettings } from '~/store'

const bgColor = toRef(useCanvasSettings(), 'bgColor')

const emits = defineEmits<{
  (e: 'toggleToday'): void
}>()
</script>

<template>
  <div
    class="wfull absolute bottom-10% flex items-center justify-center spacex-65%"
  >
    <button
      text="white 4"
      class="w16 h10 rounded-5 border-0 cursor-pointer font-600"
      :style="`background-color: ${bgColor.button}`"
      @click="emits('toggleToday')"
    >
      今天
    </button>
    <button
      text="white 4xl"
      class="w12 h12 rounded-full border-0 cursor-pointer"
      :style="`background-color: ${bgColor.button}`"
    >
      +
    </button>
  </div>
</template>
