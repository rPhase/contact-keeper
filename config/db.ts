import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDB connected...');
  } catch (error) {
    console.error((error as Error).message);
    process.exit(1);
  }
};

export default connectDB;
