# Feature: Issues View

## Summary

A filtered list view showing only notes that have been generated as GitHub Issues (`outputType === 'issue'`). Provides a focused view for browsing all generated issues.

## Route

- **Path:** `/issues`
- **Component:** `IssuesView.vue`

## Layout

### Left — AppSidebar

- Persistent `v-navigation-drawer` with links to Home, Notes, Tickets, Issues.
- "Issues" link is highlighted as the active route.
- See [app-sidebar.md](app-sidebar.md) for full specification.

### Center — Issues List

The full-width main content area (no right panel on this view):

1. **Page header** — Title "Issues" with a `mdi-alert-circle-outline` icon.
2. **Issues list** — A list of `v-card` items for each note where `outputType === 'issue'` and `ai_result` is a `GitHubIssue`. Each card shows:
   - **Title** — The `GitHubIssue.title` as the card title.
   - **State** — `v-chip` colored green (`open`) or grey (`closed`).
   - **Labels** — Row of `v-chip` elements.
   - **Assignees** — Displayed as small `v-chip` elements or avatars.
   - **Timestamp** — When the note was created.
   - **Preview** — First ~60 characters of the body.
3. **Empty state** — If no issues exist, show a friendly message: "No issues generated yet" with an icon (`mdi-alert-circle-plus-outline`) and a button linking to `/home`.

### No Right Panel

This view does not have the recent notes right panel — that is exclusive to the Home view.

## UI / Theme

- **Background:** White (`#FFFFFF`).
- **Issue cards:** White `v-card` with `elevation-1`, `rounded-lg`. Left border accent in dark red (`#B71C1C`) to distinguish issue cards from ticket cards.
- **State chips:** Green (`#4CAF50`) for open, grey (`#9E9E9E`) for closed.
- **Labels:** `v-chip` with `variant="tonal"`, `color="primary"`.
- **Overall feel:** Clean, GitHub-inspired list. Easy to scan state and details at a glance.

## Behavior

1. User navigates to `/issues` via the sidebar.
2. Notes with `outputType === 'issue'` are filtered from the store and displayed in reverse chronological order.
3. Tapping an issue card navigates to `/notes/:id` (NoteDetailView) to see the full note and issue.

## Acceptance Criteria

- [ ] Issues view displays at `/issues` with the AppSidebar on the left.
- [ ] Only notes with `outputType === 'issue'` are shown.
- [ ] Each card displays title, state, labels, assignees, timestamp, and body preview.
- [ ] Tapping a card navigates to `/notes/:id`.
- [ ] Empty state is shown when no issues exist, with a CTA to create one.
- [ ] Follows the white-and-red theme with modern, clean design.
- [ ] Layout is fully responsive on desktop and mobile.
