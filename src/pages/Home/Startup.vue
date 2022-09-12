<script setup lang="ts">
import Breathe from '~/components/Breathe.vue'
import { storeToRefs } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import { mattersDB } from '~/db'
import { useCanvasSettings, useMatter } from '~/store'
import { countDown } from '~/utils'
import CountingButtons from './CountingButtons.vue'

const { bgColor } = storeToRefs(useCanvasSettings())
const { curMatter } = storeToRefs(useMatter())

async function clickStartCount() {
  breathe.value.teleportShow = true

  const teleportShowWatchStoper = watchEffect(() => {
    if (breathe.value.teleportShow === false) {
      countDown()
      toggleStartCount()
      teleportShowWatchStoper()
    }
  })
  return
  console.log(curMatter.value)
  if (!curMatter.value.name) {
    alert('请输入目标')
    return
  }

  mattersDB.add('matters', {
    name: curMatter.value.name,
    color: bgColor.value.button,
    time: new Date(),
  })
}

function toggleStartCount() {
  startCount.value = !startCount.value
}

const breathe = ref()
const startCount = ref(false)
const bgStyle = computed(() => `background-color: ${bgColor.value.button}`)
</script>

<template>
  <button
    class="m2 w32 h8 border-0 rounded-4 cursor-pointer hover:op-90"
    text="sm white"
    :style="bgStyle"
    @click="clickStartCount"
    v-if="!startCount"
  >
    开始计时
  </button>

  <CountingButtons @toggle-start-count="toggleStartCount" v-if="startCount" />

  <Breathe ref="breathe" />
</template>
