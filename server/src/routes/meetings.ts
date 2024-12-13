import express, { Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import Meeting from '../models/Meeting';
import mongoose from 'mongoose';

const router = express.Router();

// GET /api/meetings
router.get('/', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }
    const meetings = await Meeting.find({ user: req.user._id });
    res.json(meetings);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching meetings', error: err.message });
  }
});

// POST /api/meetings
router.post('/', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, time, date, place, participants, description } = req.body;

  if (!title || !time || !date || !place || !participants) {
    res.status(400).json({ message: 'All fields except description are required' });
    return;
  }

  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }
    const newMeeting = await Meeting.create({
      title,
      time,
      date,
      place,
      participants,
      description,
      user: req.user._id,
    });

    res.status(201).json(newMeeting);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Error creating meeting', error: err.message });
  }
});

// DELETE /api/meetings/:id
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const meetingId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(meetingId)) {
      res.status(400).json({ message: 'Invalid meeting ID' });
      return;
    }

    const meeting = await Meeting.findById(meetingId);

    if (!meeting) {
      res.status(404).json({ message: 'Meeting not found' });
      return;
    }

    if (meeting.user.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: 'Not authorized to delete this meeting' });
      return;
    }

    await Meeting.deleteOne({ _id: meetingId });
    res.json({ message: 'Meeting deleted' });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting meeting', error: err.message });
  }
});

export default router;