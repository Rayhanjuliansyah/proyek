import { Router } from 'express';
import { UstadStore } from '../models/Ustad.js';

export const ustadRouter = Router();

// Get all available ustads
ustadRouter.get('/available', (req, res) => {
  const ustads = UstadStore.findAvailable();
  res.json(ustads);
});

// Get single ustad with details
ustadRouter.get('/:id', (req, res) => {
  const ustad = UstadStore.findById(req.params.id);
  if (!ustad) {
    return res.status(404).json({ message: 'Ustad not found' });
  }
  res.json(ustad);
});

// Update ustad availability
ustadRouter.patch('/:id/availability', (req, res) => {
  const ustad = UstadStore.update(req.params.id, {
    availability: req.body.availability
  });
  if (!ustad) {
    return res.status(404).json({ message: 'Ustad not found' });
  }
  res.json(ustad);
});