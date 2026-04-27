# Ticket 004: Notes View

## Status: `todo`

## Priority: `medium`

## Description

Implement the Notes View (`NotesView.vue`) — a list of all saved notes with search/filter functionality. Each note is displayed as a card with timestamp, text preview, topic chip, type badge, and AI status indicator. Tapping a card navigates to the Note Detail View. An empty state is shown when no notes exist. This ticket builds on top of Tickets 001–003.

## Acceptance Criteria

### Notes List
- [ ] `NotesView.vue` displays at `/notes` with the AppSidebar on the left (sidebar highlights "Notes" as active)
- [ ] All saved notes from the Pinia store are listed in reverse chronological order (newest first)
- [ ] Each note is rendered as a `v-card` showing:
  - Formatted timestamp
  - First ~80 characters of the note input as preview (truncated with ellipsis)
  - Topic as a `v-chip` (if present)
  - Type badge — colored `v-chip`: red (`#D32F2F`) for "Ticket", dark red (`#B71C1C`) for "Issue" (only if `outputType` is set)
  - AI status indicator — `mdi-check-circle` (green) if `ai_result` exists, `mdi-clock-outline` (grey) if not
- [ ] Tapping a note card navigates to `/notes/:id`
- [ ] Note cards have `elevation-1`, `rounded-lg`, and hover effect with light red tint (`#FFCDD2`)

### Search & Filter
- [ ] A `v-text-field` search bar with `prepend-inner-icon="mdi-magnify"` is displayed above the notes list
- [ ] Search bar uses `variant="outlined"`, `rounded`, `density="comfortable"`
- [ ] Typing in the search bar filters notes by input text content or topic (case-insensitive)

### Empty State
- [ ] When no notes exist, a friendly empty state is shown with:
  - An icon (`mdi-note-plus-outline`)
  - Message: "No notes yet"
  - A CTA button linking to `/home` to create the first note

### UI & Theme
- [ ] Page header with title "Notes" and `mdi-note-text` icon
- [ ] White background (`#FFFFFF`), clean list interface
- [ ] No right panel (exclusive to Home view)

### Responsiveness
- [ ] Layout is fully responsive on desktop and mobile
- [ ] Cards stack vertically on small screens

### Tests
- [ ] NotesView renders the page header with title and icon
- [ ] NotesView renders all notes from the store
- [ ] Notes are displayed in reverse chronological order
- [ ] Note card renders timestamp, preview, topic chip, type badge, and AI status
- [ ] Search bar filters notes by text content
- [ ] Search bar filters notes by topic
- [ ] Clicking a card navigates to `/notes/:id`
- [ ] Empty state renders when no notes exist, with CTA button to `/home`
- [ ] `npm run test` passes with all tests green
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes with no errors

## Notes

- This view is read-only — no editing or generation happens here.
- Feature branch should be named `feature/004-notes-view`.
- Depends on Tickets 001–003 being completed first.

## Linked Docs

- [docs/features/notes.md](../../docs/features/notes.md)
- [docs/architecture/overview.md](../../docs/architecture/overview.md)
