---
applyTo: "src/**/*.vue"
---

# Vue Component Instructions

## SFC Structure

Every Vue component must follow this order:

```vue
<script setup lang="ts">
// imports, props, emits, composables, reactive state, methods
</script>

<template>
  <!-- Vuetify components, semantic HTML -->
</template>
```

## Composition API

- Always use `<script setup lang="ts">` — never Options API.
- Use `ref()` and `reactive()` for reactive state.
- Use `computed()` for derived values.
- Use `watch()` / `watchEffect()` sparingly and only when necessary.
- Extract reusable logic into composables (`src/composables/`).

## Vuetify Standards

- Use Vuetify components for all UI elements (buttons, cards, forms, dialogs, etc.).
- Use `v-container`, `v-row`, `v-col` for layout — leverage Vuetify's 12-column grid system.
- Use Vuetify's breakpoint utilities (`xs`, `sm`, `md`, `lg`, `xl`) for responsive design.
- Use Material Design Icons (`mdi-*`) from `@mdi/font` for all icons.
- Avoid custom CSS when Vuetify provides props, classes, or utilities for the same result.

## Responsive Design

- Every component and view must be fully usable on both desktop and mobile browsers.
- Test layouts at mobile breakpoints (`xs`, `sm`) — avoid hardcoded widths.
- Use Vuetify's responsive props (e.g., `cols="12" md="6"`) for grid layouts.

## Naming Conventions

- Component files: `PascalCase.vue` (e.g., `NoteCard.vue`, `SplashView.vue`).
- View components live in `src/views/`, reusable components in `src/components/`.
- Props and emits: `camelCase` in script, `kebab-case` in template.

## Theme & Usability

- Apply the custom Vuetify theme with `primary: '#D32F2F'`. Use complementary red shades (`#F44336`, `#E57373`, `#FFCDD2`, `#B71C1C`) for secondary, accent, hover, and gradient elements.
- Use **white backgrounds** (`#FFFFFF`) for surfaces and cards. Red is for primary actions, active states, and branding accents.
- Use `rounded` and `elevation` props on `v-card`, `v-btn`, `v-sheet` etc. for a modern, polished look.
- Prefer `v-btn` with `variant="flat"` or `variant="tonal"` and `color="primary"` for action buttons.
- Keep interfaces **simple and self-explanatory** — clear labels, logical grouping, minimal visual clutter.
- Use smooth Vuetify transitions (`v-fade-transition`, `v-slide-x-transition`) for page and element transitions.

## Clean Code

- Keep components focused — one responsibility per component.
- Extract repeated template patterns into child components.
- Use TypeScript interfaces for props and emits.
