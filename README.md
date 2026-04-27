# Ticket Buddy

A Vue 3 web application that converts free-form notes into structured Jira tickets using AI.

## Tech Stack

- **Vue 3** — Composition API with `<script setup lang="ts">`
- **TypeScript** — Strict mode
- **Vite** — Build tool
- **Vuetify 3** — UI component library with Material Design Icons
- **Pinia** — State management, persisted to localStorage via `pinia-plugin-persistedstate`
- **Vue Router** — Client-side routing
- **Vitest** — Unit testing

## Getting Started

### Prerequisites

- Node.js (latest LTS)
- npm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Lint
npm run lint
```

## Project Structure

```
ticket_buddy/
├── .github/                  # GitHub Copilot instruction files
│   ├── copilot-instructions.md   # Repo-wide Copilot instructions
│   └── instructions/             # Path-specific Copilot instructions
├── docs/                     # Project documentation
│   ├── architecture/             # Architecture and design docs
│   └── features/                 # Feature specifications
├── tickets/                  # Task/ticket markdown files
├── src/
│   ├── components/           # Reusable Vue components
│   ├── views/                # Route-level page components
│   ├── stores/               # Pinia stores (persisted to localStorage)
│   ├── services/             # AI service integration
│   ├── types/                # TypeScript interfaces
│   ├── router/               # Vue Router configuration
│   └── main.ts               # App entry point
├── AGENTS.md                 # AI agent instructions (single source of truth)
└── README.md                 # This file
```

## Features

- **Note Input** — Write free-form notes with a topic.
- **AI Conversion** — Notes are converted into structured Jira tickets via AI.
- **Local Persistence** — Notes are saved in the browser's localStorage.
- **Responsive Design** — Works on desktop and mobile browsers.
- **Splash Screen** — 3-second loading screen on app start.

## Contributing

1. Pick a ticket from `tickets/`.
2. Follow the coding rules in `AGENTS.md`.
3. Write tests for all new functionality.
4. Run `npm run test` — all tests must pass before committing.
5. Update this README if the change affects setup, structure, or features.
6. Write clear documentation for each commit and pull request.

## License

Private
