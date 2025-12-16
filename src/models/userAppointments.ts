// src/models/userAppointments.ts
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const userAppointments = pgTable('user_appointments', {
  id: serial('id').primaryKey(),

  userId: text('user_id').notNull(),

  date: text('date').notNull(),   // YYYY-MM-DD
  slot: text('slot').notNull(),   // HH:mm

  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),
});
