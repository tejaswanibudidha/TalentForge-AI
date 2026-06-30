import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/authMiddleware.js';
import { uploadResume, getResumes } from '../controllers/resumeController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', protect, upload.single('resume'), uploadResume);
router.get('/', protect, getResumes);

export default router;
