import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { getJobRecommendations } from '../controllers/recommendationController.js';

const router = Router();

router.get('/jobs', authenticate, getJobRecommendations);

export default router;
