<script setup lang="ts">
import Navigator from './components/Navigator.vue'
</script>

<template>
  <div flex="~" h-screen overflow-hidden>
    <Navigator></Navigator>
    <router-view></router-view>
  </div>
</template>
