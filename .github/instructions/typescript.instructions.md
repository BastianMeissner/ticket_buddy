---
applyTo: "**/*.ts"
---

# TypeScript Instructions

## Strict Mode

- TypeScript strict mode is enabled — never use `any` unless absolutely unavoidable and documented.
- Always define explicit return types for functions.
- Use `interface` for object shapes, `type` for unions/intersections.

## Conventions

- Use `const` by default, `let` only when reassignment is needed, never `var`.
- Use arrow functions for callbacks and inline functions.
- Use optional chaining (`?.`) and nullish coalescing (`??`) over manual null checks.
- Prefer destructuring for function parameters and object access.

## Interfaces & Types

- All interfaces and types live in `src/types/`.
- Export one interface/type per file, named to match the file (e.g., `note.ts` exports `Note`).
- Use descriptive names — avoid abbreviations.

## Imports

- Use absolute imports via the `@/` alias (mapped to `src/`).
- Group imports: Vue/library imports first, then local modules, then types.

## Error Handling

- Always handle errors explicitly — no silent catches.
- Use typed error responses where possible.

## Dependencies

- Always use the latest stable versions of all dependencies.
- Run `npm audit` to check for vulnerabilities before committing.
