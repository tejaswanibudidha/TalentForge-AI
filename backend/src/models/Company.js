import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  companyId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  industry: { type: String, required: true },
  description: { type: String },
  website: { type: String },
  headquarters: { type: String },
  logoUrl: { type: String },
  bannerUrl: { type: String },
  benefits: [{ type: String }],
  hiringRoles: [{ type: String }],
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Company = mongoose.model('Company', companySchema);
export default Company;
