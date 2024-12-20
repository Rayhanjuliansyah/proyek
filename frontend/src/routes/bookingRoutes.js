import { Router } from 'express';
import { BookingStore } from '../models/Booking.js';
import { UstadStore } from '../models/Ustad.js';

export const bookingRouter = Router();

// Create new booking
bookingRouter.post('/', async (req, res) => {
  const ustad = UstadStore.findById(req.body.ustadId);
  if (!ustad) {
    return res.status(404).json({ message: 'Ustad not found' });
  }

  // Calculate total amount
  const totalAmount = ustad.hourlyRate * req.body.duration;

  const booking = BookingStore.create({
    ...req.body,
    totalAmount,
    status: 'pending'
  });

  res.status(201).json(booking);
});

// Get user's bookings
bookingRouter.get('/user/:userId', (req, res) => {
  const bookings = BookingStore.findByUserId(req.params.userId);
  res.json(bookings);
});

// Get ustad's bookings
bookingRouter.get('/ustad/:ustadId', (req, res) => {
  const bookings = BookingStore.findByUstadId(req.params.ustadId);
  res.json(bookings);
});

// Update booking status
bookingRouter.patch('/:id/status', (req, res) => {
  const booking = BookingStore.updateStatus(req.params.id, req.body.status);
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }
  res.json(booking);
});