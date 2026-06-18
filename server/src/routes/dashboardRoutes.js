import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';
import {
  getRecruiterDashboard,
  getJobseekerDashboard,
  getRecruiterDashboardMetrics,
  getDashboardSummary,
} from '../controllers/dashboardController.js';

const router = Router();

router.get('/recruiter', authenticate, authorize(['recruiter']), getRecruiterDashboard);
router.get('/jobseeker', authenticate, authorize(['jobseeker']), getJobseekerDashboard);
router.get('/summary', getDashboardSummary);
router.get('/recruiter/metrics', authenticate, authorize(['recruiter']), getRecruiterDashboardMetrics);

export default router;
