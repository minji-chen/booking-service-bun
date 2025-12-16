import type { Context } from 'hono';
import { appointmentService } from '../services/appointmentService';
import { appointmentSeedRepository } from '../repositories/appointmentSeedRepository';
import { validateDate } from '../utils';

export const appointmentController = 
{
  async health(c: Context) 
  {
    return c.json({ status: "ok" })
  },

  
  async getAllUsers(c: Context) 
  {
    const AllUsers = await appointmentService.getAllUsers();
    return c.json(AllUsers);
  },


  async getAvailable(c: Context) 
  {
    const dateStr = c.req.query('date');
    
    const validation = validateDate(dateStr);
    if (!validation.valid) {
      return c.json({ error: validation.error }, 400);
    }

    const slots = await appointmentService.getAvailableSlots(validation.date);
    return c.json(slots);
  },

  async book(c: Context) 
  {
    const { user_id, date, time } = await c.req.json();


    if (!user_id || !date || !time) {
       return c.json({ error: 'Date and time required' }, 400);
    }

   const validation = validateDate(date);
    if (!validation.valid) {
      return c.json({ error: validation.error }, 400);
    }

    
    try {
      const result = await appointmentService.bookAppointment(user_id , date, time);
      return c.json({ success: true, result });
    } catch (err: any) {
      return c.json({ success: false, message: err.message }, 400);
    }
    
  },

    /**
   * 初始化資料（測試用）
   */
  async resetAndSeed(ctx: Context) {
    try {
      const result = await appointmentSeedRepository.resetAndSeed();

      return ctx.json({
        success: true,
        users: result.users,
        slotsCreated: result.slotsCreated,
        message: 'Appointment data seeded successfully',
      });
    } catch (error) {
      console.error('[Seed Error]', error);

      return ctx.json(
        {
          success: false,
          message: 'Failed to seed appointment data',
        },
        500
      );
    }
  },


};
