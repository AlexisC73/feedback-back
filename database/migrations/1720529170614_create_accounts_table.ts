import { BaseSchema } from '@adonisjs/lucid/schema'
import { Role } from '../../lib/domain/accounts/accounts.js'

export default class extends BaseSchema {
  protected tableName = 'accounts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id', { primaryKey: true })
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('role').defaultTo(Role.USER).notNullable()
      table.string('avatar').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
