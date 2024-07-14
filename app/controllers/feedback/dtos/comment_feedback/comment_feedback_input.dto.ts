import { FieldError } from '#lib/errors/errors'

export class CommentFeedbackInputDTO {
  id: string
  content: string
  feedbackId: string
  errors: FieldError[] = []

  constructor(params: CommentFeedbackInputDTO['data']) {
    this.id = params.id
    this.content = params.content
    this.feedbackId = params.feedbackId
    Object.freeze(this)
  }

  validate() {
    if (!this.content) {
      this.errors.push({ field: 'content', errors: ['Content is required'] })
    }

    if (!this.feedbackId) {
      this.errors.push({ field: 'feedbackId', errors: ['Feedback ID is required'] })
    }

    if (!this.id) {
      this.errors.push({ field: 'id', errors: ['ID is required'] })
    }

    return this.errors.length === 0
  }

  get data() {
    return {
      id: this.id,
      content: this.content,
      feedbackId: this.feedbackId,
    }
  }
}
