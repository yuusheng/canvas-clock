<script lang="ts">
</script>

<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'
import ZebraStripeRect from '~/components/ZebraStripeRect.vue'
import type { MatterDBStores } from '~/db'
import { getAllMatters } from '~/db'
interface Time {
  time: number
  matter?: MatterDBStores['matters']
}
const times: Ref<Time[]> = ref([])
for (let i = 0; i < 24; i++)
  times.value.push({ time: i })

onMounted(async () => {
  const matters = await getAllMatters('matters')
  matters.forEach((matter) => {
    times.value[matter.time.getHours()].matter = matter
  })
})
</script>

<template>
  <div p="t2 b17" m="b10" overflow-auto>
    <div v-for="time of times" :id="`t${time.time}`" :key="time.time" wfull h18>
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
