import type { HttpContext } from '@adonisjs/core/http'

import Feedback from '#models/feedback'
import { DeleteFeedbackInputDTO } from './dtos/delete_feedback/delete_feedback_input.dto.js'
import FieldErrorException from '#exceptions/field_errors_exception'

export default class DeleteFeedbacksController {
  async handle({ request, response, auth }: HttpContext) {
    const account = await auth.authenticate()

    const deleteInputDTO = new DeleteFeedbackInputDTO({ id: request.param('id') })

    if (!deleteInputDTO.validate()) {
      throw new FieldErrorException(deleteInputDTO.errors)
    }
    const feedback = await Feedback.findBy('id', deleteInputDTO.data.id)

    if (!feedback) {
      return
    }

    if (feedback.ownerId !== account.id) {
      return response.unauthorized()
    }

    await feedback.delete()
    return
  }
}
