<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppSidebar from '@/components/AppSidebar.vue'

const route = useRoute()

const showSidebar = computed((): boolean => {
  return route.path !== '/splash'
})
</script>

<template>
  <v-app>
    <AppSidebar v-if="showSidebar" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
