import { FieldError } from '#lib/errors/errors'

export class UpvoteInputDTO {
  #upvote: boolean
  #id: string
  errors: FieldError[] = []

  constructor(params: UpvoteInputDTO['data']) {
    this.#upvote = params.upvote
    this.#id = params.id
  }

  validate() {
    if (this.#upvote === undefined) {
      this.errors.push({
        field: 'upvote',
        errors: ['upvote is required'],
      })
    }

    if (this.#id === undefined) {
      this.errors.push({
        field: 'id',
        errors: ['id is required'],
      })
    }

    return this.errors.length === 0
  }

  get data() {
    return {
      upvote: this.#upvote,
      id: this.#id,
    }
  }
}
