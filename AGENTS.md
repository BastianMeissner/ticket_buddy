# AGENTS.md — Primary Entry Point

> **This file is the single source of truth for all AI agents working on this project.**
> Only consult other folders (`.github/`, `docs/`, `tickets/`) when you need deeper context beyond what is documented here.

---

## Project Summary

**Ticket Buddy** is a Vue 3 web application that converts free-form notes into structured Jira tickets using AI. Users write notes (with a topic), an AI service processes them, and the result is a ready-to-use Jira ticket with summary, description, acceptance criteria, priority, and labels.

---

## Tech Stack

| Layer            | Technology                          |
| ---------------- | ----------------------------------- |
| Framework        | Vue 3 (Composition API, `<script setup>`) |
| Language         | TypeScript (strict mode)            |
| Build Tool       | Vite                                |
| UI Library       | Vuetify 3 + Material Design Icons (`@mdi/font`) |
| State Management | Pinia + `pinia-plugin-persistedstate` |
| Routing          | Vue Router                          |
| Testing          | Vitest                              |
| Responsive       | Desktop + Mobile (browser-based)    |

---

## Bootstrap & Commands

```bash
# Install dependencies — always run first
npm install

# Start development server
npm run dev

# Production build
npm run build

# Run tests — always run before committing
npm run test

# Lint
npm run lint
```

---

## Project Folder Structure

```
ticket_buddy/
├── .github/                  # GitHub Copilot instruction files
│   ├── copilot-instructions.md
│   └── instructions/         # Path-specific Copilot instructions
├── docs/                     # Architecture docs, feature specs
│   ├── architecture/
│   └── features/
├── tickets/                  # Task/ticket markdown files
│   └── _template.md
├── src/
│   ├── components/           # Reusable Vue components
│   ├── views/                # Route-level page components
│   ├── stores/               # Pinia stores
│   ├── services/             # AI service, API integrations
│   ├── types/                # TypeScript interfaces and types
│   ├── router/               # Vue Router configuration
│   └── main.ts               # App entry point
├── AGENTS.md                 # ← You are here
└── README.md                 # Project documentation (keep updated)
```

---

## Coding Rules

These rules are mandatory for every agent and contributor:

### Clean Code
- Write readable, self-documenting code with meaningful names.
- Keep functions small and focused on a single responsibility.
- Avoid code duplication — extract shared logic into composables or utilities.

### Testing
- **Every functionality must have its own dedicated test.**
- Always use Vitest following its standard conventions.
- **Always run tests before committing.** If tests fail, fix the code — do not commit broken code.
- **Tests are immutable** — only modify tests when there is a new functionality or a general functional change in the app. Never weaken or remove existing tests to make code pass.

### Documentation & Commits
- **Write thorough documentation before each commit and each pull request.** Document what changed, why, and any side effects.
- **Update `README.md` after each commit if the change affects setup, structure, features, or usage.**

### Dependencies
- Always use the **latest stable versions** of all dependencies to avoid vulnerabilities.
- Run `npm audit` periodically and resolve any issues.

### Standards
- Follow **Vue 3** standards: Composition API with `<script setup>`, single-file components.
- Follow **Vuetify 3** standards: use Vuetify components and theming, avoid custom CSS when a Vuetify solution exists.
- Follow **Vitest** standards: `describe`/`it` blocks, proper assertions, mocking where needed.

### Responsive Design
- The app must be fully usable in a web browser on both **desktop PC and smartphone**.
- Use Vuetify's responsive grid system and breakpoint utilities.

### Workflow
1. Read the relevant ticket in `tickets/`.
2. Implement the changes following all rules above.
3. Write/update tests for the new or changed functionality.
4. Run `npm run test` — all tests must pass.
5. Run `npm run lint` — no lint errors allowed.
6. Update documentation and `README.md` if needed.
7. Commit with a clear, descriptive message.

---

## Key Data Model

### Note
```typescript
interface Note {
  id: string
  input: string        // Raw user note (free-form text)
  ai_result: JiraTicket | null  // AI-generated structured ticket
  timestamp: string    // ISO 8601 timestamp
  topic: string        // Topic/category of the note
}
```

### JiraTicket
```typescript
interface JiraTicket {
  summary: string
  description: string
  acceptanceCriteria: string[]
  priority: string
  labels: string[]
}
```

---

## Routing

| Route      | View              | Purpose                              |
| ---------- | ----------------- | ------------------------------------ |
| `/splash`  | `SplashView.vue`  | 3s loading screen, then redirects to `/home` |
| `/home`    | `HomeView.vue`    | Main dashboard / landing page        |
| `/notes`   | `NotesView.vue`   | Create notes, generate Jira tickets  |
| `/notes/:id` | `NoteDetailView.vue` | View single note + generated ticket |

Default route (`/`) redirects to `/splash`.

---

## Additional Context

- For **architecture details and data flow**, see `docs/architecture/overview.md`.
- For **feature specifications**, see `docs/features/`.
- For **scoped coding instructions** (Vue components, TypeScript, tests, stores), see `.github/instructions/`.
- For **open tasks**, see `tickets/`.
