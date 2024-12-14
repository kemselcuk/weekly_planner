import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  user: mongoose.Types.ObjectId;
  date: string;             // Changed from day to date
  content: string;
  time?: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'pending' | 'in-progress' | 'completed';
}

const NoteSchema = new Schema<INote>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true }, // Changed from day to date
    content: { type: String, required: true },
    time: { type: String },
    color: { type: String },
    status: { 
      type: String, 
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending'
    },
  },
  { timestamps: true }
);

const Note = mongoose.model<INote>('Note', NoteSchema);
export default Note;
