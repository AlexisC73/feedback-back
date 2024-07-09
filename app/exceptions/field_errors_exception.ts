import { Exception } from '@adonisjs/core/exceptions'
import { FieldError } from '../../lib/errors/errors.js'

export default class FieldErrorException extends Exception {
  errors: FieldError[] = []
  constructor(errors: FieldError[] = []) {
    super('Invalid fields', { code: 'E_FieldError', cause: 'FieldErrorException', status: 401 })
    this.errors = errors
  }
}
