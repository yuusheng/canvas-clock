<script setup lang="ts">
import CountingButton from './CountingButton.vue'
import pause from '~/static/images/pause-icon.png'
import start from '~/static/images/start-icon.png'
import stop from '~/static/images/stop-icon.png'
import {
  continueCountDown,
  onTime,
  stopAllSideEffect,
  stopCountDown,
} from '~/utils'

const emits = defineEmits<{
  (e: 'toggleStartCount'): void
}>()

function clickStop() {
  onTime()
  stopAllSideEffect()
  emits('toggleStartCount')
}
function clickPause() {
  stopCountDown()
}
function clickStart() {
  continueCountDown()
}
</script>

<template>
  <div flex space-x5 translate-y-3 items-center>
    <CountingButton w10 h10 :bg-img-url="pause" :click-event="clickPause" />
    <CountingButton w12 h12 :bg-img-url="stop" :click-event="clickStop" />
    <CountingButton w10 h10 :bg-img-url="start" :click-event="clickStart" />
  </div>
</template>
