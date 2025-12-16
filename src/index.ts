import { Hono } from 'hono'
import appointmentRouter from './routes/appointment';

const app = new Hono()
app.route('/', appointmentRouter);

export default {
  port: 3000,
  fetch: app.fetch,
}
