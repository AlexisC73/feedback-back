import { ValueObject } from './value_object.js'

export class EmailVO extends ValueObject {
  #email: string

  constructor(email: any) {
    super()
    if (typeof email !== 'string') {
      this.#email = ''
      return
    }
    this.#email = email.trim().toLocaleLowerCase()
  }

  equals(email: EmailVO): boolean {
    return this.#email === email.value
  }

  clone(): ValueObject {
    return new EmailVO(this.#email)
  }

  validate(): boolean {
    const errors = []
    if (this.isEmpty()) {
      errors.push('Email is required')
      this.setErrors(errors)
      return false
    }
    if (!this.isValidEmail(this.#email)) {
      errors.push('Invalid email')
    }
    this.setErrors(errors)
    return this.errors.length === 0
  }

  get value(): string {
    return this.#email
  }

  isEmpty(): boolean {
    if (this.#email ?? false) {
      return this.#email.length === 0
    }
    return true
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
}
