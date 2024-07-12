export interface DomainComment {
  id: string
  sender: {
    name: string
    avatar: string | null
  }
  content: string
  feedbackId: string
}
