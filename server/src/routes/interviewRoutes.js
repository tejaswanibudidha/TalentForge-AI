import { Router } from 'express';
import { authenticate, recruiterOnly } from '../middlewares/authMiddleware.js';
import { scheduleInterview, getInterviewHistory } from '../controllers/interviewController.js';

const router = Router();

router.post('/', authenticate, recruiterOnly, scheduleInterview);
router.get('/history', authenticate, recruiterOnly, getInterviewHistory);

export default router;
