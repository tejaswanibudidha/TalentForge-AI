import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  website: { type: String },
  industry: { type: String },
  description: { type: String },
  logo: { type: String },
  size: { type: String },
  socialLinks: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now }
});

const Company = mongoose.model('Company', companySchema);
export default Company;
