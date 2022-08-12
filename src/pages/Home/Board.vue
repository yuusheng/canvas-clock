<script setup lang="ts">
import ZebraStripeRect from '~/components/ZebraStripeRect.vue'
import BaseDateRect from '~/components/BaseDateRect.vue'
import DateSelect from './DateSelect.vue'
import { Day } from '~/utils'
import TimeTable from './TimeTable.vue'
import { useTime } from '~/store'
import { toRef } from 'vue'

const dayList = toRef(useTime(), 'dayList')
console.log(dayList.value)
</script>

<template>
  <main relative hfull p="t6%">
    <div flex="~ col" justify-center items-center>
      <DateSelect />

      <div flex>
        <BaseDateRect
          v-for="day of dayList"
          :today="day?.today"
          :date="day.date"
          :day="day.day"
        />
      </div>
    </div>
    <TimeTable />
    <!-- <ZebraStripeRect w12 h3 /> -->
  </main>
</template>
