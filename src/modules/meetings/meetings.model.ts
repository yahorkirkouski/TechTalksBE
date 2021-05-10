import * as mongoose from 'mongoose';

export const MeetingsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  notes: { type: String, required: false },
  description: { type: String, required: false },
  dates: {
    type: [{ type: String, required: false }],
    required: false,
  },
  participants: {
    type: [
      {
        id: String,
        fullName: { type: String, required: false },
        lastName: { type: String, required: false },
        isAdmin: { type: Boolean, required: false },
        img: { type: String, required: false },
        isSpeaker: { type: Boolean, required: false },
      },
    ],
    required: false,
  },
});

export interface Meeting extends mongoose.Document {
  id: string;
  title: string;
  notes: string;
  description: string;
  dates: string[];
  participants: Participants[];
}

export interface Participants {
  id: string;
  fullName: string;
  lastName: string;
  isAdmin: boolean;
  img: string;
  isSpeaker: boolean;
}
