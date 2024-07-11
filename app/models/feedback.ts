import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { FeedbackCategory, FeedbackStatus } from '../../lib/domain/feedback/feedback.js'
import Account from './account.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

export default class Feedback extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateUUID(account: Account) {
    account.id = randomUUID()
  }
}
