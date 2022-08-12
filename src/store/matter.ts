import { defineStore } from 'pinia'
import { Matter } from '~/utils'
import { computed, onMounted, ref } from 'vue'

export const useMatter = defineStore('matter', () => {
  const curMatter = ref<Matter>()

  function updateCurMatter(matter: Matter) {
    curMatter.value = matter
  }

  const matterList = ref<Map<string, Matter>>(new Map())

  function initMatterList(data: Matter[]) {
    data.forEach((v) => {
      matterList.value.set(v.name, v)
    })
  }

  function addMatter(matter: Matter) {
    matterList.value.set(matter.name, matter)
  }

  function removeMatter(matter: Matter) {
    if (matterList.value.has(matter.name)) {
      matterList.value.delete(matter.name)
    }
  }

  function getMatterList() {
    return computed(() => [...matterList.value.values()])
  }

  onMounted(() => {
    let matterList: Matter[] = [
      { name: 'js', color: 'blue' },
      { name: '算法', color: 'green' },
    ]

    initMatterList(matterList)
  })
  return {
    curMatter,
    updateCurMatter,
    matterList,
    initMatterList,
    addMatter,
    removeMatter,
    getMatterList,
  }
})
