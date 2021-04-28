import * as mongoose from 'mongoose';
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;

export const MeetingsSchema = new mongoose.Schema({
  title: { type: String, required: false },
  notes: { type: String, required: true },
  description: { type: String, required: true },
  dates: {
    type: {
      startDate: { type: Number, required: false },
      endDate: { type: Number, required: false },
    },
    required: true,
  },
  participants: {
    type: [
      {
        id: String,
        fullName: { type: String, required: true },
        lastName: { type: String, required: true },
        isAdmin: { type: Boolean, required: true },
        img: { type: String, required: false },
        isSpeaker: { type: Boolean, required: true },
      },
    ],
    required: true,
  },
});

export interface Meeting extends mongoose.Document {
  id: string;
  title: string;
  notes: string;
  description: string;
  dates: DateTimeFormatOptions[];
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
