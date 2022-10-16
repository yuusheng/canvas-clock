<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import Canvas from './Canvas.vue'
import Board from './Board.vue'
import Header from './Header.vue'
import Startup from './Startup.vue'
import BaseInput from '~/components/BaseInput.vue'
import { useCanvasSettings } from '~/store'

const countTime = ref('25')

const { bgColor, min, sec } = storeToRefs(useCanvasSettings())

const start = ref(false)
function startup() {
  start.value = true
}

function stop() {
  start.value = false
}

const time = computed(() => `${String(min.value).padStart(2, '0')}:${String(sec.value).padStart(2, '0')}`)
</script>

<template>
  <div h-screen w-full flex items-center divide="gray/30" divide-x>
    <div
      class="w-full md-w-45% hfull flex"
      :style="`background-color: ${bgColor.bg}`"
    >
      <div wfull myauto translate-y="-15" flex="~ col" text-center items-center>
        <Header />
        <Canvas ref="canvas" />
        <BaseInput v-if="!start" v-model="countTime" />
        <div v-else>
          {{ time }}
        </div>

        <Startup @startup="startup" @stop="stop" />
      </div>
    </div>

    <div hidden md-block flex-1 hfull>
      <Board />
    </div>
  </div>
</template>
