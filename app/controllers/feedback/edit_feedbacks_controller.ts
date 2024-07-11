import Feedback from '#models/feedback'
import type { HttpContext } from '@adonisjs/core/http'

export default class EditFeedbacksController {
  async handle({ request, response, auth }: HttpContext) {
    const user = await auth.authenticate()

    const { title, description, category, status } = request.only([
      'title',
      'description',
      'category',
      'status',
    ])

    const feedback = await Feedback.findOrFail(request.param('id'))

    if (feedback.ownerId !== user.id) {
      return response.unauthorized()
    }

    feedback.title = title
    feedback.description = description
    feedback.category = category
    feedback.status = status
    await feedback.save()
    return
  }
}
