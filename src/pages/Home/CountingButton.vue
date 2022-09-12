<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useCanvasSettings } from '~/store'

defineProps<{
  bgImgUrl: string
  clickEvent: () => void
}>()

const buttonColor = toRef(useCanvasSettings(), 'buttonColor')
</script>

<template>
  <button
    :style="buttonColor"
    class="rounded-full flex items-center justify-center border-0 cursor-pointer hover:op-90"
    @click="clickEvent"
  >
    <img h4 w4 :src="`${bgImgUrl}`" alt="" />
  </button>
</template>
