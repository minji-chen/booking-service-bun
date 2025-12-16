import { Hono } from 'hono';
import { appointmentController } from '../controllers/appointmentController';

const router = new Hono();
router.get('/resetAndSeed', appointmentController.resetAndSeed);
router.get('/users', appointmentController.getAllUsers);
router.get('/health', appointmentController.health);
router.get('/slots', appointmentController.getAvailable);
router.post('/bookings', appointmentController.book);

export default router;