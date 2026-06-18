import { Router } from 'express';
import { authenticate, recruiterOnly } from '../middlewares/authMiddleware.js';
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';

const router = Router();

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', authenticate, recruiterOnly, createJob);
router.put('/:id', authenticate, recruiterOnly, updateJob);
router.delete('/:id', authenticate, recruiterOnly, deleteJob);

export default router;
