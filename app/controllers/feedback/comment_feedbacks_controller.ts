import Comment from '#models/comment'
import type { HttpContext } from '@adonisjs/core/http'

export default class CommentFeedbacksController {
  async handle({ request, auth, response }: HttpContext) {
    const { content, id } = request.only(['content', 'feedbackId', 'id'])
    const feedbackId = request.param('id')
    const account = await auth.authenticate()

    await Comment.create({
      id,
      content,
      feedbackId,
      senderId: account.id,
    })

    return response.created()
  }
}
