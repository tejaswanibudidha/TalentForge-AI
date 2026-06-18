import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import atsRoutes from './routes/atsRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import recruiterRoutes from './routes/recruiterRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
// Note: DB connection is handled in server.js via connectDB()

const app = express();

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many authentication attempts, please try again later.' },
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(globalLimiter);

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/ats', atsRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  const database = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ database, server: 'running' });
});

app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({ message: 'SmartHire AI backend is online.' });
});

export default app;
