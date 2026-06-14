import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  description: { type: String },
  location: { type: String },
  salaryRange: { type: String },
  experienceLevel: { type: String },
  remoteType: { type: String },
  skills: [String],
  createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
