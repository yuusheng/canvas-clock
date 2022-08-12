<script setup lang="ts">
import ZebraStripeRect from '~/components/ZebraStripeRect.vue'
import BaseDateRect from '~/components/BaseDateRect.vue'
import DateSelect from './DateSelect.vue'
import { Day } from '~/utils'

const dayListStatic: Day[] = [
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
]

interface DayListItem {
  today?: boolean
  day: Day
  date: number
}
function dayListGenerator() {
  const dateNow = new Date()
  const day = dateNow.getDay()
  const date = dateNow.getDate()

  const dayList: DayListItem[] = []
  for (let i = 1; i <= 7; i++) {
    let dayListItem: DayListItem = {
      day: dayListStatic[i % 7],
      date: date + i - day,
    }

    if (i === day) dayListItem['today'] = true
    dayList.push(dayListItem)
  }
  return dayList
}

const dayList = dayListGenerator()
</script>

<template>
  <main>
    <div flex="~ col" m="t6%" justify-center items-center>
      <DateSelect />

      <div flex>
        <BaseDateRect
          v-for="day of dayList"
          :today="day?.today"
          :date="day.date"
          :day="day.day"
        />
      </div>
    </div>
    <!-- <ZebraStripeRect w12 h3 /> -->
  </main>
</template>
