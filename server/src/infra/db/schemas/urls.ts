import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core'

export const urls = pgTable('urls', {
    id: text('id').primaryKey().notNull().unique(),
    originalUrl: text('originalUrl').notNull(),
    shortUrl: text('shortUrl').notNull(),
    accesses: integer('accesses').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})