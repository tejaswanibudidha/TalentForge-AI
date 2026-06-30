import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getJobMatches,
  getJobList,
  resumeAnalysis,
  atsScore,
  skillGap,
  improvementTips,
  interviewQuestions,
  learningResources
} from '../controllers/aiController.js';

const router = express.Router();

router.get('/jobs', protect, getJobList);
router.post('/match', protect, getJobMatches);
router.post('/resume-analysis', protect, resumeAnalysis);
router.post('/ats-score', protect, atsScore);
router.post('/skill-gap', protect, skillGap);
router.post('/improvement', protect, improvementTips);
router.post('/interview-questions', protect, interviewQuestions);
router.post('/learning-resources', protect, learningResources);

export default router;
