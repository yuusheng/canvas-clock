import { computed } from 'vue'
import { defineStore } from 'pinia'
import { formatDate, getAllDateFormatted, oneDay, useCalender } from '~/utils'
import type { Day } from '~/utils'

interface DateListItem {
  current?: boolean
  today?: boolean
  day: Day
  date: Date
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
  const {
    date,
    currentDateFormatted, // 2022-01-01
    currentMonthDays,
    nextDay,
    preDay,
    backToToday,
    jumpToDate,
  } = useCalender()

  const dateList = computed(() => {
    const currentDate = new Date(currentDateFormatted.value)
    // 当前星期几
    const currentDay = currentDate.getDay() || 7
    // const dateList = []
    const todayFormatted = formatDate(new Date())

    const begin = currentDate.getTime() - oneDay * (currentDay - 1)
    const end = currentDate.getTime() + oneDay * (7 - currentDay)

    const allDates = getAllDateFormatted(new Date(begin), new Date(end)).map((v) => {
      const date = new Date(v)
      const day = date.getDay()
      const dateListItem: DateListItem = {
        date,
        day: dayListStatic[day],
      }
      if (currentDay === (date.getDay() || 7))
        dateListItem.current = true
      if (todayFormatted === formatDate(date))
        dateListItem.today = true
      return dateListItem
    })

    return allDates
  })

  // function updateDay() {
  //   const curDate = new Date()
  //   day.value = curDate.getDay()
  //   date.value = curDate.getDate()
  // }

  // function autoUpdate() {
  //   const curDate = new Date()
  //   const diffTime = (24 - curDate.getHours()) * 60 + 60 - curDate.getMinutes()
  //   setTimeout(updateDay, diffTime * 60 * 1000)
  //   return setInterval(updateDay, 24 * 60 * 60 * 1000)
  // }

  // updateDay()
  // autoUpdate()

  return {
    date,
    dateList,
    currentDate: currentDateFormatted,
    currentMonthDays,
    nextDay,
    preDay,
    backToToday,
    jumpToDate,
  }
})
