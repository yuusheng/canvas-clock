<script lang="ts">
interface Time {
  time: string
  matter: string
}
</script>

<script setup lang="ts">
const times: Time[] = []
for (let i = 0; i < 24; i++) {
  times.push({ time: `${i < 10 ? '0' : ''}${i}:00`, matter: 'matter' })
}
</script>

<template>
  <div p="t2 b17" m="b10" overflow-auto>
    <div v-for="time of times" wfull h18>
      <div text="xs gray4" flex items-center class="pl2 spacex3">
        <span>
          {{ time.time }}
        </span>
        <div flex-1 h="0.2" bg-gray2></div>
      </div>

      <div></div>
    </div>
  </div>
</template>
