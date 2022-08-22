<script setup lang="ts">
import DateSelect from './DateSelect.vue'
import TimeTable from './TimeTable.vue'
import { useTime } from '~/store'
import { computed, onMounted, ref, toRefs } from 'vue'
import MatterListTable from './MatterListTable.vue'

const { date } = toRefs(useTime())

const current = ref()
const curName = computed(() => {
  if (current.value === date.value) return '今天'
  else if (current.value < date.value)
    return `${date.value - current.value}天前`
  else return `${current.value - date.value}天后`
})

function updateCurrent(date: number) {
  current.value = date
}

function preDate() {
  current.value -= 1
}

function nextDate() {
  current.value += 1
}

function toggleToday() {
  current.value = date.value
}

onMounted(() => {
  toggleToday()
})
</script>

<template>
  <main flex="~ col" relative hfull p="t6%">
    <div flex="~ col" mb2 items-center>
      <DateSelect
        :current="current"
        :cur-name="curName"
        @update-current="updateCurrent"
        @next-date="nextDate"
        @pre-date="preDate"
      />
    </div>

    <div h3 wfull border="t-1 b-1 gray5/20"></div>

    <MatterListTable h="83%" />

    <TimeTable @toggle-today="toggleToday" />
  </main>
</template>
