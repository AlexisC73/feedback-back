import type { HttpContext } from '@adonisjs/core/http'

import Feedback from '#models/feedback'

export default class DeleteFeedbacksController {
  async handle({ request, response, auth }: HttpContext) {
    const account = await auth.authenticate()
    const feedback = await Feedback.findBy('id', request.param('id'))

    if (!feedback) {
      return
    }

    if (feedback.ownerId !== account.id) {
      return response.unauthorized()
    }

    await feedback.delete()
    return
  }
}
