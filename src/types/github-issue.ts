export interface GitHubIssue {
  title: string
  body: string
  labels: string[]
  assignees: string[]
  milestone: string | null
  state: 'open' | 'closed'
  stateReason: 'completed' | 'not_planned' | 'duplicate' | 'reopened' | null
  type: string | null
}
