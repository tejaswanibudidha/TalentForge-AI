import { Router } from 'express';
import { authenticate, recruiterOnly } from '../middlewares/authMiddleware.js';
import { getCandidateRanking } from '../controllers/recruiterController.js';

const router = Router();

router.get('/candidates/ranking', authenticate, recruiterOnly, getCandidateRanking);

export default router;
