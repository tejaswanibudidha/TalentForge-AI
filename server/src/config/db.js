import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smart-hire-ai';

mongoose.set('strictQuery', true);
mongoose.set('bufferCommands', false);

mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established.');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB connection disconnected.');
});

async function connectDB(options = {}) {
  const retries = Number(options.retries ?? process.env.DB_CONNECT_RETRIES ?? 5);
  const interval = Number(options.interval ?? process.env.DB_CONNECT_INTERVAL ?? 5000);

  console.log('Attempting MongoDB connection with URI:', MONGODB_URI);

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4,
      });
      console.log('Connected to MongoDB');
      return true;
    } catch (error) {
      console.error(`MongoDB connection attempt ${attempt + 1} failed:`, error.message);
      if (attempt < retries) {
        console.log(`Retrying MongoDB connection in ${interval / 1000}s...`);
        // eslint-disable-next-line no-await-in-loop
        await new Promise((res) => setTimeout(res, interval));
      }
    }
  }

  throw new Error(`Could not connect to MongoDB after ${retries + 1} attempts.`);
}

export { connectDB, mongoose };
