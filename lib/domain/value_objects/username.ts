import { ValueObject } from './value_object.js'

const MINIMUM_LENGTH = 4

export class UsernameVO extends ValueObject {
  #username: string

  constructor(username: any) {
    super()
    if (typeof username !== 'string') {
      this.#username = ''
      return
    }
    this.#username = username.trim().toLocaleLowerCase()
  }

  equals(email: UsernameVO): boolean {
    return this.#username === email.value
  }

  clone(): ValueObject {
    return new UsernameVO(this.#username)
  }

  validate(): boolean {
    if (this.isEmpty()) {
      this.errors.push('Username is required')
      return false
    }
    if (this.#username.length < MINIMUM_LENGTH) {
      this.errors.push(`Username must be at least ${MINIMUM_LENGTH} characters`)
    }
    if (this.#username.includes(' ')) {
      this.errors.push('Username must not contain spaces')
    }
    if (/^[a-zA-Z]+$/.test(this.#username) === false) {
      this.errors.push('Username must only contain letters')
    }
    return this.errors.length === 0
  }

  get value(): string {
    return this.#username
  }

  isEmpty(): boolean {
    if (this.#username ?? false) {
      return this.#username.length === 0
    }
    return true
  }
}
