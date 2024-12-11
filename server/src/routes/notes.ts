import express, { Request, Response } from 'express';
import Note from '../models/Note';
import { authMiddleware } from '../middleware/authMiddleware'; 

interface AuthRequest extends Request {
  user?: { _id: string };
}

const router = express.Router();

// Apply authMiddleware to all routes in this router
router.use(authMiddleware);

// CREATE a Note (for the logged-in user)
router.post('/', async (req: AuthRequest, res: Response): Promise<void> => {
  const { day, content, time, color } = req.body;
  
  if (!day || !content) {
    res.status(400).json({ message: 'day and content are required' });
    return; // end function after sending response
  }

  try {
    const note = await Note.create({ 
      user: req.user?._id,
      day, 
      content, 
      time, 
      color 
    });
    res.status(201).json(note);
    // No return needed here, the function ends after sending response
  } catch (err: any) {
    res.status(500).json({ message: 'Error creating note', error: err.message });
  }
});

// READ all notes belonging to the logged-in user (optional day filter)
router.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  const { day } = req.query;
  const query: Record<string, any> = { user: req.user?._id };

  if (day) {
    query.day = Number(day);
  }

  try {
    const notes = await Note.find(query).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err: any) {
    res.status(500).json({ message: 'Error fetching notes', error: err.message });
  }
});

// READ a single note by ID (must belong to the user)
router.get('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const note = await Note.findOne({ _id: id, user: req.user?._id });
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return; // stop execution here
    }
    res.json(note);
  } catch (err: any) {
    res.status(500).json({ message: 'Error fetching the note', error: err.message });
  }
});

// UPDATE a note by ID (user must own the note)
router.put('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { day, content, time, color } = req.body;

  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, user: req.user?._id },
      { day, content, time, color },
      { new: true }
    );

    if (!updatedNote) {
      res.status(404).json({ message: 'Note not found or not owned by user' });
      return;
    }

    res.json(updatedNote);
  } catch (err: any) {
    res.status(500).json({ message: 'Error updating the note', error: err.message });
  }
});

// DELETE a note by ID (user must own the note)
router.delete('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedNote = await Note.findOneAndDelete({ _id: id, user: req.user?._id });
    if (!deletedNote) {
      res.status(404).json({ message: 'Note not found or not owned by user' });
      return;
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: 'Error deleting the note', error: err.message });
  }
});

export default router;