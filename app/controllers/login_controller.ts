import type { HttpContext } from '@adonisjs/core/http'

import Account from '#models/account'
import { LoginPayload } from '../../lib/domain/payload/login_payload.js'

export default class LoginsController {
  async handle({ request, response, auth }: HttpContext): Promise<void> {
    const body = request.all()

    const loginPayload = new LoginPayload({
      email: body.email,
      password: body.password,
    })

    if (!loginPayload.validate()) {
      return response.badRequest({
        type: 'Invalid payload',
        data: loginPayload.errors,
      })
    }

    try {
      const user = await Account.verifyCredentials(loginPayload.email, loginPayload.password)
      await auth.use('web').login(user, false)
      return response.ok(user)
    } catch (e) {
      return response.badRequest()
    }
  }
}
