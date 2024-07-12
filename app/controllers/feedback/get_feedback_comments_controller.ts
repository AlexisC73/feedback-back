import { DomainComment } from '#lib/domain/comments/comment'
import Comment from '#models/comment'
import type { HttpContext } from '@adonisjs/core/http'

export default class GetFeedbackCommentsController {
  async handle({ auth, request }: HttpContext) {
    await auth.authenticate()
    const feedbackId = request.param('id')

    const comments = await Comment.query().where('feedbackId', feedbackId).preload('sender').exec()

    const domainComments: DomainComment[] = comments.map((c) => ({
      id: c.id,
      sender: {
        name: c.sender.email,
        avatar: c.sender.avatar,
      },
      content: c.content,
      feedbackId: c.feedbackId,
    }))

    return domainComments
  }
}
