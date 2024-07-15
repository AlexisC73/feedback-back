import { ValueObject } from './value_object.js'

export class DisplayNameVO extends ValueObject {
  #displayName: string

  constructor(username: any) {
    super()
    if (typeof username !== 'string') {
      this.#displayName = ''
      return
    }
    this.#displayName = username.trim()
  }

  equals(email: DisplayNameVO): boolean {
    return this.#displayName === email.value
  }

  clone(): ValueObject {
    return new DisplayNameVO(this.#displayName)
  }

  validate(): boolean {
    if (this.isEmpty()) {
      this.errors.push('Display name is required')
      return false
    }
    if (this.#displayName.length < 8) {
      this.errors.push('Username must be at least 8 characters')
    }
    if (this.#displayName.split('').filter((c) => c === ' ').length > 1) {
      this.errors.push('Display name must have at most 1 whitespace')
    }
    if (/^[a-zA-Z\s]{0,}$/.test(this.#displayName) === false) {
      this.errors.push('Only letters (1 whitespace allowed)')
    }
    return this.errors.length === 0
  }

  get value(): string {
    return this.#displayName
  }

  isEmpty(): boolean {
    if (this.#displayName ?? false) {
      return this.#displayName.length === 0
    }
    return true
  }
}
