import Comment from '#models/comment'
import type { HttpContext } from '@adonisjs/core/http'
import { CommentFeedbackInputDTO } from './dtos/comment_feedback/comment_feedback_input.dto.js'
import FieldErrorException from '#exceptions/field_errors_exception'

export default class CommentFeedbacksController {
  async handle({ request, auth, response }: HttpContext) {
    const { content, feedbackId, id } = request.only(['content', 'feedbackId', 'id'])
    const commentFeedbackInputDTO = new CommentFeedbackInputDTO({
      content,
      feedbackId,
      id,
    })

    if (!commentFeedbackInputDTO.validate()) {
      throw new FieldErrorException(commentFeedbackInputDTO.errors)
    }

    const account = await auth.authenticate()

    await Comment.create({
      id: commentFeedbackInputDTO.id,
      content: commentFeedbackInputDTO.content,
      feedbackId: commentFeedbackInputDTO.feedbackId,
      senderId: account.id,
    })

    return response.created()
  }
}
