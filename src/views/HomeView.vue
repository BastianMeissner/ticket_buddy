<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNotesStore } from '@/stores/notes'

const router = useRouter()
const notesStore = useNotesStore()

const noteInput = ref('')
const topicInput = ref('')
const outputType = ref<'ticket' | 'issue'>('ticket')

const outputTypeOptions = [
  { title: 'Jira Ticket', value: 'ticket' as const },
  { title: 'GitHub Issue', value: 'issue' as const },
]

const isSaveDisabled = computed((): boolean => {
  return noteInput.value.trim() === '' || topicInput.value.trim() === ''
})

function saveNote(): void {
  if (isSaveDisabled.value) return
  notesStore.addNote(noteInput.value.trim(), topicInput.value.trim())
  noteInput.value = ''
  topicInput.value = ''
}

function navigateToNote(id: string): void {
  void router.push(`/notes/${id}`)
}

function truncateText(text: string, maxLength: number = 50): string {
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

const recentNotes = computed(() => {
  return [...notesStore.notes]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10)
})

</script>

<template>
  <v-container
    fluid
    class="pa-4 pa-md-6"
  >
    <v-row>
      <!-- Center — Note Input Area -->
      <v-col
        cols="12"
        md="8"
        lg="7"
      >
        <h1 class="text-h4 font-weight-bold mb-6">
          Home
        </h1>

        <v-text-field
          v-model="topicInput"
          label="Topic"
          placeholder="Enter a topic..."
          variant="outlined"
          density="comfortable"
          rounded="lg"
          class="mb-4"
          prepend-inner-icon="mdi-tag-outline"
        />

        <v-textarea
          v-model="noteInput"
          placeholder="Write your note here..."
          variant="outlined"
          rounded="lg"
          auto-grow
          rows="6"
          class="mb-4"
          elevation="1"
        />

        <v-select
          v-model="outputType"
          :items="outputTypeOptions"
          item-title="title"
          item-value="value"
          label="Output Type"
          variant="outlined"
          density="comfortable"
          rounded="lg"
          class="mb-4"
          prepend-inner-icon="mdi-format-list-bulleted-type"
        />

        <div class="d-flex ga-3">
          <v-btn
            variant="outlined"
            color="primary"
            rounded="lg"
            prepend-icon="mdi-content-save"
            :disabled="isSaveDisabled"
            @click="saveNote"
          >
            Save Note
          </v-btn>

          <v-tooltip
            text="Coming soon"
            location="top"
          >
            <template #activator="{ props }">
              <div v-bind="props">
                <v-btn
                  variant="flat"
                  color="primary"
                  rounded="lg"
                  prepend-icon="mdi-auto-fix"
                  disabled
                >
                  Generate
                </v-btn>
              </div>
            </template>
          </v-tooltip>
        </div>
      </v-col>

      <!-- Right — Recent Notes Panel -->
      <v-col
        cols="12"
        md="4"
        lg="3"
        class="mt-6 mt-md-0"
      >
        <v-card
          rounded="lg"
          elevation="1"
        >
          <v-card-title class="text-subtitle-1 font-weight-bold pa-4">
            <v-icon
              icon="mdi-history"
              class="mr-2"
            />
            Recent Notes
          </v-card-title>
          <v-divider />
          <v-list
            v-if="recentNotes.length > 0"
            density="compact"
          >
            <v-list-item
              v-for="note in recentNotes"
              :key="note.id"
              class="recent-note-item"
              @click="navigateToNote(note.id)"
            >
              <v-list-item-title class="text-body-2 font-weight-medium">
                {{ truncateText(note.input) }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-caption">
                {{ formatTimestamp(note.timestamp) }}
              </v-list-item-subtitle>
              <template #append>
                <v-chip
                  v-if="note.outputType"
                  size="x-small"
                  :color="note.outputType === 'ticket' ? 'primary' : 'secondary'"
                  variant="tonal"
                >
                  {{ note.outputType === 'ticket' ? 'Ticket' : 'Issue' }}
                </v-chip>
              </template>
            </v-list-item>
          </v-list>
          <v-card-text
            v-else
            class="text-body-2 text-medium-emphasis text-center pa-6"
          >
            No notes yet. Save your first note!
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.recent-note-item:hover {
  background-color: #FFCDD2;
}
</style>
