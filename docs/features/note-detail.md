# Feature: Note Detail View

## Summary

Displays a single note's full content along with its AI-generated result (Jira Ticket or GitHub Issue), if one has been generated.

## Route

- **Path:** `/notes/:id`
- **Component:** `NoteDetailView.vue`

## Layout

### Left — AppSidebar

- Persistent `v-navigation-drawer` with links to Home, Notes, Tickets, Issues.
- See [app-sidebar.md](app-sidebar.md) for full specification.

### Center — Note Detail

The full-width main content area (no right panel on this view):

1. **Back navigation** — A "Back to Notes" link/button at the top (`mdi-arrow-left`), navigating to `/notes`.
2. **Note card** — A `v-card` showing:
   - **Topic** — Displayed as a heading or `v-chip`.
   - **Timestamp** — Formatted creation date.
   - **Full note text** — The complete `input` text, rendered in a readable format.
   - **Output type** — If `outputType` is set, a chip showing "Jira Ticket" or "GitHub Issue".
3. **AI Result section** — Displayed below the note card, only if `ai_result` is not null:
   - **If `outputType === 'ticket'`** (JiraTicket):
     - **Summary** — Bold heading.
     - **Description** — Full text block.
     - **Acceptance Criteria** — Rendered as a checklist (`v-list` with `mdi-check` icons).
     - **Priority** — Displayed as a colored `v-chip`.
     - **Labels** — Rendered as a row of `v-chip` elements.
   - **If `outputType === 'issue'`** (GitHubIssue):
     - **Title** — Bold heading.
     - **Body** — Full text block (rendered as markdown if possible).
     - **State** — `v-chip` with color (green for open, grey for closed).
     - **Labels** — Row of `v-chip` elements.
     - **Assignees** — Row of `v-chip` elements.
     - **Milestone** — Displayed if present.
     - **Type** — Displayed if present.
4. **No result state** — If `ai_result` is null, show a message like "No AI result generated yet" with a "Generate" button that navigates back to Home or triggers generation.

### No Right Panel

This view does not have the recent notes right panel — that is exclusive to the Home view.

## UI / Theme

- **Background:** White (`#FFFFFF`).
- **Note card:** White `v-card` with `elevation-2`, `rounded-lg`, generous padding.
- **AI result card:** Separate `v-card` below with a subtle red top border (`border-color: #D32F2F`) to visually distinguish the generated output.
- **Chips:** Red palette — `#D32F2F` for primary labels, `#E57373` for secondary, `#FFCDD2` for subtle.
- **Overall feel:** Clean, readable detail view. Content should breathe with ample whitespace.

## Acceptance Criteria

- [ ] Note detail view displays at `/notes/:id` with the AppSidebar.
- [ ] The full note text, topic, and timestamp are displayed.
- [ ] If `ai_result` exists and `outputType === 'ticket'`, Jira ticket fields are shown.
- [ ] If `ai_result` exists and `outputType === 'issue'`, GitHub issue fields are shown.
- [ ] If no `ai_result`, a friendly empty state with generate option is shown.
- [ ] Back navigation returns to `/notes`.
- [ ] Follows the white-and-red theme with modern, clean design.
- [ ] Layout is fully responsive on desktop and mobile.
