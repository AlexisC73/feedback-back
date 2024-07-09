import { FieldError } from '../../errors/errors.js'

export class LoginPayload {
  #email: string
  #password: string
  #errors: FieldError[] = []

  constructor({ email, password }: { email: string; password: string }) {
    this.#email = email
    this.#password = password
  }

  validate(): boolean {
    if (!this.#email || this.email.length <= 0) {
      this.#errors.push({ field: 'email', errors: ['Email is required'] })
    }
    if (!this.#password || this.password.length <= 0) {
      this.#errors.push({ field: 'password', errors: ['Password is required'] })
    }
    return this.#errors.length === 0
  }

  get email(): string {
    return this.#email
  }

  get password(): string {
    return this.#password
  }

  get errors(): FieldError[] {
    return this.#errors
  }
}
