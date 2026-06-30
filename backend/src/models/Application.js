import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  applicationId: { type: String, unique: true, required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
  resumeUrl: { type: String },
  applicationStatus: {
    type: String,
    enum: ['Applied', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Selected', 'Rejected'],
    default: 'Applied'
  },
  aiScore: { type: Number, min: 0, max: 100 },
  atsScore: { type: Number, min: 0, max: 100 },
  skillMatch: { type: Number, min: 0, max: 100 },
  personalDetails: {
    fullName: String,
    email: String,
    phone: String,
    location: String
  },
  education: [{
    institution: String,
    degree: String,
    field: String,
    graduationYear: String
  }],
  skills: [String],
  additionalInfo: { type: String },
  appliedDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Application = mongoose.model('Application', applicationSchema);
export default Application;
