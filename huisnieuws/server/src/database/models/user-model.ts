import mongoose from 'mongoose';
import { userRole } from './enums/userRole';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
    required: true,
    enum: userRole,
  },
});

const UserModel = mongoose.model('User', userSchema);

export { UserModel, userSchema };
