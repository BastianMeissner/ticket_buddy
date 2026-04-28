<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNotesStore } from '@/stores/notes'

const router = useRouter()
const notesStore = useNotesStore()

const searchQuery = ref('')

const sortedNotes = computed(() => {
  return [...notesStore.notes]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
})

const filteredNotes = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return sortedNotes.value
  return sortedNotes.value.filter((note) =>
    note.input.toLowerCase().includes(query) || note.topic.toLowerCase().includes(query),
  )
})

function navigateToNote(id: string): void {
  void router.push(`/notes/${id}`)
}

function truncateText(text: string, maxLength: number = 80): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

function formatTimestamp(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <v-container
    fluid
    class="pa-4 pa-md-6"
  >
    <!-- Page Header -->
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-6">
          <v-icon
            icon="mdi-note-text"
            class="mr-2"
            color="primary"
          />
          Notes
        </h1>
      </v-col>
    </v-row>

    <!-- Search Bar -->
    <v-row v-if="notesStore.notes.length > 0">
      <v-col
        cols="12"
        md="8"
        lg="6"
      >
        <v-text-field
          v-model="searchQuery"
          placeholder="Search notes by text or topic..."
          variant="outlined"
          rounded
          density="comfortable"
          prepend-inner-icon="mdi-magnify"
          clearable
          hide-details
          class="mb-4"
        />
      </v-col>
    </v-row>

    <!-- Notes List -->
    <v-row v-if="filteredNotes.length > 0">
      <v-col
        v-for="note in filteredNotes"
        :key="note.id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card
          elevation="1"
          rounded="lg"
          class="note-card"
          @click="navigateToNote(note.id)"
        >
          <v-card-text class="pa-4">
            <div class="d-flex align-center justify-space-between mb-2">
              <span class="text-caption text-medium-emphasis">
                {{ formatTimestamp(note.timestamp) }}
              </span>
              <v-icon
                :icon="note.ai_result ? 'mdi-check-circle' : 'mdi-clock-outline'"
                :color="note.ai_result ? 'success' : 'grey'"
                size="small"
              />
            </div>

            <p class="text-body-1 font-weight-medium mb-3">
              {{ truncateText(note.input) }}
            </p>

            <div class="d-flex align-center ga-2">
              <v-chip
                v-if="note.topic"
                size="small"
                variant="tonal"
                color="primary"
              >
                {{ note.topic }}
              </v-chip>
              <v-chip
                v-if="note.outputType === 'ticket'"
                size="small"
                variant="flat"
                color="primary"
              >
                Ticket
              </v-chip>
              <v-chip
                v-if="note.outputType === 'issue'"
                size="small"
                variant="flat"
                color="error"
              >
                Issue
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-row
      v-else-if="notesStore.notes.length === 0"
      justify="center"
    >
      <v-col
        cols="12"
        md="6"
        class="text-center pa-12"
      >
        <v-icon
          icon="mdi-note-plus-outline"
          size="80"
          color="primary"
          class="mb-4"
        />
        <h2 class="text-h6 font-weight-medium mb-2">
          No notes yet
        </h2>
        <p class="text-body-2 text-medium-emphasis mb-6">
          Create your first note to get started.
        </p>
        <v-btn
          variant="flat"
          color="primary"
          rounded="lg"
          prepend-icon="mdi-plus"
          to="/home"
        >
          Create Note
        </v-btn>
      </v-col>
    </v-row>

    <!-- No search results -->
    <v-row
      v-else
      justify="center"
    >
      <v-col
        cols="12"
        class="text-center pa-8"
      >
        <p class="text-body-1 text-medium-emphasis">
          No notes match your search.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.note-card {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.note-card:hover {
  background-color: #FFCDD2;
}
</style>
