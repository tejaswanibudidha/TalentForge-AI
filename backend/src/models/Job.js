import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  jobId: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  requiredSkills: [{ type: String }],
  experience: { type: String },
  salary: { type: String },
  location: { type: String, required: true },
  employmentType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Temporary'], default: 'Full-time' },
  status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
  postedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
