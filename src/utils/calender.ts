import type { Ref } from 'vue'
import { computed, ref } from 'vue'

const regxGetTime = /((\d{4})-(\d{2}))-(\d{2})/

export function getDay(date: string): number {
  return +regxGetTime.exec(date)[4]
}

export function getYearAndMonth(date: string) {
  return regxGetTime.exec(date)[1]
}

export function useCalender(today?: Date) {
  const initialDate = formatDate(today || new Date())
  const currentMonthDays: Ref<string[]> = ref(getCurrentMonthDaysFormatted(initialDate))
  const currentDayIndex: Ref<number> = ref(getDay(initialDate) - 1)
  // 2022-01-01
  const currentDateFormatted = computed(() => currentMonthDays.value[currentDayIndex.value])
  const date = computed(() => getDay(currentDateFormatted.value))

  function nextDay() {
    if (currentDayIndex.value + 1 < currentMonthDays.value.length) { currentDayIndex.value++ }
    else {
      const oneDay = 24 * 60 * 60 * 1000
      const date = new Date(currentDateFormatted.value).getTime() + oneDay
      const nextDate = new Date(date) // next day Date object
      updateDayAndMonth(nextDate)
    }
  }

  function preDay() {
    if (currentDayIndex.value - 1 > 0) { currentDayIndex.value-- }
    else {
      const oneDay = 24 * 60 * 60 * 1000
      const date = new Date(currentDateFormatted.value).getTime() - oneDay
      const nextDate = new Date(date) // next day Date object
      updateDayAndMonth(nextDate)
    }
  }

  function backToToday() {
    updateDayAndMonth(new Date())
  }

  function jumpToDate(date: Date) {
    updateDayAndMonth(date)
  }

  function updateDayAndMonth(date: Date) {
    currentDayIndex.value = date.getDate() - 1
    currentMonthDays.value = getCurrentMonthDaysFormatted(date)
  }
  return {
    date,
    currentDateFormatted,
    currentMonthDays,
    nextDay,
    preDay,
    backToToday,
    jumpToDate,
  }
}

export function getCurrentMonthDaysFormatted(curDate: string | Date) {
  curDate = curDate instanceof Date ? formatDate(curDate) : curDate
  const regRes = regxGetTime.exec(curDate)

  const begin = `${regRes[1]}-01`
  const end = `${regRes[1]}-${new Date(+regRes[2], +regRes[3], 0).getDate()}`

  return getAllDateFormatted(begin, end)
}

export function formatDate(date: Date) {
  const format = (num: number) => String(num).padStart(2, '0')
  const month = format(date.getMonth() + 1)
  const day = format(date.getDate())

  return `${date.getFullYear()}-${month}-${day}`
}

export const oneDay = 24 * 60 * 60 * 1000

export function getAllDateFormatted(begin: string | Date, end: string | Date) {
  const arr = []

  begin = begin instanceof Date ? begin : new Date(begin)
  end = end instanceof Date ? end : new Date(end)

  const unixBegin = begin.getTime()
  const unixEnd = end.getTime()
  for (let cur = unixBegin; cur <= unixEnd; cur += oneDay)
    arr.push(formatDate(new Date(cur)))

  return arr
}
