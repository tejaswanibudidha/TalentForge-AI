import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
} from '../controllers/profileController.js';

const router = Router();

router.get('/profile', authenticate, getUserProfile);

router.put(
  '/profile',
  authenticate,
  body('fullName').optional().trim().notEmpty().withMessage('Full name cannot be empty.'),
  body('phone').optional().trim().isLength({ max: 50 }).withMessage('Phone must be under 50 characters.'),
  body('location').optional().trim().isLength({ max: 100 }).withMessage('Location must be under 100 characters.'),
  body('bio').optional().trim().isLength({ max: 1000 }).withMessage('Bio must be under 1000 characters.'),
  body('skills').optional().custom((value) => {
    if (typeof value === 'string' || Array.isArray(value)) return true;
    throw new Error('Skills must be a comma-separated string or array of strings.');
  }),
  body('education').optional().custom((value) => {
    if (typeof value === 'string' || Array.isArray(value)) return true;
    throw new Error('Education must be a comma-separated string or array of strings.');
  }),
  body('experience').optional().custom((value) => {
    if (typeof value === 'string' || Array.isArray(value)) return true;
    throw new Error('Experience must be a comma-separated string or array of strings.');
  }),
  body('resumeUrl').optional().trim().isURL().withMessage('Resume URL must be a valid URL.'),
  body('profileImage').optional().trim().isURL().withMessage('Profile image must be a valid URL.'),
  validateRequest,
  updateUserProfile
);

router.put(
  '/change-password',
  authenticate,
  body('currentPassword').notEmpty().withMessage('Current password is required.'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long.')
    .matches(/[0-9]/)
    .withMessage('New password must contain at least one number.'),
  validateRequest,
  changePassword
);

export default router;
