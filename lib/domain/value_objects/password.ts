import { ValueObject } from './value_object.js'

export class PasswordVO extends ValueObject {
  #password: string

  constructor(password: any) {
    super()
    if (typeof password !== 'string') {
      this.#password = ''
      return
    }
    this.#password = password
  }

  equals(password: PasswordVO): boolean {
    return this.#password === password.value
  }

  clone(): ValueObject {
    return new PasswordVO(this.#password)
  }

  validate(): boolean {
    const errors = []
    if (this.isEmpty() || this.#password.length < 6) {
      console.log(this.#password)
      errors.push('Password must be at least 6 characters long')
    }
    this.setErrors(errors)
    return errors.length === 0
  }

  get value(): string {
    return this.#password
  }

  isEmpty(): boolean {
    if (this.#password ?? false) {
      return this.#password.length <= 0
    }
    return true
  }
}
