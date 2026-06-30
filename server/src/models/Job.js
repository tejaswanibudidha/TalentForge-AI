import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: false },
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String, trim: true, required: true },
    salary: { type: Number },
    experience: { type: String, trim: true },
    skills: { type: [String], default: [] },
    description: { type: String, trim: true, required: true },
    jobType: { type: String, trim: true, required: true },
    openings: { type: Number, default: 1 },
    status: { type: String, trim: true, default: 'active' },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model('Job', jobSchema);
export default Job;
