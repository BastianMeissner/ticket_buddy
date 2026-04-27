# Feature: Notes View

## Summary

A list view displaying all saved notes. Users can browse, search, and filter their notes, and tap any note to navigate to its detail view.

## Route

- **Path:** `/notes`
- **Component:** `NotesView.vue`

## Layout

### Left — AppSidebar

- Persistent `v-navigation-drawer` with links to Home, Notes, Tickets, Issues.
- "Notes" link is highlighted as the active route.
- See [app-sidebar.md](app-sidebar.md) for full specification.

### Center — Notes List

The full-width main content area (no right panel on this view):

1. **Page header** — Title "Notes" with an optional search/filter bar.
2. **Search bar** — A `v-text-field` with `prepend-inner-icon="mdi-magnify"` for filtering notes by text content or topic.
3. **Notes list** — A list of `v-card` items, each showing:
   - **Timestamp** — Formatted creation date.
   - **Preview** — First ~80 characters of the note input, truncated.
   - **Topic** — Displayed as a `v-chip` if present.
   - **Type badge** — If `outputType` is set, show a colored `v-chip`: red for "Ticket", dark red for "Issue".
   - **AI status** — A small icon or indicator showing whether `ai_result` exists (e.g., `mdi-check-circle` in green or `mdi-clock-outline` in grey).
4. **Empty state** — If no notes exist, show a friendly message with an icon (e.g., `mdi-note-plus-outline`) and a button linking to `/home` to create the first note.

### No Right Panel

This view does not have the recent notes right panel — that is exclusive to the Home view.

## UI / Theme

- **Background:** White (`#FFFFFF`).
- **Note cards:** White `v-card` with `elevation-1`, `rounded-lg`. Hover effect with light red tint.
- **Search bar:** Outlined variant, `rounded`, `density="comfortable"`.
- **Type chips:** Red (`#D32F2F`) for tickets, darker red (`#B71C1C`) for issues.
- **Empty state:** Centered, with a soft red-tinted icon and a red "Create Note" button.
- **Overall feel:** Clean list interface, easy to scan and navigate.

## Behavior

1. User navigates to `/notes` via the sidebar.
2. All saved notes are loaded from the Pinia store and displayed in reverse chronological order (newest first).
3. User can type in the search bar to filter notes by input text or topic.
4. Tapping a note card navigates to `/notes/:id` (NoteDetailView).

## Acceptance Criteria

- [ ] Notes view displays at `/notes` with the AppSidebar on the left.
- [ ] All saved notes are listed in reverse chronological order.
- [ ] Each note shows timestamp, preview, topic chip, type badge, and AI status.
- [ ] Search bar filters notes by content or topic.
- [ ] Tapping a note navigates to `/notes/:id`.
- [ ] Empty state is shown when no notes exist, with a CTA to create one.
- [ ] Follows the white-and-red theme with modern, clean design.
- [ ] Layout is fully responsive on desktop and mobile.
