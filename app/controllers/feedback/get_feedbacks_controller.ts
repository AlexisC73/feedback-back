import Feedback from '#models/feedback'
import Upvote from '#models/upvote'
import type { HttpContext } from '@adonisjs/core/http'

export default class GetFeedbacksController {
  async handle({ response, auth }: HttpContext) {
    const account = await auth.authenticate()
    const feedbacks = await Feedback.all()

    const feedbackUpvote = await Upvote.all()

    return response.status(200).json(
      feedbacks.map((f) => ({
        id: f.id,
        title: f.title,
        description: f.description,
        category: f.category,
        status: f.status,
        owner: f.ownerId,
        upvotes: feedbackUpvote.filter((u) => u.feedbackId === f.id).length,
        comments: 0,
        upvoted: feedbackUpvote.some((u) => u.accountId === account.id && u.feedbackId === f.id),
      }))
    )
  }
}
