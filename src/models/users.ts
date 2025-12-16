import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(), // UUID (GUID)

  name: text('name').notNull(),

  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),
});