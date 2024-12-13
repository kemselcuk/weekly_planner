import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import notesRouter from './routes/notes';
import usersRouter from './routes/users';
import meetingRoutes from './routes/meetings'; // Import the meetings route

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

// Middleware
app.use(cors()); // Enable CORS if needed
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/meetings', meetingRoutes); // Use the meetings route

// Database Connection and Server Start
const startServer = async () => {
  try {
    if (!MONGO_URI) {
      console.error('Error: MONGO_URI is not defined in environment variables');
      process.exit(1);
    }

    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
};

// Handle Graceful Shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});

startServer();
