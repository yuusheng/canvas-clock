import { computed, ref, watch } from 'vue'
import { useCanvasSettings } from '~/store'

export function countDown() {
  const { updateTime, countTime } = useCanvasSettings()
  const endTime = Date.now() + countTime * 60 * 1000
  const time = ref(endTime - Date.now())
  const interval = setInterval(() => {
    time.value = endTime - Date.now()
  }, 1000)
  const min = computed(() => (time.value / 1000 / 60) | 0)
  const sec = computed(() => ((time.value / 1000) | 0) % 60)

  const progressStop = watch([min, sec], () => {
    if (min.value === 0 && sec.value === 0) {
      clearInterval(interval)
      progressStop()
    }
  })
  updateTime(min, sec)
}
