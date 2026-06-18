import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import {
  createAuthToken,
  createOtp,
  hashPassword,
  sendResetOtp,
  sanitizeUser,
} from '../services/authService.js';
import {
  isValidEmail,
  isStrongPassword,
  isValidRole,
} from '../utils/validators.js';

function formatError(message) {
  return { success: false, message };
}

function formatSuccess(message, data = {}) {
  return { success: true, message, data };
}

export async function registerUser(req, res, next) {
  try {
    const fullName = (req.body.fullName || req.body.name || '').trim();
    const { email, password, role } = req.body;

    if (!fullName) {
      return res.status(400).json(formatError('Full name is required.'));
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json(formatError('A valid email address is required.'));
    }

    if (!password || !isStrongPassword(password)) {
      return res.status(400).json(formatError('Password must be at least 8 characters long and include letters and numbers.'));
    }

    if (!role || !isValidRole(role)) {
      return res.status(400).json(formatError('Role must be either jobseeker or recruiter.'));
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json(formatError('Email address is already registered.'));
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      fullName,
      email: normalizedEmail,
      password: hashedPassword,
      role,
      isVerified: false,
    });

    const token = createAuthToken(user);
    res.status(201).json(formatSuccess('Registration successful.', {
      token,
      user: sanitizeUser(user),
    }));
  } catch (error) {
    next(error);
  }
}

export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json(formatError('A valid email address is required.'));
    }

    if (!password) {
      return res.status(400).json(formatError('Password is required.'));
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (!user) {
      return res.status(401).json(formatError('Invalid email or password.'));
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json(formatError('Invalid email or password.'));
    }

    const token = createAuthToken(user);
    res.json(formatSuccess('Login successful.', {
      token,
      user: sanitizeUser(user),
    }));
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    if (!email || !isValidEmail(email)) {
      return res.status(400).json(formatError('A valid email address is required.'));
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(200).json(formatSuccess('If that email is registered, a password reset OTP has been sent.'));
    }

    const otp = createOtp();
    const hashedOtp = await hashPassword(otp);
    const expires = new Date(Date.now() + Number(process.env.OTP_EXPIRES_MINUTES || 10) * 60 * 1000);

    user.otp = hashedOtp;
    user.otpExpiry = expires;
    user.otpVerified = false;
    await user.save();

    await sendResetOtp(user.email, otp, user.fullName);

    res.json(formatSuccess('If that email is registered, a password reset OTP has been sent.'));
  } catch (error) {
    next(error);
  }
}

export async function verifyOtp(req, res, next) {
  try {
    const { email, otp } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json(formatError('A valid email address is required.'));
    }

    if (!otp || !/^[0-9]{6}$/.test(otp)) {
      return res.status(400).json(formatError('A valid 6-digit OTP is required.'));
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select('+otp +otpExpiry +otpVerified');
    if (!user || !user.otp || !user.otpExpiry) {
      return res.status(400).json(formatError('Invalid or expired OTP.'));
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json(formatError('OTP has expired. Please request a new one.'));
    }

    const otpMatches = await bcrypt.compare(otp, user.otp);
    if (!otpMatches) {
      return res.status(400).json(formatError('Invalid OTP.'));
    }

    user.otpVerified = true;
    await user.save();

    res.json(formatSuccess('OTP verified successfully. You may now reset your password.'));
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json(formatError('A valid email address is required.'));
    }

    if (!otp || !/^[0-9]{6}$/.test(otp)) {
      return res.status(400).json(formatError('A valid 6-digit OTP is required.'));
    }

    if (!newPassword || !isStrongPassword(newPassword)) {
      return res.status(400).json(formatError('Password must be at least 8 characters long and include letters and numbers.'));
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select('+password +otp +otpExpiry');
    if (!user || !user.otp || !user.otpExpiry) {
      return res.status(400).json(formatError('OTP verification is required before resetting your password.'));
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json(formatError('OTP has expired. Please request a new one.'));
    }

    const otpMatches = await bcrypt.compare(otp, user.otp);
    if (!otpMatches) {
      return res.status(400).json(formatError('Invalid OTP.'));
    }

    user.password = await hashPassword(newPassword);
    user.otp = undefined;
    user.otpExpiry = undefined;
    user.otpVerified = false;
    await user.save();

    res.json(formatSuccess('Password reset successfully. You can now log in with your new password.'));
  } catch (error) {
    next(error);
  }
}

export async function getProfile(req, res, next) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json(formatError('Authentication required.'));
    }

    const profile = await User.findById(user.id);
    if (!profile) {
      return res.status(404).json(formatError('User not found.'));
    }

    res.json(formatSuccess('Profile loaded successfully.', {
      user: sanitizeUser(profile),
    }));
  } catch (error) {
    next(error);
  }
}
