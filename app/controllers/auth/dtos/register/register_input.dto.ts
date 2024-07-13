import { EmailVO } from '#lib/domain/value_objects/email'
import { PasswordVO } from '#lib/domain/value_objects/password'
import { FieldError } from '#lib/errors/errors'

export class RegisterInputDTO {
  #email: EmailVO
  #password: PasswordVO
  errors: FieldError[] = []

  constructor({ email, password }: RegisterInputDTO['data']) {
    this.#email = new EmailVO(email)
    this.#password = new PasswordVO(password)
  }

  validate() {
    if (!this.#email.validate()) {
      this.errors.push({
        field: 'email',
        errors: this.#email.errors,
      })
    }
    if (!this.#password.validate()) {
      this.errors.push({
        field: 'password',
        errors: this.#password.errors,
      })
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
