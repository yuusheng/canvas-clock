import type { WatchStopHandle } from 'vue'
import { computed, ref, watch } from 'vue'
import { useCanvasSettings } from '~/store'

let interval: number
let progressStop: WatchStopHandle
let leftTime: number
let endTime: number

function updateEndTime(curEndTime: number) {
  endTime = curEndTime
  console.log(`[updateEndTime]:${curEndTime}`)
}

export function countDown() {
  const { countTime } = useCanvasSettings()
  updateEndTime(Date.now() + countTime * 60 * 1000)
  setupTime()
}

export function stopCountDown() {
  leftTime = endTime - Date.now()
  stopAllSideEffect()
}

export function continueCountDown() {
  updateEndTime(leftTime + Date.now() - 1000)
  setupTime()
}

function setupTime() {
  const time = ref(endTime - Date.now())
  interval = setInterval(() => {
    time.value = endTime - Date.now()
  }, 1000)
  const min = computed(() => (time.value / 1000 / 60) | 0)
  const sec = computed(() => ((time.value / 1000) | 0) % 60)

  progressStop = watch([min, sec], () => {
    if (min.value === 0 && sec.value === 0)
      stopAllSideEffect()
  })
  useCanvasSettings().updateTime(min, sec)
}

export function stopAllSideEffect() {
  interval && clearInterval(interval)
  progressStop && progressStop()
}
