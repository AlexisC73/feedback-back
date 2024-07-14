export interface GetFeedbackCommentsOutputDTOItem {
  id: string
  content: string
  feedbackId: string
  sender: {
    name: string
    avatar: string | null
  }
}

export type GetFeedbackCommentsOutputDTO = GetFeedbackCommentsOutputDTOItem[]
