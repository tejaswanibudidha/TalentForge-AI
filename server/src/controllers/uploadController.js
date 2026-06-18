import Resume from '../models/Resume.js';
import UserProfile from '../models/UserProfile.js';
import { uploadBufferToCloudinary } from '../services/cloudinaryService.js';

function formatError(message) {
  return { success: false, message };
}

function formatSuccess(message, data = {}) {
  return { success: true, message, data };
}

export async function uploadResume(req, res, next) {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json(formatError('Resume file is required.'));
    }

    const publicId = `talentforge/resumes/${req.user.id}-${Date.now()}`;
    const result = await uploadBufferToCloudinary(req.file.buffer, {
      folder: 'talentforge/resumes',
      publicId,
      resourceType: 'raw',
    });

    const resume = await Resume.create({
      candidate: req.user.id,
      fileUrl: result.secure_url,
    });

    res.status(201).json(formatSuccess('Resume uploaded successfully.', {
      resumeId: resume._id,
      fileUrl: resume.fileUrl,
    }));
  } catch (error) {
    next(error);
  }
}

export async function uploadProfileImage(req, res, next) {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json(formatError('Profile image file is required.'));
    }

    const publicId = `talentforge/profile-images/${req.user.id}-${Date.now()}`;
    const result = await uploadBufferToCloudinary(req.file.buffer, {
      folder: 'talentforge/profile-images',
      publicId,
      resourceType: 'image',
    });

    const profile = await UserProfile.findOneAndUpdate(
      { userId: req.user.id },
      { $set: { profileImage: result.secure_url } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(201).json(formatSuccess('Profile image uploaded successfully.', {
      profileImageUrl: result.secure_url,
      profile,
    }));
  } catch (error) {
    next(error);
  }
}
