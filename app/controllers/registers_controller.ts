import type { HttpContext } from '@adonisjs/core/http'

import Account from '#models/account'
import { Role } from '../../lib/domain/accounts/accounts.js'
import { RegisterPayload } from '../../lib/domain/payload/register_payload.js'

export default class RegistersController {
  async handle({ request, response }: HttpContext): Promise<void> {
    const body = request.all()

    const registerPayload = new RegisterPayload({
      email: body.email,
      password: body.password,
    })

    if (!registerPayload.validate()) {
      return response.badRequest({
        type: 'Invalid payload',
        data: registerPayload.errors,
      })
    }

    const findAccount = await Account.findBy('email', registerPayload.email)
    if (findAccount !== null) {
      return response.forbidden()
    }

    try {
      await Account.create({
        email: registerPayload.email,
        password: registerPayload.password,
        role: Role.USER,
      })
      return response.created()
    } catch (e) {
      console.log(e)
      return response.internalServerError()
    }
  }
}
