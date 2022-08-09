<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <ul>
    <li><a href="/">主页</a></li>
    <li><a @click="router.push('/statistics')">分析</a></li>
  </ul>
  <router-view></router-view>
</template>
