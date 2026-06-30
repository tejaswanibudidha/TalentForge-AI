import express from 'express';
import {
  getAllJobs,
  getJobById,
  getJobsByCompany,
  getJobsByRecruiter,
  createJob,
  updateJob,
  deleteJob
} from '../controllers/jobController.js';

const router = express.Router();

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.get('/company/:companyId', getJobsByCompany);
router.get('/recruiter/:recruiterId', getJobsByRecruiter);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;
