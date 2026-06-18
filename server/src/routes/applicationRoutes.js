import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
} from '../controllers/applicationController.js';

const router = Router();

router.get('/', authenticate, getApplications);
router.get('/:id', authenticate, getApplicationById);
router.post('/', authenticate, createApplication);
router.put('/:id', authenticate, updateApplication);

export default router;
