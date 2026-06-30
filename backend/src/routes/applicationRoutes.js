import express from 'express';
import {
  createApplication,
  getApplicationById,
  getMyApplications,
  getRecruiterApplications,
  updateApplicationStatus,
  getApplicationsByJob,
  deleteApplication
} from '../controllers/applicationController.js';

const router = express.Router();

router.post('/', createApplication);
router.get('/:id', getApplicationById);
router.get('/candidate/:userId', getMyApplications);
router.get('/recruiter/:recruiterId', getRecruiterApplications);
router.get('/job/:jobId', getApplicationsByJob);
router.put('/:id/status', updateApplicationStatus);
router.delete('/:id', deleteApplication);

export default router;
