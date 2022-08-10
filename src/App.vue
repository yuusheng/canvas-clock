<script setup lang="ts">
import Navigator from './components/Navigator.vue'
</script>

<template>
  <div flex="~ ">
    <Navigator></Navigator>
    <router-view></router-view>
  </div>
</template>
