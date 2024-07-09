export abstract class ValueObject {
  #errors: string[] = []
  constructor() {
    if (new.target === ValueObject) {
      throw new Error('ValueObject cannot be instantiated directly')
    }
    Object.freeze(this)
  }

  abstract equals(vo: ValueObject): boolean

  abstract clone(): ValueObject

  abstract validate(): boolean

  setErrors(errors: string[]) {
    this.#errors = errors
  }

  get errors(): string[] {
    return this.#errors
  }
}
