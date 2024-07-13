import type { HttpContext } from '@adonisjs/core/http'
import { GetMeDTO } from './dtos/get_me/get_me_output.dto.js'

export default class GetMeController {
  async handle({ auth, response }: HttpContext): Promise<void> {
    const user = await auth.authenticate()
    const getMeDTO = new GetMeDTO({
      id: user.id,
      avatar: user.avatar,
      email: user.email,
      role: user.role,
    })

    if (!getMeDTO.validate()) {
      return response.internalServerError()
    }

    return response.ok(getMeDTO.data)
  }
}
