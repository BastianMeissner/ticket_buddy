# Ticket 005: Note Detail View

## Status: `todo`

## Priority: `medium`

## Description

Implement the Note Detail View (`NoteDetailView.vue`) — a single-note view displaying the full note content along with its AI-generated result (Jira Ticket or GitHub Issue), if one exists. Includes back navigation, the complete note text, and a structured rendering of the AI output. If no AI result exists, a friendly empty state with a generate option is shown. This ticket builds on top of Tickets 001–003.

## Acceptance Criteria

### Note Content
- [ ] `NoteDetailView.vue` displays at `/notes/:id` with the AppSidebar on the left
- [ ] A "Back to Notes" button with `mdi-arrow-left` icon at the top navigates to `/notes`
- [ ] Note is displayed in a `v-card` showing:
  - Topic as a heading or `v-chip`
  - Formatted timestamp
  - Full note text (`input`) in a readable format
  - Output type chip ("Jira Ticket" or "GitHub Issue") if `outputType` is set
- [ ] If the note `id` does not exist in the store, a 404/not-found state is shown

### AI Result — Jira Ticket (`outputType === 'ticket'`)
- [ ] Displayed in a separate `v-card` below the note card with a red top border (`#D32F2F`)
- [ ] Renders all `JiraTicket` fields:
  - Summary as a bold heading
  - Description as a full text block
  - Acceptance Criteria as a checklist (`v-list` with `mdi-check` icons)
  - Priority as a colored `v-chip`
  - Labels as a row of `v-chip` elements

### AI Result — GitHub Issue (`outputType === 'issue'`)
- [ ] Displayed in a separate `v-card` below the note card with a red top border (`#D32F2F`)
- [ ] Renders all `GitHubIssue` fields:
  - Title as a bold heading
  - Body as a full text block
  - State as a `v-chip` — green (`#4CAF50`) for open, grey (`#9E9E9E`) for closed
  - Labels as a row of `v-chip` elements
  - Assignees as a row of `v-chip` elements
  - Milestone (if present)
  - Type (if present)

### No AI Result State
- [ ] If `ai_result` is null, show a message: "No AI result generated yet"
- [ ] A "Generate" button is shown that navigates to `/home` (or triggers generation if AI service is available)

### UI & Theme
- [ ] Note card with `elevation-2`, `rounded-lg`, generous padding
- [ ] AI result card with subtle red top border to visually distinguish generated output
- [ ] Chips use red palette — `#D32F2F` primary, `#E57373` secondary, `#FFCDD2` subtle
- [ ] Clean, readable detail view with ample whitespace
- [ ] No right panel (exclusive to Home view)

### Responsiveness
- [ ] Layout is fully responsive on desktop and mobile
- [ ] Content stacks naturally on small screens

### Tests
- [ ] NoteDetailView renders the note's topic, timestamp, and full text
- [ ] NoteDetailView renders Jira Ticket fields when `outputType === 'ticket'` and `ai_result` exists
- [ ] NoteDetailView renders GitHub Issue fields when `outputType === 'issue'` and `ai_result` exists
- [ ] NoteDetailView shows empty state when `ai_result` is null
- [ ] Back button navigates to `/notes`
- [ ] Not-found state is shown for non-existent note IDs
- [ ] `npm run test` passes with all tests green
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes with no errors

## Notes

- This view is primarily read-only — displaying existing data.
- Feature branch should be named `feature/005-note-detail-view`.
- Depends on Tickets 001–003 being completed first.

## Linked Docs

- [docs/features/note-detail.md](../../docs/features/note-detail.md)
- [docs/architecture/overview.md](../../docs/architecture/overview.md)
