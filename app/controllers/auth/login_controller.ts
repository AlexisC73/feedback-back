import type { HttpContext } from '@adonisjs/core/http'
import Account from '#models/account'
import FieldErrorException from '#exceptions/field_errors_exception'
import { LoginInputDTO } from './dtos/login/login_input.dto.js'
import { LoginOutputDTO } from './dtos/login/login_output.dto.js'

export default class LoginsController {
  async handle({ request, response, auth }: HttpContext): Promise<void> {
    const { email, password } = request.only(['email', 'password'])

    const loginPayload = new LoginInputDTO({ email, password })

    if (!loginPayload.validate()) {
      throw new FieldErrorException(loginPayload.errors)
    }

    const user = await Account.verifyCredentials(loginPayload.email, loginPayload.password)
    await auth.use('web').login(user, false)

    const outputDto: LoginOutputDTO = {
      id: user.id,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      displayName: user.displayName,
      username: user.username,
    }

    return response.ok(outputDto)
  }
}
