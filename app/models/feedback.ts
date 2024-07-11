import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { FeedbackCategory, FeedbackStatus } from '../../lib/domain/feedback/feedback.js'
import Account from './account.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import Upvote from './upvote.js'

export default class Feedback extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare category: FeedbackCategory

  @column()
  declare status: FeedbackStatus

  @column()
  declare ownerId: string

  @belongsTo(() => Account)
  declare owner: BelongsTo<typeof Account>

  @hasMany(() => Upvote)
  declare upvotes: HasMany<typeof Upvote>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateUUID(feedback: Feedback) {
    feedback.id = randomUUID()
  }
}
