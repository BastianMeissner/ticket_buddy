# Ticket 006: Tickets View

## Status: `todo`

## Priority: `medium`

## Description

Implement the Tickets View (`TicketsView.vue`) — a filtered list showing only notes that have been generated as Jira Tickets (`outputType === 'ticket'`). Each ticket is displayed as a card with summary, priority chip, labels, timestamp, and description preview. Tapping a card navigates to the Note Detail View. An empty state is shown when no tickets exist. This ticket builds on top of Tickets 001–003.

## Acceptance Criteria

### Tickets List
- [ ] `TicketsView.vue` displays at `/tickets` with the AppSidebar on the left (sidebar highlights "Tickets" as active)
- [ ] Only notes where `outputType === 'ticket'` and `ai_result` is a `JiraTicket` are shown
- [ ] Notes are listed in reverse chronological order (newest first)
- [ ] Each ticket is rendered as a `v-card` showing:
  - `JiraTicket.summary` as the card title
  - Priority as a colored `v-chip` (`#B71C1C` High, `#D32F2F` Medium, `#E57373` Low)
  - Labels as a row of `v-chip` elements (`variant="tonal"`, `color="primary"`)
  - Note timestamp (formatted)
  - First ~60 characters of the description as a preview (truncated with ellipsis)
- [ ] Tapping a ticket card navigates to `/notes/:id`

### Empty State
- [ ] When no tickets exist, a friendly empty state is shown with:
  - An icon (`mdi-ticket-plus-outline`)
  - Message: "No tickets generated yet"
  - A CTA button linking to `/home` to create a new note

### UI & Theme
- [ ] Page header with title "Tickets" and `mdi-ticket-outline` icon
- [ ] White background (`#FFFFFF`), ticket cards with `elevation-1`, `rounded-lg`
- [ ] Left border accent in red (`#D32F2F`) on ticket cards
- [ ] Professional, scannable layout — each card is readable at a glance
- [ ] No right panel (exclusive to Home view)

### Responsiveness
- [ ] Layout is fully responsive on desktop and mobile
- [ ] Cards stack vertically on small screens

### Tests
- [ ] TicketsView renders the page header with title and icon
- [ ] TicketsView only displays notes with `outputType === 'ticket'`
- [ ] TicketsView does not display notes with `outputType === 'issue'` or no `outputType`
- [ ] Ticket card renders summary, priority chip, labels, timestamp, and description preview
- [ ] Clicking a card navigates to `/notes/:id`
- [ ] Empty state renders when no tickets exist, with CTA button to `/home`
- [ ] `npm run test` passes with all tests green
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes with no errors

## Notes

- This view is read-only — no editing or generation happens here.
- The NoteDetailView (Ticket 005 or later) must exist at least as a stub for navigation to work.
- Feature branch should be named `feature/006-tickets-view`.
- Depends on Tickets 001–005 being completed first.

## Linked Docs

- [docs/features/tickets.md](../../docs/features/tickets.md)
- [docs/features/note-detail.md](../../docs/features/note-detail.md)
- [docs/architecture/overview.md](../../docs/architecture/overview.md)
