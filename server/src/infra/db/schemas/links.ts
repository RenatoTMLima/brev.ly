import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const links = pgTable('links', {
  id: uuid('id').defaultRandom().primaryKey().unique(),
  originalLink: text('originalLink').notNull(),
  shortLink: text('shortLink').notNull(),
  accessNumber: integer('accessNumber').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
