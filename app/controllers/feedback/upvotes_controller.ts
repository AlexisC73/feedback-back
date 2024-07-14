import Feedback from '#models/feedback'
import Upvote from '#models/upvote'
import type { HttpContext } from '@adonisjs/core/http'
import { UpvoteInputDTO } from './dtos/upvote/upvote_input.dto.js'
import FieldErrorException from '#exceptions/field_errors_exception'

export default class UpvotesController {
  async handle({ request, auth, response }: HttpContext) {
    const account = await auth.authenticate()
    const { upvote }: { upvote: boolean } = request.only(['upvote'])

    const upvoteInputDTO = new UpvoteInputDTO({ upvote, id: request.param('id') })

    if (!upvoteInputDTO.validate()) {
      throw new FieldErrorException(upvoteInputDTO.errors)
    }

    const feedback = await Feedback.query()
      .preload('upvotes')
      .where('id', upvoteInputDTO.data.id)
      .firstOrFail()

    const fundUpvote = feedback.upvotes.find((u) => u.accountId === account.id)
    if (!fundUpvote) {
      if (upvoteInputDTO.data.upvote) {
        await Upvote.create({ feedbackId: feedback.id, accountId: account.id })
      }
    } else {
      if (!upvoteInputDTO.data.upvote) {
        await fundUpvote.delete()
      }
    }

    return response.ok(undefined)
  }
}
