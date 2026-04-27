# Architecture Overview

## Application Purpose

Ticket Buddy converts free-form notes into structured Jira tickets or GitHub issues using AI. The user writes a note with a topic, selects an output type (Jira Ticket or GitHub Issue), and the app sends it to an AI service. The result is a structured Jira ticket or GitHub issue ready for use.

## High-Level Data Flow

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   User       │      │  AI Service  │      │ localStorage│
│  (Browser)   │      │  (External)  │      │ (Pinia +    │
│              │      │              │      │  Persist)   │
└──────┬───────┘      └──────┬───────┘      └──────┬──────┘
       │                     │                     │
       │  1. Write note      │                     │
       │  (input + topic)    │                     │
       │─────────────────────────────────────────►│
       │                     │   2. Save note      │
       │                     │                     │
       │  3. Select type     │                     │
       │  (ticket or issue)  │                     │
       │                     │                     │
       │  4. Send note       │                     │
       │  to AI service ────►│                     │
       │                     │                     │
       │  5. Receive         │                     │
       │  JiraTicket or  ◄───│                     │
       │  GitHubIssue        │                     │
       │                     │                     │
       │  6. Store ai_result─────────────────────►│
       │                     │                     │
       │  7. Display result  │                     │
       │◄─────────────────────────────────────────│
```

## Application Architecture

### Layers

1. **Views** (`src/views/`) — Route-level page components handling layout and page logic.
2. **Components** (`src/components/`) — Reusable UI building blocks used across views. Includes `AppSidebar.vue` (global navigation drawer shown on all views except splash).
3. **Stores** (`src/stores/`) — Pinia stores managing application state, persisted to localStorage.
4. **Services** (`src/services/`) — External integrations (AI API calls).
5. **Types** (`src/types/`) — TypeScript interfaces shared across layers.
6. **Router** (`src/router/`) — Vue Router configuration and route definitions.

### Routing Structure

| Route        | View                | Purpose                                    |
| ------------ | ------------------- | ------------------------------------------ |
| `/`          | —                   | Redirects to `/splash`                           |
| `/splash`    | `SplashView.vue`    | 3s loading screen, auto-redirects to `/home`     |
| `/home`      | `HomeView.vue`      | Main dashboard — note input, type select, generate |
| `/notes`     | `NotesView.vue`     | List all saved notes                               |
| `/notes/:id` | `NoteDetailView.vue`| View a single note with its generated ticket/issue |
| `/tickets`   | `TicketsView.vue`   | List notes with generated Jira tickets             |
| `/issues`    | `IssuesView.vue`    | List notes with generated GitHub issues            |

### State Management

- **Pinia** handles all application state.
- The notes store is persisted to `localStorage` via `pinia-plugin-persistedstate`, so notes survive page reloads and browser restarts.
- Components access state through store getters and modify it through store actions only.

## Responsive Design

- Vuetify 3's grid system (`v-container`, `v-row`, `v-col`) handles responsive layout.
- Breakpoint utilities (`xs`, `sm`, `md`, `lg`, `xl`) ensure the app works on desktop and mobile.
- No hardcoded widths — all layouts adapt to screen size.

## Key Design Decisions

1. **Client-side persistence** — Notes are stored in `localStorage` via Pinia persistence. No backend database needed for the MVP.
2. **AI as a service** — The AI integration is abstracted behind a service interface in `src/services/`, making it easy to swap providers.
3. **Vuetify for all UI** — Consistent Material Design look, built-in responsive utilities, and accessibility features out of the box.
4. **Splash screen as a route** — The splash is a dedicated route (`/splash`) that programmatically redirects to `/home` after 3 seconds, keeping it clean and testable.
5. **White-and-red theme** — The app uses a custom Vuetify theme with `primary: '#D32F2F'` (Material Red 700) and complementary red shades. White backgrounds, subtle elevation, and rounded corners create a modern aesthetic.
6. **Global sidebar navigation** — An `AppSidebar` component (`v-navigation-drawer`) is shown on all views except splash, providing consistent navigation to Home, Notes, Tickets, and Issues.
7. **Dual output types** — Notes can generate either a Jira Ticket or a GitHub Issue, selected via a dropdown. The `Note.outputType` field tracks the chosen type, and `ai_result` stores the corresponding `JiraTicket` or `GitHubIssue` interface.
