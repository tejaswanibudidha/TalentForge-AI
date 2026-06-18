import bcrypt from 'bcryptjs';
import UserProfile from '../models/UserProfile.js';
import User from '../models/User.js';
import { isValidEmail, isStrongPassword } from '../utils/validators.js';

function formatError(message) {
  return { success: false, message };
}

function formatSuccess(message, data = {}) {
  return { success: true, message, data };
}

function normalizeArrayField(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter((item) => typeof item === 'string' && item.trim().length > 0).map((item) => item.trim());
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }
  return [];
}

export async function getUserProfile(req, res, next) {
  try {
    const profile = await UserProfile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(404).json(formatError('User profile not found.'));
    }

    res.json(formatSuccess('Profile retrieved successfully.', { profile }));
  } catch (error) {
    next(error);
  }
}

export async function updateUserProfile(req, res, next) {
  try {
    const {
      fullName,
      phone,
      location,
      bio,
      skills,
      education,
      experience,
      resumeUrl,
      profileImage,
    } = req.body;

    const update = {
      ...(fullName !== undefined && { fullName: String(fullName).trim() }),
      ...(phone !== undefined && { phone: String(phone).trim() }),
      ...(location !== undefined && { location: String(location).trim() }),
      ...(bio !== undefined && { bio: String(bio).trim() }),
      ...(skills !== undefined && { skills: normalizeArrayField(skills) }),
      ...(education !== undefined && { education: normalizeArrayField(education) }),
      ...(experience !== undefined && { experience: normalizeArrayField(experience) }),
      ...(resumeUrl !== undefined && { resumeUrl: String(resumeUrl).trim() }),
      ...(profileImage !== undefined && { profileImage: String(profileImage).trim() }),
    };

    if (update.fullName !== undefined && update.fullName.length === 0) {
      return res.status(400).json(formatError('Full name cannot be empty.'));
    }

    const profile = await UserProfile.findOneAndUpdate(
      { userId: req.user.id },
      { $set: update },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json(formatSuccess('Profile updated successfully.', { profile }));
  } catch (error) {
    next(error);
  }
}

export async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json(formatError('Current password and new password are required.'));
    }

    if (!isStrongPassword(newPassword)) {
      return res.status(400).json(formatError('New password must be at least 8 characters long and include letters and numbers.'));
    }

    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return res.status(404).json(formatError('User not found.'));
    }

    const passwordMatches = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatches) {
      return res.status(401).json(formatError('Current password is incorrect.'));
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.json(formatSuccess('Password changed successfully.'));
  } catch (error) {
    next(error);
  }
}
