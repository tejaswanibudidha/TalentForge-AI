import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/emailService.js';

export function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export function createAuthToken(user) {
  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

export function createOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendResetOtp(email, otp, name) {
  const subject = 'TalentForge Password Reset OTP';
  const html = `
    <div style="font-family: Arial, sans-serif; line-height:1.6;">
      <p>Hi ${name || 'user'},</p>
      <p>Your TalentForge password reset code is:</p>
      <p style="font-size: 24px; font-weight: 700;">${otp}</p>
      <p>This code expires in ${process.env.OTP_EXPIRES_MINUTES || 15} minutes.</p>
      <p>If you did not request a password reset, please ignore this email.</p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject,
    html,
    text: `Your TalentForge password reset code is ${otp}. It expires in ${process.env.OTP_EXPIRES_MINUTES || 15} minutes.`,
  });
}

export function sanitizeUser(user) {
  if (!user) return null;
  const name = user.name || user.fullName || '';
  return {
    id: user._id?.toString?.(),
    name,
    fullName: name,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
    profileCompleted: user.profileCompleted,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
