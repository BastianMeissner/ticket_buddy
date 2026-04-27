---
applyTo: "src/**"
---

# Frontend Developer Instructions

## Vuetify Theme Configuration

- Define a custom Vuetify theme in `main.ts` with:
  ```typescript
  const customTheme = {
    dark: false,
    colors: {
      primary: '#D32F2F',
      secondary: '#F44336',
      accent: '#E57373',
      error: '#B71C1C',
      background: '#FFFFFF',
      surface: '#FFFFFF',
    },
  }
  ```
- Apply the theme via `createVuetify({ theme: { defaultTheme: 'customTheme', themes: { customTheme } } })`.
- Always reference theme colors via Vuetify's `color` prop (e.g., `color="primary"`) — never hardcode hex values in templates.

## Component Composition

- **Views** are route-level pages in `src/views/`. They handle layout structure (sidebar + content area) and coordinate child components.
- **Components** are reusable building blocks in `src/components/`. They receive data via props and emit events — no direct store access when possible.
- Extract repeated UI patterns (e.g., note card, type badge chip) into dedicated components.
- Use **composables** (`src/composables/`) for shared logic (e.g., formatting timestamps, truncating text).

## Layout Patterns

- All views (except splash) should include the `AppSidebar` component.
- Use `v-app` → `AppSidebar` + `v-main` as the root layout in `App.vue`.
- Inside `v-main`, each view uses `v-container` → `v-row` → `v-col` for its layout.
- Home view uses a three-column layout: sidebar (drawer) + center content (`v-col cols="12" md="6" lg="7"`) + right panel (`v-col cols="12" md="3" lg="3"`).
- Other views use full-width center content (no right panel).

## Performance Best Practices

- Use `defineAsyncComponent()` for views in the router (lazy loading).
- Avoid unnecessary `watch()` — prefer `computed()` for derived state.
- Use `v-if` over `v-show` for conditionally rendered sections that are rarely toggled.
- Keep template expressions simple — move complex logic to `computed` or methods.

## Responsive Breakpoints

- Use Vuetify's breakpoint system consistently:
  - `xs` (< 600px): Mobile phones — single column, collapsible sidebar.
  - `sm` (600–960px): Large phones / small tablets — single column, collapsible sidebar.
  - `md` (960–1264px): Tablets / small desktops — multi-column, permanent sidebar.
  - `lg` (1264–1904px): Desktops — full layout with sidebar + content + optional panel.
  - `xl` (> 1904px): Large desktops — same as `lg` with max-width container.
- Always use responsive `v-col` props: `cols="12" md="6"` etc.
- Test every view at `xs`, `md`, and `lg` breakpoints.

## Code Quality

- No custom CSS when Vuetify provides a prop, class, or utility for the same result.
- Use Vuetify's spacing helpers (`pa-4`, `mt-2`, `mx-auto`) instead of custom margins/padding.
- Use Vuetify's typography classes (`text-h4`, `text-body-1`, `font-weight-bold`) instead of custom font styles.
- Always type component props and emits with TypeScript interfaces.
