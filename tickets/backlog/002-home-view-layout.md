# Ticket 002: Home View Layout & Note Saving

## Status: `in-progress`

## Priority: `high`

## Description

Implement the full HomeView layout as described in the Home feature spec — without AI generation functionality. This includes the three-column layout (sidebar, center note input, right recent-notes panel), the note input textarea, output type select, "Save Note" button, and the recent notes panel. The "Generate" button should be present but disabled/non-functional (no AI service call). Saving a note stores it in the Pinia notes store and updates the recent notes panel. This ticket builds on top of the scaffold from Ticket 001.

## Acceptance Criteria

### Center — Note Input Area
- [ ] A large, auto-growing `v-textarea` with placeholder "Write your note here..." is displayed, styled with `rounded-lg` and subtle `elevation-1`
- [ ] A `v-text-field` for the note **topic** is present above the textarea
- [ ] A `v-select` below the textarea offers "Jira Ticket" (default, pre-selected) and "GitHub Issue" as options, using `density="comfortable"` and `variant="outlined"`
- [ ] A "Save Note" button (`variant="outlined"`, `color="primary"`) saves the note to the Pinia store with `id`, `input`, `topic`, `timestamp` — without setting `outputType` or `ai_result`
- [ ] A "Generate" button (`variant="flat"`, `color="primary"`) is visible but **disabled** with a tooltip indicating "Coming soon" (AI integration is not part of this ticket)
- [ ] "Save Note" is disabled when the textarea or topic is empty
- [ ] After saving, the textarea and topic field are cleared

### Right — Recent Notes Panel
- [ ] A side panel (`v-col md="3"`) is visible on `md` and up breakpoints listing recent notes from the store
- [ ] Each item shows: formatted timestamp, first ~50 characters of note input (truncated with ellipsis), and a type badge chip if `outputType` is set
- [ ] Clicking a note navigates to `/notes/:id`
- [ ] List items have a hover effect with light red tint (`#FFCDD2`)
- [ ] On `sm` and below, the panel moves below the main content area

### Layout & Responsiveness
- [ ] Three-column layout using `v-container` → `v-row` → `v-col`: sidebar (drawer), center (`md="6" lg="7"`), right (`md="3" lg="3"`)
- [ ] Layout is fully responsive — usable on desktop and mobile browsers
- [ ] Follows the white-and-red theme: white background, red primary actions, clean modern design with generous whitespace

### Store Integration
- [ ] `addNote` action exists in the notes store and generates a unique `id` and ISO 8601 `timestamp`
- [ ] Notes are persisted to localStorage via `pinia-plugin-persistedstate`
- [ ] Newly saved notes appear immediately in the recent notes panel

### Tests
- [ ] HomeView renders the textarea, topic field, select, and both action buttons
- [ ] "Save Note" button is disabled when textarea or topic is empty
- [ ] Saving a note adds it to the Pinia store and clears the input fields
- [ ] Recent notes panel renders notes from the store with truncated preview
- [ ] Recent notes panel is hidden on small viewports (or moves below content)
- [ ] `npm run test` passes with all tests green
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes with no errors

## Notes

- **No AI service integration** — the "Generate" button is present but disabled. AI functionality will be added in a future ticket.
- The `outputType` on a note is only set during generation, not during a plain save.
- Feature branch should be named `feature/002-home-view-layout`.
- Depends on Ticket 001 being completed first.

## Linked Docs

- [docs/features/home.md](../../docs/features/home.md)
- [docs/features/app-sidebar.md](../../docs/features/app-sidebar.md)
- [docs/architecture/overview.md](../../docs/architecture/overview.md)
