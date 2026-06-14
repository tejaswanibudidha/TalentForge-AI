import { Router } from 'express';
import { body } from 'express-validator';
import {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getProfile,
} from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = Router();

router.post(
  '/register',
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('email').isEmail().withMessage('Valid email is required.'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .matches(/\d/)
    .withMessage('Password must contain at least one number.'),
  body('role')
    .isIn(['jobseeker', 'recruiter'])
    .withMessage('Role must be either jobseeker or recruiter.'),
  validateRequest,
  registerUser
);

router.post(
  '/login',
  body('email').isEmail().withMessage('Valid email is required.'),
  body('password').notEmpty().withMessage('Password is required.'),
  validateRequest,
  loginUser
);

router.post(
  '/forgot-password',
  body('email').isEmail().withMessage('Valid email is required.'),
  validateRequest,
  forgotPassword
);

router.post(
  '/verify-otp',
  body('email').isEmail().withMessage('Valid email is required.'),
  body('otp')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be 6 digits.')
    .isNumeric()
    .withMessage('OTP must contain only numbers.'),
  validateRequest,
  verifyOtp
);

router.post(
  '/reset-password',
  body('email').isEmail().withMessage('Valid email is required.'),
  body('otp')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be 6 digits.')
    .isNumeric()
    .withMessage('OTP must contain only numbers.'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .matches(/\d/)
    .withMessage('Password must contain at least one number.'),
  validateRequest,
  resetPassword
);

router.get('/profile', authenticate, getProfile);

export default router;
