import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  fullName: { type: String, required: false },
  lastName: { type: String, required: false },
  isAdmin: { type: Boolean, required: false },
  img: { type: String, required: false },
});

export interface User extends mongoose.Document {
  id: string;
  fullName: string;
  lastName: string;
  isAdmin: boolean;
  img: string;
}
