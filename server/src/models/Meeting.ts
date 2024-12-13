import mongoose, { Schema, Document } from 'mongoose';

export interface IMeeting extends Document {
  title: string;
  time: string;
  date: string;
  place: string;
  participants: string[];
  description?: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MeetingSchema = new Schema<IMeeting>(
  {
    title: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: String, required: true },
    place: { type: String, required: true },
    participants: { type: [String], required: true },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

MeetingSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
  }
});

const Meeting = mongoose.model<IMeeting>('Meeting', MeetingSchema);
export default Meeting;