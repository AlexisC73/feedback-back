import type { HttpContext } from '@adonisjs/core/http'

import Account from '#models/account'
import { Role } from '../../../lib/domain/accounts/accounts.js'
import { RegisterPayload } from '../../../lib/domain/payload/register_payload.js'
import FieldErrorException from '#exceptions/field_errors_exception'

export default class RegistersController {
  async handle({ request, response }: HttpContext): Promise<void> {
    const { email, password } = request.only(['email', 'password'])

    const registerPayload = new RegisterPayload({
      email,
      password,
    })

    if (!registerPayload.validate()) {
      throw new FieldErrorException(registerPayload.errors)
    }

    const findAccount = await Account.findBy('email', registerPayload.email)
    if (findAccount !== null) {
      return response.forbidden()
    }

    await Account.create({
      email: registerPayload.email,
      password: registerPayload.password,
      role: Role.USER,
    })
    return response.created()
  }
}
