export interface GetFeedbackCommentsOutputDTOItem {
  id: string
  content: string
  feedbackId: string
  sender: {
    id: string
    username: string
    displayName: string
    avatar: string | null
  }
  replayTo: {
    id: string
    mainCommentId: string
    user: {
      id: string
      username: string
      displayName: string
      avatar: string | null
    }
  } | null
}

export type GetFeedbackCommentsOutputDTO = GetFeedbackCommentsOutputDTOItem[]
