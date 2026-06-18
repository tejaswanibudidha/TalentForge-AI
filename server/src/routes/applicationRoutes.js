import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
} from '../controllers/applicationController.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = Router();

router.get('/', authenticate, getApplications);
router.get('/:id', authenticate, getApplicationById);
router.post('/', authenticate, upload.single('resume'), createApplication);
router.put('/:id', authenticate, updateApplication);

export default router;
