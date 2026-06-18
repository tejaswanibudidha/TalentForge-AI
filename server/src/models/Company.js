import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true },
    logo: { type: String, trim: true },
    bannerImage: { type: String, trim: true },
    website: { type: String, trim: true },
    industry: { type: String, trim: true },
    headquarters: { type: String, trim: true },
    description: { type: String, trim: true },
    mission: { type: String, trim: true },
    vision: { type: String, trim: true },
    benefits: { type: [String], default: [] },
    locations: { type: [String], default: [] },
    hiringRoles: { type: [String], default: [] },
    hiringProcess: { type: String, trim: true },
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model('Company', companySchema);
export default Company;
