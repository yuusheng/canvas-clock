<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <nav
    py10
    px3
    hidden
    md-flex="~ col"
    bg="gray-2/50"
    text-gray-5
    justify-between
  >
    <ul spacey-3 list-none>
      <li><div i-mdi-clock-outline @click="router.push('/')"></div></li>
      <li>
        <div i-mdi-google-analytics @click="router.push('/statistics')"></div>
      </li>
      <li><div i-mdi-account-outline @click="router.push('/user')"></div></li>
      <li><div i-mdi-star-outline @click="router.push('/star')"></div></li>
    </ul>

    <ul list-none>
      <li>
        <div i-mdi-cog-outline @click="router.push('/settings')"></div>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
ul > li > div {
  cursor: pointer;
}
</style>
