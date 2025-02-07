import Feedback from '#models/feedback'
import type { HttpContext } from '@adonisjs/core/http'
import { GetFeedbacksOutputDTO } from './dtos/get_feedbacks/get_feedbacks_output_dto.js'
import Account from '#models/account'

export default class GetFeedbacksController {
  async handle({ response, auth }: HttpContext) {
    let account: Account | null = null

    try {
      account = await auth.authenticate()
    } catch (e) {}

    const feedbacks = await Feedback.query()
      .preload('upvotes')
      .preload('comments')
      .select('*')
      .exec()

    const outputFeedbacks: GetFeedbacksOutputDTO = feedbacks.map((f) => ({
      id: f.id,
      title: f.title,
      description: f.description,
      category: f.category,
      status: f.status,
      owner: f.ownerId,
      upvotes: f.upvotes.length,
      comments: f.comments.length,
      upvoted: f.upvotes.some((u) => (account !== null ? u.accountId === account.id : false)),
    }))

    return response.status(200).json(outputFeedbacks)
  }
}
