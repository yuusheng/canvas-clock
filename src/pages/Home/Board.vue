<script setup lang="ts">
import { computed, toRefs } from 'vue'
import DateSelect from './DateSelect.vue'
import TimeTable from './TimeTable.vue'
import MatterListTable from './MatterListTable.vue'
import { useTime } from '~/store'
import { formatDate, getDay } from '~/utils'

const { currentDate } = toRefs(useTime())
const { backToToday } = useTime()

const current = computed(() =>
  getDay(currentDate.value),
)

const curName = computed(() => {
  const today = new Date()
  if (currentDate.value === formatDate(today)) { return '今天' }
  else {
    const date = new Date(currentDate.value)
    const diffDays = date.getDate() - today.getDate()

    if (date.getMonth() === today.getMonth() && Math.abs(diffDays) < 3)
      return `${Math.abs(diffDays)}天${diffDays > 0 ? '后' : '前'}`
    else
      return `${date.getMonth() + 1}月${date.getDate()}日`
  }
})
</script>

<template>
  <main flex="~ col" relative hfull p="t6%">
    <div flex="~ col" mb2 items-center>
      <DateSelect
        :current="current"
        :cur-name="curName"
      />
    </div>

    <div h3 wfull border="t-1 b-1 gray5/20" />

    <MatterListTable h="83%" />

    <TimeTable @toggle-today="backToToday" />
  </main>
</template>
