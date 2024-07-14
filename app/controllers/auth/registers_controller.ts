import type { HttpContext } from '@adonisjs/core/http'

import Account from '#models/account'
import { Role } from '../../../lib/domain/accounts/accounts.js'
import FieldErrorException from '#exceptions/field_errors_exception'
import { RegisterInputDTO } from './dtos/register/register_input.dto.js'
import { FieldError } from '#lib/errors/errors'

export default class RegistersController {
  async handle({ request, response }: HttpContext): Promise<void> {
    const { email, password, displayName, username } = request.only([
      'email',
      'password',
      'displayName',
      'username',
    ])

    const registerPayload = new RegisterInputDTO({
      email,
      password,
      displayName,
      username,
    })

    if (!registerPayload.validate()) {
      throw new FieldErrorException(registerPayload.errors)
    }

    const findAccount = await Account.query()
      .select('*')
      .where('email', registerPayload.email.value)
      .orWhere('username', registerPayload.username.value)
      .first()

    if (findAccount !== null) {
      let errors: FieldError[] = []
      if (findAccount.email === registerPayload.email.value) {
        return response.badRequest()
      }
      if (findAccount.username === registerPayload.username.value) {
        errors.push({
          field: 'username',
          errors: ['Username already exists'],
        })
      }

      throw new FieldErrorException(errors)
    }

    await Account.create({
      email: registerPayload.email.value,
      password: registerPayload.password.value,
      role: Role.USER,
      displayName: registerPayload.displayName.value,
      username: registerPayload.username.value,
    })
    return response.created()
  }
}
