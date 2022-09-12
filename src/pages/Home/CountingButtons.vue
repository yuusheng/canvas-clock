<script setup lang="ts">
import CountingButton from './CountingButton.vue'
import pause from '~/static/images/pause-icon.png'
import start from '~/static/images/start-icon.png'
import stop from '~/static/images/stop-icon.png'

function clickStop() {}
function clickPause() {}
function clickStart() {}
</script>

<template>
  <div flex space-x-4 translate-y-6>
    <CountingButton :bg-img-url="pause" :click-event="clickPause" />
    <CountingButton :bg-img-url="stop" :click-event="clickStop" />
    <CountingButton :bg-img-url="start" :click-event="clickStart" />
  </div>
</template>
