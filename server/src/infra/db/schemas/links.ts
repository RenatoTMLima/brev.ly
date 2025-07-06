import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const links = pgTable('links', {
  id: uuid('id').defaultRandom().primaryKey().unique(),
  originalLink: text('original_link').notNull(),
  shortLink: text('short_link').notNull(),
  accessNumber: integer('access_number').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
