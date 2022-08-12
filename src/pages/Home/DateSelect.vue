<script setup lang="ts">
defineProps<{ curName?: string }>()
</script>

<template>
  <div flex spacex2 h8 mb1>
    <img
      src="../../static/images/left.png"
      p="x2 y1"
      class="w4 rounded text-2xl text-center border-1 border-gray-2 cursor-pointer"
    />

    <div
      flex
      p="x20 y1"
      class="rounded text-center items-center border-1 border-gray-2"
    >
      {{ curName || '昨天' }}
    </div>

    <img
      src="../../static/images/right.png"
      p="x2 y1"
      class="w4 rounded text-2xl text-center border-1 border-gray-2 cursor-pointer"
    />
  </div>
</template>
