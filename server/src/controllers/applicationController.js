import Application from '../models/Application.js';
import Job from '../models/Job.js';

function formatError(message) {
  return { success: false, message };
}

function formatSuccess(message, data = {}) {
  return { success: true, message, data };
}

export async function createApplication(req, res, next) {
  try {
    const { jobId, resumeUrl, coverLetter } = req.body;

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
      resumeUrl: String(resumeUrl).trim(),
      coverLetter: coverLetter ? String(coverLetter).trim() : undefined,
      status: 'Applied',
    });

    res.status(201).json(formatSuccess('Application submitted successfully.', { application }));
  } catch (error) {
    next(error);
  }
}

export async function getApplications(req, res, next) {
  try {
    const { jobId, candidateId, status, page = 1, limit = 20, sortBy, sortOrder } = req.query;

    const query = {};
    if (jobId) query.jobId = jobId;
    if (candidateId) query.candidateId = candidateId;
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
