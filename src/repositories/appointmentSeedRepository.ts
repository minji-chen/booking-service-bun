import { db } from '../db';
import { appointments } from '../models/appointment';
import { userAppointments } from '../models/userAppointments';
import { users } from '../models/users';


const SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
];

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export const appointmentSeedRepository = {
  async resetAndSeed() {
    return db.transaction(async (tx) => {
      /* 1️ 清空（順序很重要） */
      await tx.delete(userAppointments);
      await tx.delete(appointments);
      await tx.delete(users);

      /* 2️ 建立使用者（UUID 由 DB 產生） */
      const createdUsers = await tx
        .insert(users)
        .values([ { name: 'Alice' }, { name: 'Bob' },{ name: 'Charlie' }, { name: 'Dave' } ])
        .returning();

      /* 3️ 建立 appointments slots */
      const today = new Date();
      const appointmentRows: any[] = [];

      for (let d = 0; d <= 10; d++) {
        const date = new Date(today);
        date.setDate(today.getDate() + d);

        const dateStr = formatDate(date);

        for (const slot of SLOTS) {
          appointmentRows.push({
            date: dateStr,
            slot,
            capacity: 10,
            bookedCount: 0,
          });
        }
      }

      await tx.insert(appointments).values(appointmentRows);

      /* 4️ 回傳建立好的使用者（方便你測試） */
      return {
        users: createdUsers, // [{ id: uuid, name }]
        slotsCreated: appointmentRows.length,
      };
    });
  },
};




// import { db } from '../db';
// import { appointments } from '../models/appointment';
// import { userAppointments } from '../models/userAppointments';

// /**
//  * 固定資料
//  */
// const USERS = ['Alice', 'Bob', 'Charlie', 'Dave'];

// const SLOTS = [
//   '09:00',
//   '10:00',
//   '11:00',
//   '12:00',
//   '13:00',
//   '14:00',
//   '15:00',
//   '16:00',
// ];

// /**
//  * 工具：取得 YYYY-MM-DD
//  */
// function formatDate(date: Date): string {
//   return date.toISOString().slice(0, 10);
// }

// export const appointmentSeedRepository = {
//   /**
//    * 清空所有預約相關資料
//    * ⚠️ 僅限開發 / 測試環境
//    */
//   async clearAll() {
//     await db.transaction(async (tx) => {
//       await tx.delete(userAppointments);
//       await tx.delete(appointments);
//     });
//   },

//   /**
//    * 建立今天 ～ 未來 N 天的可預約時段
//    */
//   async seedAppointments(days = 10, capacity = 10) {
//     const rows: {
//       date: string;
//       slot: string;
//       capacity: number;
//       bookedCount: number;
//     }[] = [];

//     const today = new Date();

//     for (let d = 0; d <= days; d++) {
//       const date = new Date(today);
//       date.setDate(today.getDate() + d);

//       const dateStr = formatDate(date);

//       for (const slot of SLOTS) {
//         rows.push({
//           date: dateStr,
//           slot,
//           capacity,
//           bookedCount: 0,
//         });
//       }
//     }

//     await db.insert(appointments).values(rows);
//   },

//   /**
//    * 完整初始化（清空 → 建立）
//    */
//   async resetAndSeed() {
//     await db.transaction(async (tx) => {
//       // 1️⃣ 清空
//       await tx.delete(userAppointments);
//       await tx.delete(appointments);

//       // 2️⃣ 建立 slots
//       const rows: any[] = [];
//       const today = new Date();

//       for (let d = 0; d <= 10; d++) {
//         const date = new Date(today);
//         date.setDate(today.getDate() + d);

//         const dateStr = formatDate(date);

//         for (const slot of SLOTS) {
//           rows.push({
//             date: dateStr,
//             slot,
//             capacity: 10,
//             bookedCount: 0,
//           });
//         }
//       }

//       await tx.insert(appointments).values(rows);
//     });
//   },

//   /**
//    * 取得可用的假使用者（給測試用）
//    */
//   getTestUsers() {
//     return USERS;
//   },
// };
