import { Role } from '#lib/domain/accounts/accounts'
import { FieldError } from '#lib/errors/errors'

export class GetMeDTO {
  #id: string
  #email: string
  #avatar: string | null
  #role: Role
  errors: FieldError[] = []

  constructor({ id, email, avatar, role }: GetMeDTO['data']) {
    this.#id = id
    this.#email = email
    this.#avatar = avatar
    this.#role = role
  }

  validate() {
    if (!this.#id) {
      this.errors.push({ field: 'id', errors: ['ID is required'] })
    }
    if (!this.#email) {
      this.errors.push({ field: 'email', errors: ['Email is required'] })
    }
    if (!this.#role) {
      this.errors.push({ field: 'role', errors: ['Role is required'] })
    }
    return this.errors.length === 0
  }

  get data() {
    return {
      id: this.#id,
      email: this.#email,
      avatar: this.#avatar,
      role: this.#role,
    }
  }
}
