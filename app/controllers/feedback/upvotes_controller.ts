import Feedback from '#models/feedback'
import Upvote from '#models/upvote'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpvotesController {
  async handle({ request, auth }: HttpContext) {
    const account = await auth.authenticate()
    const { upvote: upvoted }: { upvote: boolean } = request.only(['upvote'])

    const feedbackId = request.param('id')
    const feedback = await Feedback.findByOrFail('id', feedbackId)

    const upvote = await Upvote.findBy('account_id', account.id)
    if (!upvote) {
      if (upvoted) {
        await Upvote.create({ feedbackId: feedback.id, accountId: account.id })
      }
    } else {
      if (!upvoted) {
        await upvote.delete()
      }
    }
  }
}
