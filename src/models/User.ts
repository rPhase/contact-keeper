import mongoose from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password: string;
  date: Date;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const User = mongoose.model('user', UserSchema);

export default User;
