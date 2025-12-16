import { describe, it, expect, beforeEach } from 'bun:test';
import { appointmentService } from '../../services/appointmentService';
import { seedTestData } from './seedTestData';

describe('appointmentService - integration', () => {
  let userId: string;
  const date = new Date().toISOString().slice(0, 10); // 今天
  const slot = '10:00';

  //beforeEach 會在每個 it 之前跑一次。
  beforeEach(async () => {
    const result = await seedTestData();
    userId = result.users[0].id; // 取 seed 的第一個 user
    console.log('userid' + userId);
  });


//   it('should book appointment successfully', async () => {
//     const res = await appointmentService.bookAppointment(userId, date, slot);
//     expect(res).toEqual({ success: true, date, slot });
//   });

  it('should throw if slot fully booked', async () => {
    const capacity = 10;
    
    // 預約滿這個時段
    for (let i = 0; i < capacity; i++) {
      await appointmentService.bookAppointment(userId, date, slot);
      console.log(`${i + 1} booked`);
    }
    
    // 第 11 次，檢查錯誤
    try {
      await appointmentService.bookAppointment(userId, date, slot);
      throw new Error('Test failed: Slot should be fully booked');  // 如果沒有 throw，就 fail 測試
    } catch (err: any) {
      console.log('Expected error on 11th booking:', err.message);
      expect(err.message).toBe('Slot fully booked');
    }}, { timeout: 10000 }); // 延長到 10 秒

   
   
    // expect 會無法執行 所以才用上面寫法
    // const capacity = 10;
    // for (let i = 0; i < capacity; i++) {
    //     await appointmentService.bookAppointment(userId, date, slot);
    // }
    
    // await expect(
    //   appointmentService.bookAppointment(userId, date, slot)
    // ).rejects.toThrow('Slot fully booked');

});
