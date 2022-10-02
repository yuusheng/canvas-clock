<script setup lang="ts">
defineProps<{
  placeholder?: string
  modelValue?: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', data: string): void
}>()

function input(e: any) {
  emits('update:modelValue', e.target.value)
}
</script>

<template>
  <input
    type="text"
    :placeholder="placeholder"
    :value="modelValue"
    class="h7 my2 px2 outline-none border-none rounded-7 text-center"
    bg="gray-3/30"
    @input="input"
  >
</template>
