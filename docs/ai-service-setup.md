# AI Service Setup — GitHub Models

Ticket Buddy uses **GitHub Models** to convert free-form notes into structured Jira tickets or GitHub issues. This document explains how to configure and use the AI integration.

---

## Prerequisites

- A **GitHub account** with access to [GitHub Models](https://github.com/marketplace/models)
- A **GitHub Personal Access Token (PAT)**

### How to create a token

1. Go to [github.com](https://github.com) → Profile picture → **Settings**
2. Scroll down to **Developer settings** (left sidebar)
3. **Personal access tokens** → **Tokens (classic)** → **Generate new token**
4. Name: e.g. `ticket-buddy-ai`
5. No special scopes required — access is granted through your GitHub/Copilot subscription
6. Copy the generated token

---

## Configuration

### 1. Set the environment variable

Add your token to the `.env` file in the project root:

```bash
# .env
VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

> ⚠️ **Never commit `.env` to version control.** It is listed in `.gitignore`.

### 2. Access in code

Vite exposes `VITE_`-prefixed variables via `import.meta.env`:

```typescript
const token = import.meta.env.VITE_GITHUB_TOKEN
```

---

## AI Service Implementation

The AI service lives in `src/services/aiService.ts` and calls the **GitHub Models inference API**.

### API Endpoint

```
https://models.inference.ai.azure.com/chat/completions
```

### Example Implementation

```typescript
// src/services/aiService.ts
import type { JiraTicket, GitHubIssue } from '@/types'

const API_URL = 'https://models.inference.ai.azure.com/chat/completions'

function getHeaders(): Record<string, string> {
  const token = import.meta.env.VITE_GITHUB_TOKEN
  if (!token) {
    throw new Error('VITE_GITHUB_TOKEN is not set. See docs/ai-service-setup.md')
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
}

function buildPrompt(input: string, topic: string, outputType: 'ticket' | 'issue'): string {
  if (outputType === 'ticket') {
    return `Convert the following note into a Jira ticket as JSON with these fields:
- summary (string)
- description (string)
- acceptanceCriteria (string[])
- priority (string)
- labels (string[])

Topic: "${topic}"
Note: "${input}"

Return ONLY valid JSON, no markdown fences or extra text.`
  }

  return `Convert the following note into a GitHub issue as JSON with these fields:
- title (string)
- body (string)
- labels (string[])
- assignees (string[])
- milestone (null)
- state ("open")
- stateReason (null)
- type (null)

Topic: "${topic}"
Note: "${input}"

Return ONLY valid JSON, no markdown fences or extra text.`
}

export async function generateFromNote(
  input: string,
  topic: string,
  outputType: 'ticket' | 'issue',
): Promise<JiraTicket | GitHubIssue> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that converts free-form notes into structured JSON. Return only valid JSON.',
        },
        {
          role: 'user',
          content: buildPrompt(input, topic, outputType),
        },
      ],
      temperature: 0.3,
    }),
  })

  if (!response.ok) {
    throw new Error(`AI request failed: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  const content = data.choices[0].message.content
  return JSON.parse(content)
}
```

---

## How It Works (Data Flow)

```
User writes note + selects output type
        │
        ▼
Frontend calls generateFromNote()
        │
        ▼
Request sent to GitHub Models API
(model: gpt-4o, with structured prompt)
        │
        ▼
AI returns JSON (JiraTicket or GitHubIssue)
        │
        ▼
Result stored in note.ai_result (Pinia → localStorage)
        │
        ▼
User sees structured ticket/issue in the UI
```

---

## Available Models

GitHub Models provides access to several models. You can change the `model` field in the request body:

| Model | Best for |
|-------|----------|
| `gpt-4o` | High quality, recommended default |
| `gpt-4o-mini` | Faster, cheaper, good enough for most notes |

---

## Security Note

The `VITE_GITHUB_TOKEN` is embedded in the frontend bundle at build time. This means:

- ✅ **Fine for local development**
- ⚠️ **Not safe for production** — anyone can extract the token from the browser

For production, consider adding a lightweight backend proxy (e.g. a Vercel/Netlify serverless function) that keeps the token on the server side.
