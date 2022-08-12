import { computed, onUnmounted, ref } from 'vue'
import { useCanvasSettings } from '~/store'

export function onTime() {
  const time = ref(new Date())
  const interval = setInterval(() => {
    time.value = new Date()
  }, 1000)

  const min = computed(() => time.value.getMinutes())
  const sec = computed(() => time.value.getSeconds())

  const { updateTime } = useCanvasSettings()

  updateTime(min, sec)

  onUnmounted(() => {
    clearInterval(interval)
  })
}
