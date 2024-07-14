import { FeedbackCategory, FeedbackStatus } from '#lib/domain/feedback/feedback'
import { FieldError } from '#lib/errors/errors'

export class EditFeedbackInputDTO {
  id: string
  title: string
  description: string
  category: FeedbackCategory
  status: FeedbackStatus
  errors: FieldError[] = []

  constructor(params: EditFeedbackInputDTO['data']) {
    this.id = params.id
    this.title = params.title
    this.description = params.description
    this.category = params.category
    this.status = params.status
    Object.freeze(this)
  }

  validate() {
    if (!this.title) {
      this.errors.push({ field: 'title', errors: ['Title is required'] })
    }

    if (!this.description) {
      this.errors.push({ field: 'description', errors: ['Description is required'] })
    }

    if (!this.category) {
      this.errors.push({ field: 'category', errors: ['Category is required'] })
    }

    if (!this.status) {
      this.errors.push({ field: 'status', errors: ['Status is required'] })
    }

    if (!this.id) {
      this.errors.push({ field: 'id', errors: ['ID is required'] })
    }

    return this.errors.length === 0
  }

  get data() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      category: this.category,
      status: this.status,
    }
  }
}
