// scr/repositories/appointmentRepository.ts

import { db } from '../db';
import { appointments } from '../models/appointment';
import { userAppointments } from '../models/userAppointments';
import { users } from '../models/users';
import { sql, eq, lt, and } from 'drizzle-orm';

export const appointmentRepository = {

  async findAllUsers() {
     return db
       .select()
       .from(users);
  },


  async findUsersById(userId: string) {
     const result = await db
       .select()
       .from(users)
       .where(eq(users.id, userId)) //eq(a, b) → a = b  
       .limit(1);

       return result[0] ?? null; 
  },


  async findAvailableByDate(date: string) {
     return db
       .select()
       .from(appointments)
       .where(
         and(
           eq(appointments.date, date), //eq(a, b) → a = b
           lt(appointments.bookedCount, appointments.capacity) //lt(a, b) → a < b
         )
       );
  },



  /**
   * 使用 transaction 預約，避免同時超賣
   */
  async bookWithTransaction(userId: string, date: string, slot: string) {

    return db.transaction(async (tx) => {
      // 1️查詢該時段尚有空位的 appointment 並鎖定 row
      const result = await tx.execute(
        sql`
          SELECT * FROM appointments
          WHERE date = ${date} AND slot = ${slot}
          AND booked_count < capacity
          FOR UPDATE
          LIMIT 1
          `
      );

      if (!result.rows.length) {
        throw new Error('Slot fully booked');
      }

      const appointmentId = result.rows[0].id;

      // 2️更新 bookedCount
      await tx.update(appointments)
        .set({ bookedCount: sql`${appointments.bookedCount} + 1` })
        .where(eq(appointments.id, appointmentId));

      // 3️建立使用者預約
      await tx.insert(userAppointments).values({ userId, date, slot });

      return { success: true, date, slot };
    });
  },


};