# AGENTS.md — Primary Entry Point

> **This file is the single source of truth for all AI agents working on this project.**
> Only consult other folders (`.github/`, `docs/`, `tickets/`) when you need deeper context beyond what is documented here.

---

## Project Summary

**Ticket Buddy** is a Vue 3 web application that converts free-form notes into structured Jira tickets or GitHub issues using AI. Users write notes (with a topic), select an output type (Jira Ticket or GitHub Issue), and the AI service generates a ready-to-use structured result.

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

### UI Theme & Usability
- **Color scheme:** White backgrounds with red as the primary color (`#D32F2F`). Complementary red shades (e.g., `#F44336`, `#E57373`, `#FFCDD2`, `#B71C1C`) may be used for accents, hover states, gradients, and secondary elements to create a colorful, vibrant design.
- **Modern aesthetic:** Clean typography, generous whitespace, subtle elevation (`elevation` prop on cards/surfaces), rounded corners (`rounded` prop), and smooth transitions. The UI should feel polished and contemporary.
- **Usability-first:** Interfaces must be simple, self-explanatory, and require minimal learning. Use clear call-to-action buttons, logical grouping, and intuitive navigation. Avoid visual clutter.
- **Global layout (all views except splash):**
  - **Left:** `AppSidebar` — persistent `v-navigation-drawer` with navigation links: Home (`mdi-home`), Notes (`mdi-note-text`), Tickets (`mdi-ticket-outline`), Issues (`mdi-alert-circle-outline`). Collapsible on mobile.
  - **Center:** Main content area specific to each view.
  - **Right (Home view only):** Recent notes panel showing timestamp and preview.
- **Vuetify theming:** Define a custom Vuetify theme with `primary: '#D32F2F'` and appropriate complementary colors. Apply the theme globally in `main.ts`.

### Ticket Status Flow

Every ticket follows this lifecycle:

| Status | When |
| --- | --- |
| `todo` | Ticket is in the backlog, not yet started |
| `in-progress` | Work has started — set when the agent begins implementation |
| `in-review` | A Pull Request has been created — set when the PR is opened |
| `done` | PR is merged and ticket is complete |

Always update the ticket's `## Status` field when transitioning between states.

### Workflow
1. Read the relevant ticket in `tickets/` and **set its status to `in-progress`**.
2. **Pull the latest `main`** — run `git fetch origin && git pull origin main` to ensure you start from the latest code.
3. **Create a feature branch** from `main` named after the ticket (e.g., `feature/001-scaffold-vue-project`).
4. Implement the changes following all rules above.
5. Write/update tests for the new or changed functionality.
6. Run `npm run test` — all tests must pass.
7. Run `npm run lint` — no lint errors allowed.
8. Update documentation and `README.md` if needed.
9. Commit with a clear, descriptive message.
10. **Push the feature branch and create a Pull Request into `main`** with:
    - A summary of what was changed and why.
    - List of files modified.
    - Any side effects or things to watch out for.
    - Link to the relevant ticket.
11. **Set the ticket status to `in-review`.**
12. Wait for review — do **not** merge into `main` without approval.
13. After merge, **set the ticket status to `done`**.

---

## Key Data Model

### Note
```typescript
interface Note {
  id: string
  input: string                          // Raw user note (free-form text)
  ai_result: JiraTicket | GitHubIssue | null  // AI-generated result (ticket or issue)
  outputType?: 'ticket' | 'issue'        // Only set when user clicks "Generate"
  timestamp: string                      // ISO 8601 timestamp
  topic: string                          // Topic/category of the note
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

### GitHubIssue
```typescript
interface GitHubIssue {
  title: string
  body: string
  labels: string[]
  assignees: string[]
  milestone: string | null
  state: 'open' | 'closed'
  stateReason: 'completed' | 'not_planned' | 'duplicate' | 'reopened' | null
  type: string | null
}
```

---

## Routing

| Route      | View              | Purpose                              |
| ---------- | ----------------- | ------------------------------------ |
| `/splash`    | `SplashView.vue`    | 3s loading screen, then redirects to `/home`     |
| `/home`      | `HomeView.vue`      | Main dashboard — note input, type select, generate |
| `/notes`     | `NotesView.vue`     | List all saved notes                               |
| `/notes/:id` | `NoteDetailView.vue`| View single note + generated ticket/issue          |
| `/tickets`   | `TicketsView.vue`   | List notes with generated Jira tickets             |
| `/issues`    | `IssuesView.vue`    | List notes with generated GitHub issues            |

Default route (`/`) redirects to `/splash`.

---

## Additional Context

- For **architecture details and data flow**, see `docs/architecture/overview.md`.
- For **feature specifications**, see `docs/features/`.
- For **scoped coding instructions** (Vue components, TypeScript, tests, stores), see `.github/instructions/`.
- For **open tasks**, see `tickets/`.
