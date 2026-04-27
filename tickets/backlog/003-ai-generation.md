# Ticket 003: AI Generation — Convert Notes to Jira Tickets & GitHub Issues

## Status: `todo`

## Priority: `high`

## Description

Implement the AI generation feature that converts free-form notes into structured Jira tickets or GitHub issues using GitHub Models (GPT-4o). This includes creating the AI service (`src/services/aiService.ts`), wiring up the "Generate" button on the HomeView, storing the AI result in the note, displaying loading/error states, and navigating to the note detail view after successful generation. This ticket builds on top of Tickets 001 and 002.

## Acceptance Criteria

### AI Service (`src/services/aiService.ts`)
- [ ] `generateFromNote(input, topic, outputType)` function is implemented and exported
- [ ] Calls the GitHub Models inference API (`https://models.inference.ai.azure.com/chat/completions`) with model `gpt-4o`
- [ ] Uses `VITE_GITHUB_TOKEN` from environment variables for authentication (`Bearer` token)
- [ ] Builds a structured prompt that instructs the AI to return valid JSON matching either `JiraTicket` or `GitHubIssue` interface
- [ ] Parses the AI response and returns a typed `JiraTicket` or `GitHubIssue` object
- [ ] Throws a descriptive error if the token is missing, the API request fails, or the response cannot be parsed

### Environment Configuration
- [ ] `.env.example` file exists documenting the required `VITE_GITHUB_TOKEN` variable
- [ ] `.env` is listed in `.gitignore` (should already be from Ticket 001)
- [ ] Application shows a clear error/warning when the token is not configured

### HomeView Integration
- [ ] "Generate" button is enabled (no longer disabled/coming-soon from Ticket 002)
- [ ] "Generate" button is disabled when the textarea or topic is empty
- [ ] Clicking "Generate" saves the note with `outputType` set to `'ticket'` or `'issue'` based on the `v-select` value
- [ ] The AI service is called with the note's `input`, `topic`, and `outputType`
- [ ] On success, `ai_result` is populated on the note in the Pinia store with the parsed `JiraTicket` or `GitHubIssue`
- [ ] After successful generation, the user is navigated to `/notes/:id` to view the result
- [ ] The textarea and topic field are cleared after generation

### Loading & Error States
- [ ] A loading indicator is shown on or near the "Generate" button while the AI request is in progress (e.g. `v-progress-linear` or `loading` prop on button)
- [ ] Both "Save Note" and "Generate" buttons are disabled during generation to prevent double submissions
- [ ] On API error, a user-friendly error message is displayed (e.g. `v-snackbar` or `v-alert`)
- [ ] On JSON parse error from the AI response, a meaningful error is shown

### Store Updates
- [ ] Notes store has an action to update a note's `outputType` and `ai_result` (or the `addNote` action supports these fields)
- [ ] Generated notes are persisted to localStorage like regular saved notes

### Tests
- [ ] AI service `generateFromNote` returns a valid `JiraTicket` when called with `outputType: 'ticket'` (mocked API response)
- [ ] AI service `generateFromNote` returns a valid `GitHubIssue` when called with `outputType: 'issue'` (mocked API response)
- [ ] AI service throws an error when `VITE_GITHUB_TOKEN` is not set
- [ ] AI service throws an error on API failure (non-200 response)
- [ ] AI service throws an error on invalid JSON in AI response
- [ ] HomeView "Generate" button triggers the AI service with correct parameters
- [ ] HomeView shows loading state during generation
- [ ] HomeView displays error message on generation failure
- [ ] `npm run test` passes with all tests green
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes with no errors

## Notes

- Use `vi.fn()` / `vi.mock()` to mock `fetch` in tests — do not make real API calls.
- The `VITE_GITHUB_TOKEN` is embedded in the frontend bundle at build time. This is acceptable for local development but not production-safe (documented in `docs/ai-service-setup.md`).
- The NoteDetailView to display the generated result is **not** part of this ticket — it will be handled separately. For now, navigation to `/notes/:id` is sufficient even if the detail view is still a stub.
- Feature branch should be named `feature/003-ai-generation`.
- Depends on Tickets 001 and 002 being completed first.

## Linked Docs

- [docs/ai-service-setup.md](../../docs/ai-service-setup.md)
- [docs/features/home.md](../../docs/features/home.md)
- [docs/architecture/overview.md](../../docs/architecture/overview.md)
