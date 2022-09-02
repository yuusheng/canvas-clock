<script setup lang="ts">
import Breathe from '~/components/Breathe.vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { mattersDB } from '~/db'
import { useCanvasSettings, useMatter } from '~/store'
import { countDown } from '~/utils'

const { bgColor } = storeToRefs(useCanvasSettings())
const { curMatter } = storeToRefs(useMatter())

async function toggleStartCount() {
  breathe.value.teleportShow = true

  return
  console.log(curMatter.value)
  if (!curMatter.value.name) {
    alert('请输入目标')
    return
  }
  countDown()

  mattersDB.add('matters', {
    name: curMatter.value.name,
    color: bgColor.value.button,
    time: new Date(),
  })
}

const breathe = ref()
</script>

<template>
  <button
    class="m2 w32 h8 border-0 rounded-4 cursor-pointer"
    text="sm white"
    :style="`background-color: ${bgColor.button}`"
    @click="toggleStartCount"
  >
    开始计时
  </button>

  <Breathe ref="breathe" />
</template>
