import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application' },
  scheduledAt: { type: Date },
  interviewer: { type: String },
  mode: { type: String, default: 'Video' },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Interview = mongoose.model('Interview', interviewSchema);
export default Interview;
