import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  user: mongoose.Types.ObjectId;
  day: number;              // or string if you prefer days as strings
  content: string;
  time?: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    day: { type: Number, required: true },
    content: { type: String, required: true },
    time: { type: String },
    color: { type: String },
  },
  { timestamps: true }
);

const Note = mongoose.model<INote>('Note', NoteSchema);
export default Note;
