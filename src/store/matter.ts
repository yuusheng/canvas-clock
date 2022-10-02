import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Matter } from '~/utils'

export const useMatter = defineStore('matter', () => {
  const curMatter = ref<Matter>({ name: '', color: 'blue' })
  const matterList = ref<Map<string, Matter>>(new Map())

  const initialMatterList: Matter[] = [
    { name: '蓝色', color: 'blue' },
    { name: '绿色', color: 'green' },
    { name: '红色', color: 'red' },
    { name: '紫色', color: 'purple' },
    { name: '青色', color: 'cyan' },
  ]

  initMatterList(initialMatterList)

  function updateCurMatter(matter: Matter) {
    curMatter.value = matter
  }

  function initMatterList(data: Matter[]) {
    data.forEach((v) => {
      matterList.value.set(v.name, v)
    })
  }

  function addMatter(matter: Matter) {
    matterList.value.set(matter.name, matter)
  }

  function removeMatter(matter: Matter) {
    if (matterList.value.has(matter.name))
      matterList.value.delete(matter.name)
  }

  function getMatterList() {
    return computed(() => [...matterList.value.values()])
  }

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
