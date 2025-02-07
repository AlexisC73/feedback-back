import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'

export default class Upvote extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare feedbackId: string

  @column()
  declare accountId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateUUID(upvote: Upvote) {
    upvote.id = randomUUID()
  }
}
