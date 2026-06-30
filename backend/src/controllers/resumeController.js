import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import Resume from '../models/Resume.js';
import { extractResumeData } from '../utils/resumeParser.js';

function normalizeFileType(fileName) {
  const lower = fileName.toLowerCase();
  if (lower.endsWith('.pdf')) return 'application/pdf';
  if (lower.endsWith('.docx')) return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  return 'application/octet-stream';
}

export async function uploadResume(req, res, next) {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ success: false, message: 'Resume file is required' });

    let text = '';
    const fileType = normalizeFileType(file.originalname);

    if (fileType === 'application/pdf') {
      const parsed = await pdfParse(file.buffer);
      text = parsed.text;
    } else {
      const doc = await mammoth.extractRawText({ buffer: file.buffer });
      text = doc.value;
    }

    const data = extractResumeData(text);
    const resume = await Resume.create({
      user: req.user._id,
      fileName: file.originalname,
      fileType,
      text,
      data
    });

    res.status(201).json({ success: true, data: resume });
  } catch (error) {
    next(error);
  }
}

export async function getResumes(req, res, next) {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: resumes });
  } catch (error) {
    next(error);
  }
}
