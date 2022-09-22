import mongoose from 'mongoose';

export interface IContactField {
  name?: string;
  email?: string;
  phone?: string;
  type?: string;
}

const ContactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  type: {
    type: String,
    default: 'personal',
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Contact = mongoose.model('contact', ContactSchema);

export default Contact;
