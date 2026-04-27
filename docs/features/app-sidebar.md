# Feature: App Sidebar

## Summary

A persistent navigation drawer displayed on all views except the splash screen. Provides the main navigation for the application using Vuetify's `v-navigation-drawer` component.

## Component

- **File:** `src/components/AppSidebar.vue`
- **Type:** Reusable component (included in the app's root layout)

## Layout & Design

### Structure

- Vuetify `v-navigation-drawer` with `permanent` mode on desktop and collapsible/togglable on mobile.
- **Width:** ~256px on desktop (Vuetify default).
- **Position:** Left side of the screen.

### Navigation Links

Each link is a `v-list-item` inside a `v-list`:

| Label     | Icon                        | Route      |
| --------- | --------------------------- | ---------- |
| Home      | `mdi-home`                  | `/home`    |
| Notes     | `mdi-note-text`             | `/notes`   |
| Tickets   | `mdi-ticket-outline`        | `/tickets` |
| Issues    | `mdi-alert-circle-outline`  | `/issues`  |

### Active State

- The currently active route's list item is highlighted using Vuetify's `active` prop or `router-link` integration.
- Active item uses a light red background (`#FFCDD2`) with red text (`#D32F2F`).
- Inactive items use dark grey text on white background.

### App Branding

- At the top of the sidebar, display the app name **"Ticket Buddy"** with a small icon (`mdi-ticket-confirmation-outline`), styled in red.
- Optional: a `v-divider` below the branding before the nav links.

## UI / Theme

- **Background:** White (`#FFFFFF`).
- **Active link:** Light red background (`#FFCDD2`), red text and icon (`#D32F2F`).
- **Inactive links:** Dark grey text (`#424242`), no background.
- **Hover effect:** Very light red tint on hover.
- **Branding text:** Red (`#D32F2F`), bold, modern font.
- **Border:** Subtle right border or elevation to separate from main content.
- **Overall feel:** Minimal, clean sidebar that doesn't compete with the main content.

## Responsive Behavior

- **Desktop (`md` and up):** Permanent drawer, always visible.
- **Mobile (`sm` and below):** Temporary drawer, hidden by default, toggled via a hamburger menu button (`mdi-menu`) in a top app bar (`v-app-bar`).
- The top app bar is only rendered on mobile when the sidebar is in temporary mode.

## Implementation Notes

- Use `v-navigation-drawer` with `:permanent="mdAndUp"` and `:temporary="smAndDown"` (or use Vuetify's `rail` mode for a compact sidebar alternative).
- Use `v-list` with `nav` prop for proper navigation list styling.
- Each `v-list-item` should use `:to="route"` for Vue Router integration (automatic active state detection).
- The sidebar should be included in `App.vue` (or a layout wrapper) and conditionally hidden on the `/splash` route.

## Acceptance Criteria

- [ ] Sidebar is visible on all views except `/splash`.
- [ ] Four navigation links are present: Home, Notes, Tickets, Issues.
- [ ] Each link has the correct icon and navigates to the correct route.
- [ ] Active route is visually highlighted with red styling.
- [ ] Sidebar is permanent on desktop and collapsible on mobile.
- [ ] App name "Ticket Buddy" is displayed at the top of the sidebar.
- [ ] Follows the white-and-red theme with modern, clean design.
