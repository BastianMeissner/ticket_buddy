<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

let timer: ReturnType<typeof setTimeout> | null = null

onMounted((): void => {
  timer = setTimeout(() => {
    void router.replace('/home')
  }, 3000)
})

onUnmounted((): void => {
  if (timer) {
    clearTimeout(timer)
  }
})
</script>

<template>
  <v-container
    class="fill-height d-flex flex-column align-center justify-center"
  >
    <v-icon
      icon="mdi-ticket-confirmation"
      size="80"
      color="primary"
      class="mb-4"
    />
    <h1 class="text-h3 font-weight-bold text-primary mb-2">
      Ticket Buddy
    </h1>
    <p class="text-body-1 text-medium-emphasis mb-8">
      Convert your notes into structured tickets
    </p>
    <v-progress-circular
      indeterminate
      color="primary"
      size="48"
    />
  </v-container>
</template>
