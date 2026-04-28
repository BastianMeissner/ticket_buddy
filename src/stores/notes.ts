import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Note } from '@/types'
import type { JiraTicket } from '@/types'
import type { GitHubIssue } from '@/types'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([])

  const getNotesByTopic = computed(() => {
    return (topic: string): Note[] => {
      return notes.value.filter((note) => note.topic === topic)
    }
  })

  function addNote(input: string, topic: string): Note {
    const note: Note = {
      id: crypto.randomUUID(),
      input,
      ai_result: null,
      timestamp: new Date().toISOString(),
      topic,
    }
    notes.value.push(note)
    return note
  }

  function deleteNote(id: string): void {
    const index = notes.value.findIndex((note) => note.id === id)
    if (index !== -1) {
      notes.value.splice(index, 1)
    }
  }

  function updateAiResult(id: string, aiResult: JiraTicket | GitHubIssue): void {
    const note = notes.value.find((note) => note.id === id)
    if (note) {
      note.ai_result = aiResult
    }
  }

  return {
    notes,
    getNotesByTopic,
    addNote,
    deleteNote,
    updateAiResult,
  }
}, {
  persist: true,
})
