import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutsController {
  async handle({ auth, response }: HttpContext) {
    await auth.authenticate()
    await auth.use('web').logout()
    return response.ok(undefined)
  }
}
