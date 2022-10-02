<script setup lang="ts">
import { onMounted, toRefs } from 'vue'
import { useTime } from '~/store'
import BaseDateRect from '~/components/BaseDateRect.vue'

defineProps<{ curName?: string; current?: number }>()

const emits = defineEmits<{
  (e: 'preDate'): void
  (e: 'nextDate'): void
  (e: 'updateCurrent', data: number): void
}>()

const { dayList } = toRefs(useTime())

function toggleClickRect(date: number) {
  emits('updateCurrent', date)
}

// onMounted(() => {})
</script>

<template>
  <div flex spacex2 h8 mb1>
    <img
      src="../../static/images/left.png"
      p="x2 y1"
      class="w4 rounded text-2xl text-center border-1 border-gray-2 cursor-pointer"
      @click="emits('preDate')"
    >

    <div
      flex
      p="x20 y1"
      class="rounded text-center items-center border-1 border-gray-2 cursor-pointer"
    >
      {{ curName || '今天' }}
    </div>

    <img
      src="../../static/images/right.png"
      p="x2 y1"
      class="w4 rounded text-2xl text-center border-1 border-gray-2 cursor-pointer"
      @click="emits('nextDate')"
    >
  </div>
  <div flex>
    <BaseDateRect
      v-for="day of dayList"
      :key="day.date"
      :today="day?.today"
      :current="current"
      :date="day.date"
      :day="day.day"
      @click="toggleClickRect(day.date)"
    />
  </div>
</template>

<!-- <style scoped>
input[type="date"]::webkit-date
</style> -->
