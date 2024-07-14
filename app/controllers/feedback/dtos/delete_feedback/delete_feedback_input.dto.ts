import { FieldError } from '#lib/errors/errors'

export class DeleteFeedbackInputDTO {
  #id: string
  errors: FieldError[] = []

  constructor(params: DeleteFeedbackInputDTO['data']) {
    this.#id = params.id
  }

  validate() {
    if (!this.#id) {
      this.errors.push({ field: 'id', errors: ['ID is required'] })
    }

    return this.errors.length === 0
  }

  get data() {
    return { id: this.#id }
  }
}
