import Feedback from '#models/feedback'
import type { HttpContext } from '@adonisjs/core/http'
import { EditFeedbackInputDTO } from './dtos/edit_feedback/edit_feedback_input.dto.js'
import FieldErrorException from '#exceptions/field_errors_exception'

export default class EditFeedbacksController {
  async handle({ request, response, auth }: HttpContext) {
    const user = await auth.authenticate()

    const { title, description, category, status } = request.only([
      'title',
      'description',
      'category',
      'status',
    ])

    const editFeedbackInputDTO = new EditFeedbackInputDTO({
      id: request.param('id'),
      title,
      description,
      category,
      status,
    })

    if (!editFeedbackInputDTO.validate()) {
      throw new FieldErrorException(editFeedbackInputDTO.errors)
    }

    const feedback = await Feedback.findOrFail(editFeedbackInputDTO.id)

    if (feedback.ownerId !== user.id) {
      return response.unauthorized()
    }

    feedback.title = editFeedbackInputDTO.title
    feedback.description = editFeedbackInputDTO.description
    feedback.category = editFeedbackInputDTO.category
    feedback.status = editFeedbackInputDTO.status
    await feedback.save()
    return
  }
}
