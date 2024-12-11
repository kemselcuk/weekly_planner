import express, { Request, Response } from 'express';
import User from '../models/User'; // This should be the Mongoose model
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();

// POST /api/users/register
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  try {
    const existingUser = await User.findOne({ email }); // User is our Mongoose model now
    if (existingUser) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, name }); // Mongoose create

    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

// POST /api/users/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const secret = process.env.JWT_SECRET || 'your_jwt_secret';
    const token = jwt.sign({ _id: user._id.toString() }, secret, { expiresIn: '1d' });

    res.json({ token });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

// GET /api/users/me
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user._id) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const user = await User.findById(req.user._id).select('_id email name');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      _id: user._id,
      email: user.email,
      name: user.name
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user info', error: err.message });
  }
});

export default router;
