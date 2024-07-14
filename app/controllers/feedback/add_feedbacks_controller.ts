import Feedback from '#models/feedback'
import type { HttpContext } from '@adonisjs/core/http'
import { FeedbackStatus } from '../../../lib/domain/feedback/feedback.js'
import { AddFeedbackInputDTO } from './dtos/add_feedback/add_feedback_input.dto.js'
import FieldErrorException from '#exceptions/field_errors_exception'

export default class AddFeedbacksController {
  constructor() {}

  async handle({ response, request, auth }: HttpContext) {
    const { title, description, category, id } = request.only([
      'title',
      'description',
      'category',
      'id',
    ])

    const addFeedbackInputDTO = new AddFeedbackInputDTO({
      id,
      title,
      description,
      category,
    })

    if (!addFeedbackInputDTO.validate()) {
      throw new FieldErrorException(addFeedbackInputDTO.errors)
    }

    const account = await auth.authenticate()

    await Feedback.create({
      id: addFeedbackInputDTO.id,
      title: addFeedbackInputDTO.title,
      description: addFeedbackInputDTO.description,
      category: addFeedbackInputDTO.category,
      ownerId: account.id,
      status: FeedbackStatus.SUGGESTION,
    })
    return response.created()
  }
}
