<script setup lang="ts">
import Breathe from '~/components/Breathe.vue'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { mattersDB } from '~/db'
import { useCanvasSettings, useMatter } from '~/store'
import { countDown } from '~/utils'
import CountingButtons from './CountingButtons.vue'

const { bgColor } = storeToRefs(useCanvasSettings())
const { curMatter } = storeToRefs(useMatter())

onMounted(async () => {
  // mattersDB.add('matters', {
  //   name: 'test2',
  //   color: 'blue',
  //   time: new Date().getTime(),
  // })
  const res = await mattersDB.get('matters', 'color', 'blue')
  console.log('[start up]', res)
})

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
  counting.value = !counting.value
}

const breathe = ref()
const counting = ref(false)
const bgStyle = computed(() => `background-color: ${bgColor.value.button}`)
</script>

<template>
  <div h15>
    <button
      class="m2 w32 h8 border-0 rounded-4 cursor-pointer hover:op-90"
      text="sm white"
      :style="bgStyle"
      @click="clickStartCount"
      v-if="!counting"
    >
      开始计时
    </button>

    <CountingButtons @toggle-start-count="toggleStartCount" v-else />
  </div>

  <Breathe ref="breathe" />
</template>
