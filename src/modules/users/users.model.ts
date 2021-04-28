import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  lastName: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  img: { type: String, required: false },
});

export interface User extends mongoose.Document {
  id: string;
  fullName: string;
  lastName: string;
  isAdmin: boolean;
  img: string;
}
