import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import type { Day } from '~/utils'

interface DayListItem {
  today?: boolean
  day: Day
  date: number
}

const dayListStatic: Day[] = [
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
]

export const useTime = defineStore('time', () => {
  const day = ref<number>()
  const date = ref<number>()

  const dayList = ref<DayListItem[]>([])

  watchEffect(() => {
    clearDayList()
    for (let i = 1; i <= 7; i++) {
      const dayListItem: DayListItem = {
        day: dayListStatic[i % 7],
        date: date.value + i - day.value,
      }

      if (i === day.value)
        dayListItem.today = true
      dayList.value.push(dayListItem)
    }
  })

  function clearDayList() {
    dayList.value.length = 0
  }
  function updateDay() {
    const curDate = new Date()
    day.value = curDate.getDay()
    date.value = curDate.getDate()
  }

  function autoUpdate() {
    const curDate = new Date()
    const diffTime = (24 - curDate.getHours()) * 60 + 60 - curDate.getMinutes()
    setTimeout(updateDay, diffTime * 60 * 1000)
    return setInterval(updateDay, 24 * 60 * 60 * 1000)
  }

  let interval: number
  onMounted(() => {
    updateDay()
    interval = autoUpdate()
  })

  onUnmounted(() => {
    clearInterval(interval)
  })
  return {
    day,
    date,
    dayList,
  }
})
