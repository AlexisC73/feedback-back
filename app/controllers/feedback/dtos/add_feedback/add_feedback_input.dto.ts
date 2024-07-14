import { FeedbackCategory } from '#lib/domain/feedback/feedback'
import { FieldError } from '#lib/errors/errors'

export class AddFeedbackInputDTO {
  title: string
  description: string
  category: FeedbackCategory
  id: string
  errors: FieldError[] = []

  constructor(params: AddFeedbackInputDTO['data']) {
    this.title = params.title
    this.description = params.description
    this.category = params.category
    this.id = params.id
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

    if (!this.id) {
      this.errors.push({ field: 'id', errors: ['ID is required'] })
    }

    return this.errors.length === 0
  }

  get data() {
    return {
      title: this.title,
      description: this.description,
      category: this.category,
      id: this.id,
    }
  }
}
