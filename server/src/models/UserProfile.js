import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    location: { type: String, trim: true },
    bio: { type: String, trim: true, maxlength: 1000 },
    skills: { type: [String], default: [] },
    education: { type: [String], default: [] },
    experience: { type: [String], default: [] },
    resumeUrl: { type: String, trim: true },
    profileImage: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const UserProfile = mongoose.model('UserProfile', userProfileSchema);
export default UserProfile;
