import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { resumeUpload, profileImageUpload } from '../middlewares/uploadMiddleware.js';
import { uploadResume, uploadProfileImage } from '../controllers/uploadController.js';

const router = Router();

router.post('/resume', authenticate, resumeUpload, uploadResume);
router.post('/profile-image', authenticate, profileImageUpload, uploadProfileImage);

export default router;
