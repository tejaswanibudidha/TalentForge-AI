import axios from 'axios';
import Job from '../models/Job.js';
import Resume from '../models/Resume.js';

const aiClient = axios.create({ baseURL: process.env.AI_SERVICE_URL || 'http://localhost:8000' });

export async function getJobList(req, res, next) {
  try {
    const jobs = await Job.find().sort({ postedAt: -1 }).limit(30);
    res.json({ success: true, data: jobs });
  } catch (error) {
    next(error);
  }
}

export async function getJobMatches(req, res, next) {
  try {
    const { resumeId, jobId } = req.body;
    const resume = await Resume.findById(resumeId);
    const job = await Job.findById(jobId);
    if (!resume || !job) return res.status(404).json({ success: false, message: 'Resume or job not found' });
    const response = await aiClient.post('/match', { resume: resume.data, job });
    res.json({ success: true, data: response.data });
  } catch (error) {
    next(error);
  }
}

export async function resumeAnalysis(req, res, next) {
  try {
    const { resumeId } = req.body;
    const resume = await Resume.findById(resumeId);
    if (!resume) return res.status(404).json({ success: false, message: 'Resume not found' });
    const response = await aiClient.post('/resume-analysis', { resume: resume.data });
    res.json({ success: true, data: response.data });
  } catch (error) {
    next(error);
  }
}

export async function atsScore(req, res, next) {
  try {
    const { resumeId, jobDescription } = req.body;
    const resume = await Resume.findById(resumeId);
    if (!resume) return res.status(404).json({ success: false, message: 'Resume not found' });
    const response = await aiClient.post('/ats-score', { resume: resume.data, jobDescription });
    res.json({ success: true, data: response.data });
  } catch (error) {
    next(error);
  }
}

export async function skillGap(req, res, next) {
  try {
    const { resumeId, jobId } = req.body;
    const resume = await Resume.findById(resumeId);
    const job = await Job.findById(jobId);
    if (!resume || !job) return res.status(404).json({ success: false, message: 'Resume or job not found' });
    const response = await aiClient.post('/skill-gap', { resume: resume.data, job });
    res.json({ success: true, data: response.data });
  } catch (error) {
    next(error);
  }
}

export async function improvementTips(req, res, next) {
  try {
    const { resumeId, jobDescription } = req.body;
    const resume = await Resume.findById(resumeId);
    if (!resume) return res.status(404).json({ success: false, message: 'Resume not found' });
    const response = await aiClient.post('/improvement', { resume: resume.data, jobDescription });
    res.json({ success: true, data: response.data });
  } catch (error) {
    next(error);
  }
}

export async function interviewQuestions(req, res, next) {
  try {
    const { resumeId, jobId, categories } = req.body;
    const resume = await Resume.findById(resumeId);
    const job = await Job.findById(jobId);
    if (!resume || !job) return res.status(404).json({ success: false, message: 'Resume or job not found' });
    const response = await aiClient.post('/interview-questions', { resume: resume.data, job, categories });
    res.json({ success: true, data: response.data });
  } catch (error) {
    next(error);
  }
}

export async function learningResources(req, res, next) {
  try {
    const { missingSkills } = req.body;
    const response = await aiClient.post('/learning-resources', { missingSkills });
    res.json({ success: true, data: response.data });
  } catch (error) {
    next(error);
  }
}
