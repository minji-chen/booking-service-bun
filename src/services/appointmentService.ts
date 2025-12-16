
// scr//appointmentService.ts


import { appointmentRepository } from '../repositories/appointmentRepository';

//目前有三種做法 
// 一種是產SLOT時候 定義好規則 所以不會包含這些時間 就不必判斷
// 一種是產全部時間 再用篩選機制 
const BUSINESS_HOURS = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
];

export const appointmentService = {

  async getAllUsers() {
    const AllUsers = await appointmentRepository.findAllUsers();
    return AllUsers;
  },

  async getAvailableSlots(date: string) {
    const booked = await appointmentRepository.findAvailableByDate(date);
    const bookedSlots = booked.map(b => b.slot);
    //const available = BUSINESS_HOURS.filter(slot => !bookedSlots.includes(slot));
    return { available_times: bookedSlots };
  },

  async bookAppointment(userId: string, date: string, slot: string) {

     //Business rule: 營業時間判斷
    if (!BUSINESS_HOURS.includes(slot)) throw new Error('Shop closed');
    
    const user = await appointmentRepository.findUsersById(userId);
    if(!user)  throw new Error('User not found');

    return appointmentRepository.bookWithTransaction(userId, date, slot);
  },
};
