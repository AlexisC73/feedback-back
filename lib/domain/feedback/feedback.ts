export interface Feedback {
  id: string
  title: string
  description: string
  category: FeedbackCategory
  status: FeedbackStatus
  owner: string
  upvotes: number
  comments: number
  upvoted: boolean
}

export enum FeedbackCategory {
  UI = 'ui',
  UX = 'ux',
  ENHANCEMENT = 'enhancement',
  BUG = 'bug',
  FEATURE = 'feature',
}

export enum FeedbackStatus {
  SUGGESTION = 'suggestion',
  PLANNED = 'planned',
  IN_PROGRESS = 'in-progress',
  LIVE = 'live',
}
