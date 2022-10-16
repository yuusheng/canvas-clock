<script setup lang="ts">
import { toRef } from 'vue'
import { useCanvasSettings } from '~/store'
import type { Day } from '~/utils'

defineProps<{
  today?: boolean
  current?: number
  day: Day
  date: number
}>()

const color = toRef(useCanvasSettings(), 'bgColor')
</script>

<template>
  <div flex="~ col" items-center>
    <div
      p="x2.5 y1"
      flex="~ col"
      class="m0.5 w8 h10 items-center rounded cursor-pointer"
      :class="current === date ? 'bg-gray-3/70' : 'bg-gray1'"
    >
      <span font-light text-xs>{{ day || '周一' }}</span>
      <span font-bold text-xl>{{ date || '7' }}</span>
    </div>

    <span
      class="w1.5 h1.5 rounded-full"
      :style="today && `background-color: ${color.button}`"
    />
  </div>
</template>
