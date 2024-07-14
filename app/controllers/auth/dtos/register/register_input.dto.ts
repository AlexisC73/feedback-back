import { DisplayNameVO } from '#lib/domain/value_objects/display_name'
import { EmailVO } from '#lib/domain/value_objects/email'
import { PasswordVO } from '#lib/domain/value_objects/password'
import { UsernameVO } from '#lib/domain/value_objects/username'
import { FieldError } from '#lib/errors/errors'

export class RegisterInputDTO {
  #email: EmailVO
  #password: PasswordVO
  #displayName: DisplayNameVO
  #username: UsernameVO
  errors: FieldError[] = []

  constructor({ email, password, displayName, username }: RegisterInputDTO['data']) {
    this.#email = new EmailVO(email)
    this.#password = new PasswordVO(password)
    this.#displayName = new DisplayNameVO(displayName)
    this.#username = new UsernameVO(username)
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
    if (!this.#displayName.validate()) {
      this.errors.push({
        field: 'displayName',
        errors: this.#displayName.errors,
      })
    }
    if (!this.#username.validate()) {
      this.errors.push({
        field: 'username',
        errors: this.#username.errors,
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

  get displayName() {
    return this.#displayName
  }

  get username() {
    return this.#username
  }

  get data() {
    return {
      email: this.#email,
      password: this.#password,
      displayName: this.#displayName,
      username: this.#username,
    }
  }
}
