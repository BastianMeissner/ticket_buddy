# Ticket Buddy

A Vue 3 web application that converts free-form notes into structured **Jira tickets** or **GitHub issues** using AI.

## Tech Stack

| Layer            | Technology                                        |
| ---------------- | ------------------------------------------------- |
| Framework        | Vue 3 (Composition API, `<script setup lang="ts">`) |
| Language         | TypeScript (strict mode)                          |
| Build Tool       | Vite                                              |
| UI Library       | Vuetify 3 + Material Design Icons (`@mdi/font`)  |
| State Management | Pinia + `pinia-plugin-persistedstate`             |
| Routing          | Vue Router                                        |
| Testing          | Vitest                                            |

## Getting Started

### Prerequisites

- **Node.js** (latest LTS recommended, ≥ 18)
- **npm** (comes with Node.js)

### Setup

```bash
# Install dependencies — always run first
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests — always run before committing
npm run test

# Lint
npm run lint
```

## Project Structure

```
ticket_buddy/
├── .github/                  # GitHub Copilot instruction files
│   ├── copilot-instructions.md   # Repo-wide Copilot instructions
│   └── instructions/             # Path-specific Copilot instructions (7 files)
├── docs/                     # Project documentation
│   ├── architecture/             # Architecture overview & data flow
│   └── features/                 # Feature specs (splash, home, notes, etc.)
├── tickets/                  # Task/ticket markdown files
│   └── _template.md              # Template for new tickets
├── src/                      # (to be created)
│   ├── components/           # Reusable Vue components (e.g. AppSidebar)
│   ├── views/                # Route-level page components
│   ├── stores/               # Pinia stores (persisted to localStorage)
│   ├── services/             # AI service integration
│   ├── types/                # TypeScript interfaces (Note, JiraTicket, GitHubIssue)
│   ├── router/               # Vue Router configuration
│   └── main.ts               # App entry point (Vuetify/Pinia/Router setup)
├── AGENTS.md                 # AI agent instructions (single source of truth)
└── README.md                 # This file
```

## Features

- **Note Input** — Write free-form notes with a topic/category.
- **Output Type Selection** — Choose between Jira Ticket or GitHub Issue per note.
- **AI Conversion** — Notes are converted into structured Jira tickets or GitHub issues via AI.
- **Local Persistence** — Notes and results are saved in the browser's localStorage.
- **Responsive Design** — Fully usable on desktop and mobile browsers.
- **Splash Screen** — 3-second loading screen on app start, then redirect to home.
- **Global Sidebar** — Left navigation drawer on all views except splash (Home, Notes, Tickets, Issues).
- **Filtered Views** — Dedicated views for all tickets and all issues.

## Routing

| Route        | View                | Purpose                                         |
| ------------ | ------------------- | ------------------------------------------------ |
| `/`          | —                   | Redirects to `/splash`                           |
| `/splash`    | `SplashView`        | 3s loading screen → redirects to `/home`         |
| `/home`      | `HomeView`          | Dashboard: note input, type select, generate     |
| `/notes`     | `NotesView`         | List all saved notes                             |
| `/notes/:id` | `NoteDetailView`    | View single note + generated ticket/issue        |
| `/tickets`   | `TicketsView`       | List notes with generated Jira tickets           |
| `/issues`    | `IssuesView`        | List notes with generated GitHub issues          |

## UI Theme

- **Primary color:** `#D32F2F` (red) with complementary shades (`#F44336`, `#E57373`, `#FFCDD2`, `#B71C1C`)
- **Background:** White
- **Style:** Modern, clean typography, generous whitespace, subtle elevation, rounded corners

## Documentation

| Document | Purpose |
| -------- | ------- |
| [AGENTS.md](AGENTS.md) | Single source of truth for all coding rules & workflow |
| [docs/architecture/overview.md](docs/architecture/overview.md) | Architecture, data flow, layer descriptions |
| [docs/features/](docs/features/) | Feature specifications per view |
| [.github/instructions/](.github/instructions/) | Scoped Copilot coding instructions |
| [tickets/](tickets/) | Open tasks / work items |

## Contributing

1. Pick a ticket from `tickets/`.
2. Pull latest `main`: `git fetch origin && git pull origin main`.
3. Create a **feature branch** from `main` (e.g., `feature/001-scaffold-vue-project`).
4. Follow the coding rules in `AGENTS.md`.
5. Write tests for all new functionality (Vitest).
6. Run `npm run test` — all tests must pass before committing.
7. Run `npm run lint` — no lint errors allowed.
8. Update this README if the change affects setup, structure, or features.
9. Commit with a clear, descriptive message.
10. Push and create a **Pull Request into `main`** with a summary and list of changed files.
11. Wait for review and approval before merging.

## License

Private

## AI VITE_GITHUB_TOKEN (german instructions)

1. Gehe zu github.com → Klick auf dein Profilbild (oben rechts) → Settings
2. Links ganz unten: Developer settings
3. Personal access tokens → Tokens (classic) oder Fine-grained tokens
4. Generate new token
5. Gib dem Token einen Namen (z.B. ticket-buddy-ai)
6. Scope: Für GitHub Models brauchst du mindestens keine speziellen Scopes — der Zugang läuft über dein Copilot-Abo