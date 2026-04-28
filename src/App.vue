<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import AppSidebar from '@/components/AppSidebar.vue'

const route = useRoute()

const showSidebar = computed((): boolean => {
  return route.path !== '/splash'
})

const isSplash = computed((): boolean => {
  return route.path === '/splash'
})

// Live clock
const currentTime = ref('')

function updateClock(): void {
  currentTime.value = new Date().toLocaleTimeString('de-DE')
}

let clockInterval: ReturnType<typeof setInterval> | null = null

onMounted((): void => {
  updateClock()
  clockInterval = setInterval(updateClock, 1000)
})

onUnmounted((): void => {
  if (clockInterval) {
    clearInterval(clockInterval)
  }
})
</script>

<template>
  <v-app>
    <AppSidebar v-if="showSidebar" />
    <v-main>
      <router-view />
    </v-main>

    <!-- Live Clock (visible on all views except splash) -->
    <div
      v-if="!isSplash"
      class="live-clock text-caption text-medium-emphasis"
    >
      {{ currentTime }}
    </div>
  </v-app>
</template>

<style scoped>
.live-clock {
  position: fixed;
  bottom: 16px;
  right: 16px;
  font-family: monospace;
  color: #9E9E9E;
  z-index: 100;
}
</style>
