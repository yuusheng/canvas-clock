<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import CountingButtons from './CountingButtons.vue'
import Breathe from '~/components/Breathe.vue'
import { addNewMatter, mattersDB } from '~/db'
import { useCanvasSettings, useMatter } from '~/store'
import { countDown } from '~/utils'

const { bgColor } = storeToRefs(useCanvasSettings())
const { curMatter } = storeToRefs(useMatter())

const breathe = ref()
const counting = ref(false)
const bgStyle = computed(() => `background-color: ${bgColor.value.button}`)

async function clickStartCount() {
  breathe.value.teleportShow = true

  const teleportShowWatchStoper = watchEffect(() => {
    console.log(`[breathe ${breathe.value.teleportShow ? 'open' : 'close'}]`)
    if (breathe.value.teleportShow === false) {
      countDown()
      toggleStartCount()
      teleportShowWatchStoper()
    }
  })

  await addNewMatter(curMatter.value.name, curMatter.value.color)
  return
  console.log(curMatter.value)
  if (!curMatter.value.name) {
    alert('请输入目标')
    return
  }
}

function toggleStartCount() {
  counting.value = !counting.value
}
</script>

<template>
  <div h15>
    <button
      v-if="!counting"
      class="m2 w32 h8 border-0 rounded-4 cursor-pointer hover:op-90"
      text="sm white"
      :style="bgStyle"
      @click="clickStartCount"
    >
      开始计时
    </button>

    <CountingButtons v-else @toggle-start-count="toggleStartCount" />
  </div>

  <Breathe ref="breathe" />
</template>
