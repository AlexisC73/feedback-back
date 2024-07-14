import type { HttpContext } from '@adonisjs/core/http'
import { GetMeOutputDTO } from './dtos/get_me/get_me_output.dto.js'

export default class GetMeController {
  async handle({ auth, response }: HttpContext): Promise<void> {
    const user = await auth.authenticate()
    const getMeDTO: GetMeOutputDTO = {
      avatar: user.avatar,
      email: user.email,
      id: user.id,
      role: user.role,
    }

    return response.ok(getMeDTO)
  }
}
