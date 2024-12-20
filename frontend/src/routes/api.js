import { Router } from 'express';
import { ustadRouter } from './ustadRoutes.js';
import { bookingRouter } from './bookingRoutes.js';
import { chatRouter } from './chatRoutes.js';

export const router = Router();

router.use('/ustads', ustadRouter);
router.use('/bookings', bookingRouter);
router.use('/chats', chatRouter);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});