<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <dir py10 flex="~ col" justify-between>
    <ul>
      <li><a href="/">主页</a></li>
      <li><a @click="router.push('/statistics')">分析</a></li>
    </ul>

    <ul>
      <li><a @click="router.push('/settings')">设置</a></li>
    </ul>
  </dir>
</template>
