---
applyTo: "src/stores/**"
---

# Pinia Store Instructions

## Setup

- Use the **setup store** syntax (function-based) with `defineStore`.
- All stores live in `src/stores/`, one store per file.
- Enable persistence via `pinia-plugin-persistedstate` for stores that hold user data.

## Notes Store

The primary store manages `Note` objects persisted to `localStorage`.

### Note Model

```typescript
interface Note {
  id: string
  input: string             // Raw user note (free-form text)
  ai_result: JiraTicket | null  // AI-generated structured Jira ticket
  timestamp: string         // ISO 8601 timestamp
  topic: string             // Topic/category of the note
}
```

### JiraTicket Model

```typescript
interface JiraTicket {
  summary: string
  description: string
  acceptanceCriteria: string[]
  priority: string
  labels: string[]
}
```

### Required Actions

- `addNote(input, topic)` — Create a new note with auto-generated `id` and `timestamp`.
- `deleteNote(id)` — Remove a note by ID.
- `updateAiResult(id, aiResult)` — Store the AI-generated ticket on a note.
- Filtering/search by `topic` via a getter.

## Conventions

- Use `ref()` for state, `computed()` for getters, plain functions for actions.
- Always type the store state, getters, and action parameters.
- Enable persistence:
  ```typescript
  defineStore('notes', () => { /* ... */ }, { persist: true })
  ```
- Keep business logic in the store — components should only call store actions.
