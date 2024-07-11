import Feedback from '#models/feedback'
import type { HttpContext } from '@adonisjs/core/http'
import { FeedbackStatus } from '../../../lib/domain/feedback/feedback.js'

export default class AddFeedbacksController {
  constructor() {}

  async handle({ response, request, auth }: HttpContext) {
    const { title, description, category, id } = request.only([
      'title',
      'description',
      'category',
      'id',
    ])

    const user = await auth.authenticate()

    await Feedback.create({
      id,
      title,
      description,
      category,
      ownerId: user.id,
      status: FeedbackStatus.SUGGESTION,
    })
    return response.created()
  }
}
