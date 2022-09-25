<script lang="ts">
interface Time {
  time: number
  matter?: MatterDBStores['matters']
}
</script>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue'
import ZebraStripeRect from '~/components/ZebraStripeRect.vue'
import { getAllMatters, MatterDBStores } from '~/db'
const times: Ref<Time[]> = ref([])
for (let i = 0; i < 24; i++) {
  times.value.push({ time: i })
}

onMounted(async () => {
  let matters = await getAllMatters('matters')
  matters.forEach((matter) => {
    times.value[matter.time.getHours()].matter = matter
  })
})
</script>

<template>
  <div p="t2 b17" m="b10" overflow-auto>
    <div v-for="time of times" wfull h18 :id="`t${time.time}`">
      <div text="xs gray4" flex items-center class="pl2 spacex3">
        <span> {{ `${time.time < 10 ? '0' : ''}${time.time}:00` }} </span>
        <div flex-1 h="0.2" relative bg-gray2>
          <ZebraStripeRect
            v-if="time.matter"
            class="absolute left-2 top-1 w30 h8"
            :color="time.matter.color"
          />
        </div>
      </div>
    </div>
  </div>
</template>
