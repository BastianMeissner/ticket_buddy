<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const drawer = ref(true)

interface NavItem {
  title: string
  icon: string
  to: string
}

const navItems: NavItem[] = [
  { title: 'Home', icon: 'mdi-home', to: '/home' },
  { title: 'Notes', icon: 'mdi-note-text', to: '/notes' },
  { title: 'Tickets', icon: 'mdi-ticket-outline', to: '/tickets' },
  { title: 'Issues', icon: 'mdi-alert-circle-outline', to: '/issues' },
]
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :temporary="mobile"
    :permanent="!mobile"
    app
  >
    <v-list-item
      title="Ticket Buddy"
      prepend-icon="mdi-ticket-confirmation"
      class="pa-4"
    />
    <v-divider />
    <v-list
      density="compact"
      nav
    >
      <v-list-item
        v-for="item in navItems"
        :key="item.to"
        :title="item.title"
        :prepend-icon="item.icon"
        :to="item.to"
        rounded="lg"
        color="primary"
      />
    </v-list>
  </v-navigation-drawer>
</template>
