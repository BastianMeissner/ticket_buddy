---
applyTo: "**/*.spec.ts,**/*.test.ts"
---

# Test Management Instructions

## Vitest Conventions

- Use `describe` blocks to group related tests by feature or component.
- Use `it` (not `test`) for individual test cases with descriptive names: `it('should save note without outputType when Save Note is clicked')`.
- Use `beforeEach` for common setup (mounting components, resetting stores).
- Use `afterEach` for cleanup if needed (restoring mocks, clearing timers).
- Prefer `vi.fn()` for mock functions and `vi.mock()` for module mocks.

## Component Testing with Vuetify

- When mounting Vue components that use Vuetify, always provide Vuetify as a plugin:
  ```typescript
  import { createVuetify } from 'vuetify'
  import { mount } from '@vue/test-utils'

  const vuetify = createVuetify()

  const wrapper = mount(MyComponent, {
    global: {
      plugins: [vuetify],
    },
  })
  ```
- For components using Vue Router, provide a mock router or use `router-mock`.
- For components using Pinia stores, use `createTestingPinia()` from `@pinia/testing`.

## Test Structure per Feature

- **Store tests** (`src/stores/__tests__/`): Test actions, getters, and state mutations. Verify persistence behavior.
- **Component tests** (`src/components/__tests__/` or co-located): Test rendering, user interactions, emitted events, and prop behavior.
- **View tests** (`src/views/__tests__/` or co-located): Test page-level behavior, routing integration, and store interaction.
- **Service tests** (`src/services/__tests__/`): Test API call logic, request/response mapping, and error handling with mocked HTTP.

## Snapshot Testing for UI Consistency

- Use snapshot tests for key UI components to catch unintended visual changes.
- Update snapshots intentionally when the UI design changes — never blindly update.
- Keep snapshots small and focused — snapshot individual components, not full pages.

## What to Test

- **Always test:** User interactions (clicks, inputs), conditional rendering (`v-if`), computed values, store actions/getters, service request/response mapping, error states, loading states.
- **Don't test:** Vuetify's internal behavior (e.g., that `v-btn` emits a click), third-party library internals, pure CSS/styling.

## Coverage Expectations

- Every new feature or component must have corresponding tests.
- Aim for meaningful coverage — test behavior, not lines. A well-tested critical path is more valuable than 100% line coverage on trivial code.
- All tests must pass before any commit (`npm run test`).

## Test File Naming

- Co-located tests: `ComponentName.spec.ts` next to `ComponentName.vue`.
- Or in `__tests__/` directories: `src/components/__tests__/ComponentName.spec.ts`.
- Store tests: `src/stores/__tests__/storeName.spec.ts`.
- Service tests: `src/services/__tests__/serviceName.spec.ts`.

## Mocking Best Practices

- Mock external services (AI API) — never make real API calls in tests.
- Use `vi.useFakeTimers()` for time-dependent tests (e.g., splash screen 3-second redirect).
- Mock `router.push` / `router.replace` to verify navigation without actual route changes.
- Reset all mocks in `afterEach` to prevent test pollution.
