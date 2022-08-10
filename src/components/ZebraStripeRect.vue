<script setup lang="ts">
import { toRef } from 'vue'
import { useCanvasSettings } from '~/store'

const bgColor = toRef(useCanvasSettings(), 'bgColor')
</script>

<template>
  <div class="rounded-1.4 rect"></div>
</template>

<style scoped>
.rect {
  --first: v-bind(bgColor.bigger);
  --second: v-bind(bgColor.smaller);
  background: repeating-linear-gradient(
    45deg,
    var(--first),
    var(--first) 5px,
    var(--second) 5px,
    var(--second) 10px
  );
}
</style>
