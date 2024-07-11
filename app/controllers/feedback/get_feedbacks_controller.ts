import Feedback from '#models/feedback'
import type { HttpContext } from '@adonisjs/core/http'

export default class GetFeedbacksController {
  async handle({ response, auth }: HttpContext) {
    const account = await auth.authenticate()
    const feedbacks = await Feedback.query().preload('upvotes').select('*').exec()

    return response.status(200).json(
      feedbacks.map((f) => ({
        id: f.id,
        title: f.title,
        description: f.description,
        category: f.category,
        status: f.status,
        owner: f.ownerId,
        upvotes: f.upvotes.length,
        comments: 0,
        upvoted: f.upvotes.some((u) => u.accountId === account.id),
      }))
    )
  }
}
