import type { HttpContext } from '@adonisjs/core/http'

export default class GetMeController {
  async handle({ auth, response }: HttpContext): Promise<void> {
    const user = await auth.authenticate()
    return response.ok(user)
  }
}
