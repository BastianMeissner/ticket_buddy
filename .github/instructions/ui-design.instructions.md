---
applyTo: "src/**/*.vue"
---

# UI Design Instructions

## Color Palette

- **Primary:** `#D32F2F` (Material Red 700) — used for primary buttons, active states, branding accents, and key interactive elements.
- **Complementary reds:**
  - `#B71C1C` — Dark red for emphasis, critical badges, issue card accents.
  - `#F44336` — Bright red for hover states and attention-grabbing elements.
  - `#E57373` — Light red for secondary chips, soft accents.
  - `#FFCDD2` — Very light red for hover backgrounds, active sidebar items, subtle tints.
  - `#FFEBEE` — Lightest red for surface tints and background highlights.
- **Background:** `#FFFFFF` (white) for all surfaces, cards, and page backgrounds.
- **Text:** `#212121` (dark grey) for primary text, `#757575` for secondary text.
- **Success/Open state:** `#4CAF50` (green) for GitHub issue "open" badges.
- **Neutral:** `#9E9E9E` (grey) for closed states, disabled elements.

## Modern Aesthetic

- Use **generous whitespace** — don't crowd elements. Padding and margins should feel spacious.
- Apply `rounded-lg` or `rounded-xl` on cards and buttons for soft, modern corners.
- Use subtle `elevation-1` or `elevation-2` on cards — avoid heavy shadows.
- Prefer `variant="flat"` for primary action buttons and `variant="outlined"` for secondary actions.
- Use smooth transitions (`v-fade-transition`, `v-slide-x-transition`) for navigation and state changes.
- Typography should be clean — use Vuetify's default Roboto font, leverage font-weight (`font-weight-bold`, `font-weight-medium`) for hierarchy.

## Usability Principles

- **Clarity over cleverness:** Every element should be immediately understandable. Use clear labels, not ambiguous icons alone.
- **Visual hierarchy:** Primary actions (e.g., "Generate") should be visually dominant (filled red button). Secondary actions (e.g., "Save Note") should be visually lighter (outlined).
- **Consistent patterns:** Similar elements should look and behave the same across all views.
- **Feedback:** Always show loading states during async operations. Disable buttons when input is invalid.
- **Accessibility:** Ensure sufficient color contrast (red on white meets WCAG AA). Use `aria-label` on icon-only buttons.

## Icon Usage

- Always use Material Design Icons (`mdi-*`) from `@mdi/font`.
- Use icons consistently across the app:
  - Home: `mdi-home`
  - Notes: `mdi-note-text`
  - Tickets: `mdi-ticket-outline`
  - Issues: `mdi-alert-circle-outline`
  - Search: `mdi-magnify`
  - Back: `mdi-arrow-left`
  - Generate/AI: `mdi-auto-fix` or `mdi-creation`
  - Save: `mdi-content-save`
- Icons in buttons should use `prepend-icon` or `append-icon` props — not inline `v-icon` unless necessary.
