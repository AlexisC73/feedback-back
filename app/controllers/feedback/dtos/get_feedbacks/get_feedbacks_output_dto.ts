import { FeedbackCategory, FeedbackStatus } from '#lib/domain/feedback/feedback'

type GetFeedbacksOutputDTOItem = {
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

export type GetFeedbacksOutputDTO = GetFeedbacksOutputDTOItem[]
