<script setup lang="ts">
import { ref } from 'vue'
import NewType from './NewType.vue'
import BaseInput from '~/components/BaseInput.vue'

const inputContent = ref('')
</script>

<template>
  <h2 m="y2" font-light>
    你想专注于什么？
  </h2>

  <NewType />

  <BaseInput v-model="inputContent" w="60%" placeholder="目标" />
</template>
