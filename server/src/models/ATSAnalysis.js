import mongoose from 'mongoose';

const atsAnalysisSchema = new mongoose.Schema(
  {
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    atsScore: { type: Number, min: 0, max: 100, required: true },
    matchScore: { type: Number, min: 0, max: 100 },
    matchedSkills: { type: [String], default: [] },
    missingSkills: { type: [String], default: [] },
    experience: { type: Number }, // years of experience
    resumeAnalysis: {
      keyStrengths: { type: [String], default: [] },
      improvementAreas: { type: [String], default: [] },
      relevantExperience: { type: [String], default: [] },
    },
    analyzedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Index for quick lookups
atsAnalysisSchema.index({ candidateId: 1, createdAt: -1 });
atsAnalysisSchema.index({ jobId: 1 });

const ATSAnalysis = mongoose.model('ATSAnalysis', atsAnalysisSchema);
export default ATSAnalysis;
