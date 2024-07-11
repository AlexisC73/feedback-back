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
  FEATURE = 'Feature',
  BUG = 'Bug',
  ENHANCEMENT = 'Enhancement',
  UI = 'UI',
  UX = 'UX',
}

export enum FeedbackStatus {
  SUGGESTION = 'Suggestion',
  PLANNED = 'Planned',
  IN_PROGRESS = 'In-Progress',
  LIVE = 'Live',
}
