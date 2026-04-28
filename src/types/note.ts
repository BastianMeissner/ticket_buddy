import type { JiraTicket } from '@/types/jira-ticket'
import type { GitHubIssue } from '@/types/github-issue'

export interface Note {
  id: string
  input: string
  ai_result: JiraTicket | GitHubIssue | null
  outputType?: 'ticket' | 'issue'
  timestamp: string
  topic: string
}
