import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const appointments = pgTable('appointments', {
  id: serial('id').primaryKey(),

  date: text('date').notNull(),        // YYYY-MM-DD
  slot: text('slot').notNull(),        // HH:mm

  capacity: integer('capacity')
    .notNull()
    .default(10),                       // 可預約總數

  bookedCount: integer('booked_count')
    .notNull()
    .default(0),                       // 已預約數

  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),
});
