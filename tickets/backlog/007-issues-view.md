# Ticket 007: Issues View

## Status: `todo`

## Priority: `medium`

## Description

Implement the Issues View (`IssuesView.vue`) — a filtered list showing only notes that have been generated as GitHub Issues (`outputType === 'issue'`). Each issue is displayed as a card with title, state chip, labels, assignees, timestamp, and body preview. Tapping a card navigates to the Note Detail View. An empty state is shown when no issues exist. This ticket builds on top of Tickets 001–003.

## Acceptance Criteria

### Issues List
- [ ] `IssuesView.vue` displays at `/issues` with the AppSidebar on the left (sidebar highlights "Issues" as active)
- [ ] Only notes where `outputType === 'issue'` and `ai_result` is a `GitHubIssue` are shown
- [ ] Notes are listed in reverse chronological order (newest first)
- [ ] Each issue is rendered as a `v-card` showing:
  - `GitHubIssue.title` as the card title
  - State as a `v-chip` — green (`#4CAF50`) for `open`, grey (`#9E9E9E`) for `closed`
  - Labels as a row of `v-chip` elements (`variant="tonal"`, `color="primary"`)
  - Assignees as small `v-chip` elements
  - Note timestamp (formatted)
  - First ~60 characters of the body as a preview (truncated with ellipsis)
- [ ] Tapping an issue card navigates to `/notes/:id`

### Empty State
- [ ] When no issues exist, a friendly empty state is shown with:
  - An icon (`mdi-alert-circle-plus-outline`)
  - Message: "No issues generated yet"
  - A CTA button linking to `/home` to create a new note

### UI & Theme
- [ ] Page header with title "Issues" and `mdi-alert-circle-outline` icon
- [ ] White background (`#FFFFFF`), issue cards with `elevation-1`, `rounded-lg`
- [ ] Left border accent in dark red (`#B71C1C`) on issue cards (distinct from ticket cards which use `#D32F2F`)
- [ ] Clean, GitHub-inspired layout — each card is scannable at a glance
- [ ] No right panel (exclusive to Home view)

### Responsiveness
- [ ] Layout is fully responsive on desktop and mobile
- [ ] Cards stack vertically on small screens

### Tests
- [ ] IssuesView renders the page header with title and icon
- [ ] IssuesView only displays notes with `outputType === 'issue'`
- [ ] IssuesView does not display notes with `outputType === 'ticket'` or no `outputType`
- [ ] Issue card renders title, state chip, labels, assignees, timestamp, and body preview
- [ ] State chip is green for `open` and grey for `closed`
- [ ] Clicking a card navigates to `/notes/:id`
- [ ] Empty state renders when no issues exist, with CTA button to `/home`
- [ ] `npm run test` passes with all tests green
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes with no errors

## Notes

- This view is read-only — no editing or generation happens here.
- The NoteDetailView must exist at least as a stub for navigation to work.
- Feature branch should be named `feature/007-issues-view`.
- Depends on Tickets 001–004 being completed first.

## Linked Docs

- [docs/features/issues.md](../../docs/features/issues.md)
- [docs/features/note-detail.md](../../docs/features/note-detail.md)
- [docs/architecture/overview.md](../../docs/architecture/overview.md)
