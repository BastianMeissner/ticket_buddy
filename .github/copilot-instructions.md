# Copilot Repository-Wide Instructions

> These instructions apply to all Copilot interactions in this repository.
> For the full project rules and conventions, refer to `AGENTS.md` in the project root — it is the single source of truth.

## Project

**Ticket Buddy** — A Vue 3 web app that converts free-form notes into structured Jira tickets or GitHub issues via AI.

## Tech Stack

- **Vue 3** with Composition API and `<script setup>` syntax
- **TypeScript** in strict mode
- **Vite** as the build tool
- **Vuetify 3** with `@mdi/font` for UI components and icons
- **Pinia** with `pinia-plugin-persistedstate` for state management (persisted to localStorage)
- **Vue Router** for routing
- **Vitest** for unit testing

## Source Layout

```
src/
├── components/    # Reusable Vue components
├── views/         # Route-level page components (SplashView, HomeView, NotesView, NoteDetailView, TicketsView, IssuesView)
├── stores/        # Pinia stores (notes store with localStorage persistence)
├── services/      # AI service integration
├── types/         # TypeScript interfaces (Note, JiraTicket, GitHubIssue)
├── router/        # Vue Router config
└── main.ts        # App entry, Vuetify/Pinia/Router plugin setup
```

## Key Conventions

- Always use Composition API with `<script setup lang="ts">`.
- Use Vuetify components — avoid custom CSS when Vuetify provides a solution.
- App must be responsive: fully usable on desktop and mobile browsers.
- Every functionality needs its own test (Vitest).
- Always use latest stable dependency versions.
- Always work on a **feature branch** per ticket — never commit directly to `main`.
- Create a **Pull Request** with useful comments for review before merging.
- **UI Theme:** White-and-red Vuetify theme (`#D32F2F` primary) with complementary red shades. Modern, colorful, and user-friendly design.
- **Global Layout:** Left `AppSidebar` navigation drawer on all views except splash (Home, Notes, Tickets, Issues). Home view has an additional right panel for recent notes.
- Refer to `AGENTS.md` for the complete set of coding rules and workflow.
