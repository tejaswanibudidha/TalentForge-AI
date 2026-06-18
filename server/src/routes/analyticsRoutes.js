import { Router } from 'express';
import { authenticate, recruiterOnly } from '../middlewares/authMiddleware.js';
import { getRecruiterAnalytics } from '../controllers/analyticsController.js';

const router = Router();

router.get('/recruiter', authenticate, recruiterOnly, getRecruiterAnalytics);

export default router;
