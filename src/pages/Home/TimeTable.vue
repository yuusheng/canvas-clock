<script setup lang="ts">
import { toRef } from 'vue'
import { useCanvasSettings } from '~/store'

const emits = defineEmits<{
  (e: 'toggleToday'): void
}>()

const buttonColor = toRef(useCanvasSettings(), 'buttonColor')
</script>

<template>
  <div
    class="wfull absolute bottom-10% flex items-center justify-center spacex-65%"
  >
    <button
      text="white 4"
      class="w16 h10 rounded-5 border-0 cursor-pointer font-600 hover:op-90"
      :style="buttonColor"
      @click="emits('toggleToday')"
    >
      今天
    </button>
    <button
      text="white 4xl"
      class="w12 h12 rounded-full border-0 cursor-pointer hover:op-90"
      :style="buttonColor"
    >
      +
    </button>
  </div>
</template>
