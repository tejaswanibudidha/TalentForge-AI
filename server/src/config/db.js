import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

const PRIMARY_DB_URI = process.env.MONGODB_URI || '';
const USE_MEMORY_DB = process.env.USE_MEMORY_DB === 'true';
let memoryServer;

async function getDatabaseUri({ fallback = false } = {}) {
  if (!fallback && PRIMARY_DB_URI) {
    return PRIMARY_DB_URI;
  }

  if (USE_MEMORY_DB) {
    memoryServer = await MongoMemoryServer.create();
    const uri = memoryServer.getUri();
    console.log('Using in-memory MongoDB for development at:', uri);
    return uri;
  }

  if (PRIMARY_DB_URI) {
    return PRIMARY_DB_URI;
  }

  throw new Error('No MongoDB URI provided and in-memory fallback is disabled.');
}

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
  let uri = await getDatabaseUri();
  let triedMemory = uri !== PRIMARY_DB_URI;

  console.log('Attempting MongoDB connection with URI:', uri);

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4,
      });
      console.log('Connected to MongoDB');
      return true;
    } catch (error) {
      console.error(`MongoDB connection attempt ${attempt + 1} failed:`, error.message);

      if (USE_MEMORY_DB && !triedMemory) {
        console.warn('Falling back to in-memory MongoDB because the configured database failed to connect.');
        uri = await getDatabaseUri({ fallback: true });
        triedMemory = true;
        attempt = -1;
        continue;
      }

      if (attempt < retries) {
        console.log(`Retrying MongoDB connection in ${interval / 1000}s...`);
        // eslint-disable-next-line no-await-in-loop
        await new Promise((res) => setTimeout(res, interval));
      }
    }
  }

  // In development, allow app to continue without MongoDB for demo purposes
  if (process.env.NODE_ENV === 'development') {
    console.warn('WARNING: MongoDB not available. Running in demo mode without persistence.');
    return false;
  }
  throw new Error(`Could not connect to MongoDB after ${retries + 1} attempts.`);
}

export { connectDB, mongoose };
