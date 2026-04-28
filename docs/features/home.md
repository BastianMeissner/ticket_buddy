# Feature: Home View

## Summary

The main dashboard and primary interaction point of Ticket Buddy. Users write notes in a ChatGPT-style input field, select an output type (Jira Ticket or GitHub Issue), and either save the note or generate a structured result via AI.

## Route

- **Path:** `/home`
- **Component:** `HomeView.vue`
- **Redirected from:** `/splash` after 3 seconds

## Layout

### Left — AppSidebar

- Persistent `v-navigation-drawer` with links to Home, Notes, Tickets, Issues.
- See [app-sidebar.md](app-sidebar.md) for full specification.

### Center — Note Input Area

The main content area, vertically centered on the page:

1. **Text area** — A large, ChatGPT-style `v-textarea` for free-form note input. Auto-growing, with a placeholder like *"Write your note here..."*. Clean, modern styling with rounded corners and subtle elevation.
2. **Output type select** — A `v-select` dropdown directly below the text area with two options:
   - **"Jira Ticket"** (default, pre-selected)
   - **"GitHub Issue"**
   - The select only matters when generating — saving a note does not require a type.
3. **Action buttons** — Below the select, two buttons side by side:
   - **"Save Note"** — Saves the note to the store without setting `outputType` or triggering AI. Uses `variant="outlined"` with `color="primary"`.
   - **"Generate"** — Saves the note, sets `outputType` based on the select value, and sends the note to the AI service for processing. Uses `variant="flat"` with `color="primary"` (filled red button, primary CTA).

### Right — Recent Notes Panel (Home View Only)

- A side panel (visible on `md` and up breakpoints) listing recent notes.
- Each item shows:
  - **Timestamp** (relative or formatted, e.g., "2 hours ago").
  - **Preview** — First ~50 characters of the note input, truncated with ellipsis.
  - **Type badge** — If `outputType` is set, show a small chip ("Ticket" or "Issue").
- Tapping a note navigates to `/notes/:id`.
- On mobile (`sm` and below), this panel moves below the input area or is accessible via a toggle.

### Bottom Right — Live Clock

- A small, unobtrusive live clock fixed to the bottom-right corner of the viewport (`position: fixed; bottom: 16px; right: 16px`).
- Displays the current time in `HH:MM:SS` format, updated every second.
- Purely textual — no background, no border, no chip or card wrapper.
- Uses `caption`-level typography and monospace font for digit stability, with muted text color (`text-medium-emphasis` / `#9E9E9E`).

## UI / Theme

- **Background:** White (`#FFFFFF`).
- **Primary actions (Generate button):** Red (`#D32F2F`), flat variant, bold and prominent.
- **Secondary actions (Save Note):** Red outlined variant, visually lighter.
- **Text area:** White surface with subtle `elevation-1`, `rounded-lg`.
- **Recent notes panel:** White `v-card` with `elevation-1`, list items with hover effect using light red tint (`#FFCDD2`).
- **Live clock:** Muted gray (`#9E9E9E`), `caption` typography, monospace font — no background, no border, purely textual and non-distracting.
- **Overall feel:** Clean, spacious, modern. The input area should feel like a chat interface — inviting and frictionless.

## Behavior

1. User arrives at `/home` (redirected from splash or via sidebar).
2. User types a note in the text area.
3. User optionally changes the output type select (defaults to "Jira Ticket").
4. User clicks:
   - **"Save Note"** → Note is saved to the Pinia store with `id`, `input`, `timestamp`, `topic`. No `outputType` or `ai_result` is set.
   - **"Generate"** → Note is saved with `outputType` set to `'ticket'` or `'issue'` based on the select, and the AI service is called. On success, `ai_result` is populated with a `JiraTicket` or `GitHubIssue`.
5. After saving/generating, the text area clears and the new note appears in the recent notes panel.

## Implementation Notes

- Use `v-container` with `v-row` and `v-col` for the three-column layout.
- Right panel: `v-col cols="12" md="3"` — hidden on `sm` and below or rendered below main content.
- Center content: `v-col cols="12" md="6"` (or wider if sidebar is a drawer overlay).
- The `v-select` should use `density="comfortable"` and `variant="outlined"` for a clean look.
- Disable the "Generate" button when the text area is empty.
- Show a `v-progress-linear` or loading state on the "Generate" button while AI is processing.
- **Live clock:** Use a `ref<string>` to hold the formatted time string. Start a `setInterval` (1000 ms) in `onMounted` that updates the ref via `new Date().toLocaleTimeString('de-DE')`. Clear the interval in `onUnmounted` to prevent memory leaks.

## Acceptance Criteria

- [ ] Home view displays at `/home` with the AppSidebar on the left.
- [ ] A large text area is available for note input.
- [ ] A `v-select` dropdown below the input defaults to "Jira Ticket" with "GitHub Issue" as the second option.
- [ ] "Save Note" saves the note without `outputType` or AI generation.
- [ ] "Generate" saves the note with `outputType` set and triggers AI processing.
- [ ] Recent notes panel shows on the right (desktop) with timestamp and preview.
- [ ] Recent notes panel adapts on mobile (below content or toggle).
- [ ] Follows the white-and-red theme with modern, clean design.
- [ ] Layout is fully responsive on desktop and mobile.
- [ ] Live clock (`HH:MM:SS`) is displayed unobtrusively in the bottom-right corner and updates every second.
