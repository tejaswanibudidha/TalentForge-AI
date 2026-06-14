import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smart-hire-ai';

mongoose.set('strictQuery', true);

async function connectDB(options = {}) {
  const retries = Number(options.retries ?? process.env.DB_CONNECT_RETRIES ?? 5);
  const interval = Number(options.interval ?? process.env.DB_CONNECT_INTERVAL ?? 5000);

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB');
      return true;
    } catch (error) {
      console.error(`MongoDB connection attempt ${attempt + 1} failed:`, error.message);
      if (attempt < retries) {
        console.log(`Retrying MongoDB connection in ${interval / 1000}s...`);
        // eslint-disable-next-line no-await-in-loop
        await new Promise((res) => setTimeout(res, interval));
      } else {
        console.error('Could not connect to MongoDB after retries. Continuing without DB. Some features may be limited.');
        return false;
      }
    }
  }
}

export { connectDB, mongoose };
