import * as mongoose from 'mongoose';

export const MeetingsSchema = new mongoose.Schema({
  title: { type: String, required: false },
  notes: { type: String, required: true },
  description: { type: String, required: true },
  dates: { type: Array, required: false },
});

export interface Meeting extends mongoose.Document {
  id: string;
  title: string;
  notes: string;
  description: string;
  dates: number[];
}
