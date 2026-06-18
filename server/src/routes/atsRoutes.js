import { Router } from 'express';
import { analyzeResume } from '../controllers/atsController.js';

const router = Router();

router.post('/analyze', analyzeResume);

export default router;
