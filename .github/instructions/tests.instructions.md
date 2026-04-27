---
applyTo: "**/*.spec.ts,**/*.test.ts"
---

# Test Instructions

## Framework

- Use **Vitest** following its standard conventions.
- Use `describe` / `it` blocks for structure.
- Use `expect` for assertions.

## Coverage Rules

- **Every functionality must have its own dedicated test.**
- Test the happy path and at least one edge case per function.
- Test component rendering, user interactions, and emitted events for Vue components.
- Test store actions, getters, and state mutations for Pinia stores.

## Test Stability

- **Tests are immutable.** Only modify existing tests when:
  - A new functionality is added that changes expected behavior.
  - A general functional change in the app requires updated expectations.
- **Never weaken, skip, or remove a passing test to make code pass.**
- If a test fails after a code change, fix the code — not the test.

## Workflow

- **Always run `npm run test` before committing.** All tests must pass.
- Never commit with failing tests.

## Conventions

- Test files live next to their source files or in a `__tests__/` directory.
- Name test files `*.spec.ts` (preferred) or `*.test.ts`.
- Use `vi.mock()` for mocking external dependencies and services.
- Use `vi.fn()` for spy/stub functions.
- Keep tests independent — no shared mutable state between tests.
- Use `beforeEach` for common setup, `afterEach` for cleanup.
