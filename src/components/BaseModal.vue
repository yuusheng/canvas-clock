<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useCanvasSettings } from '~/store'

interface Props {
  content?: string
  modelValue: boolean
  title: string
}

const { content, modelValue, title } = defineProps<Props>()

const emits = defineEmits<{
  (e: 'update:modelValue', data: boolean): void
}>()

function toggleClose() {
  emits('update:modelValue', false)
}

const bgColor = toRef(useCanvasSettings(), 'bgColor')

const modalBg = computed(() => bgColor.value.bg.replace(/0.\d\d/, '1'))
</script>

<template>
  <teleport v-if="modelValue" to="body">
    <div
      ref="modal-backdrop"
      class="fixed z-10 inset-0 overflow-hidden bg-black bg-opacity-50"
    >
      <div
        class="flex items-start justify-center min-h-screen pt-24 text-center"
      >
        <!-- todo 背景颜色 -->
        <div
          ref="modal"
          class="rounded-lg text-left overflow-hidden shadow-xl p8 w-1/2 relative bg-white"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div
            class="i-mdi-close-circle-outline w12 h12 text-gray-4 absolute right-4 top-3 cursor-pointer"
            @click="toggleClose"
          />
          <h2 text-gray-7>
            {{ title }}
          </h2>
          {{ content }}
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>
