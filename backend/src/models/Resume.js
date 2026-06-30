import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  url: { type: String },
  text: { type: String },
  data: {
    name: String,
    email: String,
    phone: String,
    skills: [String],
    education: [String],
    experience: [String],
    projects: [String],
    certifications: [String],
    summary: String
  },
  createdAt: { type: Date, default: Date.now }
});

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;
