<script setup lang="ts">
import { computed, toRef, unref } from 'vue'
import { useCanvasSettings } from '~/store'
import { palette, PaletteType } from '~/utils'

const bgColor = toRef(useCanvasSettings(), 'bgColor')

const props = defineProps<{
  color?: PaletteType
}>()

const realColor = computed(() =>
  props.color ? palette[props.color] : unref(bgColor)
)
</script>

<template>
  <div class="rounded-1.4 rect"></div>
</template>

<style scoped>
.rect {
  --first: v-bind(realColor.bigger);
  --second: v-bind(realColor.smaller);
  background: repeating-linear-gradient(
    45deg,
    var(--first),
    var(--first) 5px,
    var(--second) 5px,
    var(--second) 10px
  );
}
</style>
