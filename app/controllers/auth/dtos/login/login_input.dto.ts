import { FieldError } from '#lib/errors/errors'

export class LoginInputDTO {
  #email: string
  #password: string
  errors: FieldError[] = []

  constructor({ email, password }: LoginInputDTO['data']) {
    this.#email = email.trim().toLocaleLowerCase()
    this.#password = password
  }

  validate() {
    if (!this.#email) {
      this.errors.push({ field: 'email', errors: ['Email is required'] })
    }
    if (!this.#password) {
      this.errors.push({ field: 'password', errors: ['Password is required'] })
    }
    return this.errors.length === 0
  }

  get email() {
    return this.#email
  }

  get password() {
    return this.#password
  }

  get data() {
    return {
      email: this.#email,
      password: this.#password,
    }
  }
}
