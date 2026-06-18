import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { uploadBuffer } from '../services/cloudinaryService.js';

function formatError(message) {
  return { success: false, message };
}

function formatSuccess(message, data = {}) {
  return { success: true, message, data };
}

export async function createApplication(req, res, next) {
  try {
    const { jobId, resumeUrl, coverLetter } = req.body;
    console.log('Incoming POST /api/applications', { body: req.body, hasFile: Boolean(req.file), user: req.user && { id: req.user.id, email: req.user.email } });

    // if a file was uploaded via multipart/form-data, upload to Cloudinary and set resumeUrl
    let resumeLink = resumeUrl;
    if (req.file && req.file.buffer) {
      try {
        const uploaded = await uploadBuffer(req.file.buffer, req.file.originalname, req.file.mimetype);
        resumeLink = uploaded.secure_url || uploaded.url;
        console.log('Uploaded resume to Cloudinary:', resumeLink);
      } catch (uploadErr) {
        console.error('Cloudinary upload failed:', uploadErr);
        return res.status(500).json({ success: false, message: 'Failed to upload resume.' });
      }
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json(formatError('Job not found.'));
    }

    const existing = await Application.findOne({ jobId, candidateId: req.user.id });
    if (existing) {
      return res.status(409).json(formatError('You have already applied to this job.'));
    }

    const application = await Application.create({
      jobId,
      candidateId: req.user.id,
      recruiterId: job.recruiterId || null,
      resumeUrl: String(resumeLink || '').trim(),
      coverLetter: coverLetter ? String(coverLetter).trim() : undefined,
      status: 'Applied',
    });
    console.log('Created application id:', application._id);
    res.status(201).json(formatSuccess('Application submitted successfully.', { application }));
  } catch (error) {
    console.error('Error in createApplication:', error);
    next(error);
  }
}

export async function getApplications(req, res, next) {
  try {
    const { jobId, candidateId, recruiterId, status, page = 1, limit = 20, sortBy, sortOrder } = req.query;

    const query = {};
    if (jobId) query.jobId = jobId;
    if (candidateId) query.candidateId = candidateId;
    if (recruiterId) query.recruiterId = recruiterId;
    if (status) query.status = String(status).trim();

    const sortKey = sortBy ? String(sortBy).trim() : 'appliedAt';
    const order = sortOrder === 'asc' ? 1 : -1;

    const pageNumber = Math.max(Number(page), 1);
    const pageSize = Math.max(Number(limit), 1);
    const skip = (pageNumber - 1) * pageSize;

    const [total, applications] = await Promise.all([
      Application.countDocuments(query),
      Application.find(query)
        .sort({ [sortKey]: order })
        .skip(skip)
        .limit(pageSize)
        .populate('jobId', 'title companyId location jobType')
        .populate('candidateId', 'name email role'),
    ]);

    res.json(
      formatSuccess('Applications retrieved successfully.', {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
        applications,
      })
    );
  } catch (error) {
    next(error);
  }
}

export async function getApplicationById(req, res, next) {
  try {
    const application = await Application.findById(req.params.id)
      .populate('jobId', 'title companyId location jobType')
      .populate('candidateId', 'name email role');

    if (!application) {
      return res.status(404).json(formatError('Application not found.'));
    }

    res.json(formatSuccess('Application retrieved successfully.', { application }));
  } catch (error) {
    next(error);
  }
}

export async function updateApplication(req, res, next) {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json(formatError('Application not found.'));
    }

    const update = {
      ...(req.body.resumeUrl !== undefined && { resumeUrl: String(req.body.resumeUrl).trim() }),
      ...(req.body.coverLetter !== undefined && { coverLetter: String(req.body.coverLetter).trim() }),
      ...(req.body.status !== undefined && { status: String(req.body.status).trim() }),
    };

    const updatedApplication = await Application.findByIdAndUpdate(req.params.id, { $set: update }, { new: true })
      .populate('jobId', 'title companyId location jobType')
      .populate('candidateId', 'name email role');

    res.json(formatSuccess('Application updated successfully.', { application: updatedApplication }));
  } catch (error) {
    next(error);
  }
}
