import type { HttpContext } from '@adonisjs/core/http'

import Account from '#models/account'
import { LoginPayload } from '../../../lib/domain/payload/login_payload.js'
import FieldErrorException from '#exceptions/field_errors_exception'

export default class LoginsController {
  async handle({ request, response, auth }: HttpContext): Promise<void> {
    const body = request.all()

    const loginPayload = new LoginPayload({
      email: body.email,
      password: body.password,
    })

    if (!loginPayload.validate()) {
      throw new FieldErrorException(loginPayload.errors)
    }

    const user = await Account.verifyCredentials(loginPayload.email, loginPayload.password)
    await auth.use('web').login(user, false)
    return response.ok(user)
  }
}
