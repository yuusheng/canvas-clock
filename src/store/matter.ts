import { defineStore } from 'pinia'
import { Matter } from '~/utils'
import { ref } from 'vue'

export const useMatter = defineStore('matter', () => {
  const curMatter = ref<Matter>()

  function updateCurMatter(matter: Matter) {
    curMatter.value = matter
  }

  return {
    curMatter,
    updateCurMatter,
  }
})
