<script setup lang="ts">
import { ref, toRef, watchEffect } from 'vue'
import { useCanvasSettings } from '~/store'

const bgColor = toRef(useCanvasSettings(), 'bgColor')

const teleportShow = ref(false)
let timeout: number
watchEffect(() => {
  if (teleportShow.value === true) {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      teleportShow.value = false
    }, 4500)
  }
})

function toggleCancelBreathe() {
  clearTimeout(timeout)
  teleportShow.value = false
}

defineExpose({ teleportShow })
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="teleportShow"
        :style="`background-color: ${bgColor.button};`"
        flex="~ col"
        class="fixed space-y-16 z-10 inset-0 overflow-hidden bg-op-0 items-center justify-center"
      >
        <h2 font-light text-white class="fading-text">深呼吸</h2>
        <div class="twinkle-circle h50 w50 rounded-full"></div>
        <button
          p="x4 y1.5"
          text="white xs"
          rounded-5
          border-0
          cursor-pointer
          class="hover:bg-white"
          :style="`background-color: ${bgColor.smaller}`"
          @click="toggleCancelBreathe"
        >
          跳过呼吸
        </button>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.twinkle-circle {
  /* animation: twinkle 4s infinite; */
  background: radial-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0)
  );
  /* transform-origin: -6.25rem -6.25rem; */
  animation: resizing 5s infinite;
}

.fading-text {
  --opacity-value: 0.3;

  animation: fading 5s cubic-bezier(0.64, 0.005, 0.435, 1) infinite;
}

@keyframes fading {
  from {
    opacity: var(--opacity-value);
  }
  46% {
    opacity: 1;
  }
  97% {
    opacity: var(--opacity-value);
  }
  to {
    opacity: var(--opacity-value);
  }
}

@keyframes resizing {
  from {
    transform: scale(0.2);
  }
  46% {
    transform: scale(1.7);
  }
  97% {
    transform: scale(0.2);
  }
  to {
    transform: scale(0.2);
  }
}

@keyframes twinkle {
  from {
    background: radial-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0)
    );
  }
  70% {
    background: radial-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0)
    );
  }
  50% {
    background: radial-gradient(
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0)
    );
  }
  30% {
  }
  to {
    background: radial-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0)
    );
  }
}
</style>
