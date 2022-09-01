<script setup lang="ts">
import { ref, toRef, watchEffect } from 'vue'
import { useCanvasSettings } from '~/store'

const bgColor = toRef(useCanvasSettings(), 'bgColor')

const teleportShow = ref(false)
watchEffect(() => {
  if (teleportShow.value === true) {
    setTimeout(() => {
      teleportShow.value = false
    }, 3000)
  }
})

defineExpose({ teleportShow })
</script>

<template>
  <teleport to="body" v-if="teleportShow">
    <div
      ref="modal-backdrop"
      :style="`background-color: ${bgColor.bigger};`"
      class="fixed z-10 inset-0 overflow-hidden bg-op-0"
    >
      <div
        class="h50 w50 rounded-full absolute top-1/2 left-1/2 -translate-x-25 -translate-y-15"
        :style="`background-color: ${bgColor.smaller}`"
      ></div>
    </div>
  </teleport>
</template>
