# Feature: Tickets View

## Summary

A filtered list view showing only notes that have been generated as Jira Tickets (`outputType === 'ticket'`). Provides a focused view for browsing all generated tickets.

## Route

- **Path:** `/tickets`
- **Component:** `TicketsView.vue`

## Layout

### Left — AppSidebar

- Persistent `v-navigation-drawer` with links to Home, Notes, Tickets, Issues.
- "Tickets" link is highlighted as the active route.
- See [app-sidebar.md](app-sidebar.md) for full specification.

### Center — Tickets List

The full-width main content area (no right panel on this view):

1. **Page header** — Title "Tickets" with a `mdi-ticket-outline` icon.
2. **Tickets list** — A list of `v-card` items for each note where `outputType === 'ticket'` and `ai_result` is a `JiraTicket`. Each card shows:
   - **Summary** — The `JiraTicket.summary` as the card title.
   - **Priority** — Displayed as a colored `v-chip` (e.g., red for High, orange for Medium, green for Low).
   - **Labels** — Row of `v-chip` elements.
   - **Timestamp** — When the note was created.
   - **Preview** — First ~60 characters of the description.
3. **Empty state** — If no tickets exist, show a friendly message: "No tickets generated yet" with an icon (`mdi-ticket-plus-outline`) and a button linking to `/home`.

### No Right Panel

This view does not have the recent notes right panel — that is exclusive to the Home view.

## UI / Theme

- **Background:** White (`#FFFFFF`).
- **Ticket cards:** White `v-card` with `elevation-1`, `rounded-lg`. Left border accent in red (`#D32F2F`) to distinguish ticket cards.
- **Priority chips:** Use red shades — `#B71C1C` (Critical/High), `#D32F2F` (Medium), `#E57373` (Low).
- **Labels:** `v-chip` with `variant="tonal"`, `color="primary"`.
- **Overall feel:** Professional, scannable list. Each card should be easy to read at a glance.

## Behavior

1. User navigates to `/tickets` via the sidebar.
2. Notes with `outputType === 'ticket'` are filtered from the store and displayed in reverse chronological order.
3. Tapping a ticket card navigates to `/notes/:id` (NoteDetailView) to see the full note and ticket.

## Acceptance Criteria

- [ ] Tickets view displays at `/tickets` with the AppSidebar on the left.
- [ ] Only notes with `outputType === 'ticket'` are shown.
- [ ] Each card displays summary, priority, labels, timestamp, and description preview.
- [ ] Tapping a card navigates to `/notes/:id`.
- [ ] Empty state is shown when no tickets exist, with a CTA to create one.
- [ ] Follows the white-and-red theme with modern, clean design.
- [ ] Layout is fully responsive on desktop and mobile.
