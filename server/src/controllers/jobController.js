import Job from '../models/Job.js';

function formatError(message) {
  return { success: false, message };
}

function formatSuccess(message, data = {}) {
  return { success: true, message, data };
}

export async function createJob(req, res, next) {
  try {
    const {
      title,
      companyId,
      location,
      salary,
      experience,
      skills,
      description,
      jobType,
      openings,
      status,
    } = req.body;

    const job = await Job.create({
      title: String(title).trim(),
      companyId: companyId || undefined,
      recruiterId: req.user.id,
      location: String(location).trim(),
      salary: salary !== undefined ? Number(salary) : undefined,
      experience: experience ? String(experience).trim() : undefined,
      skills: Array.isArray(skills) ? skills.map((skill) => String(skill).trim()) : [],
      description: String(description).trim(),
      jobType: String(jobType || 'Full-time').trim(),
      openings: openings !== undefined ? Number(openings) : 1,
      status: status ? String(status).trim() : 'active',
    });

    res.status(201).json(formatSuccess('Job posted successfully.', { job }));
  } catch (error) {
    next(error);
  }
}

export async function getJobs(req, res, next) {
  try {
    const {
      search,
      companyId,
      recruiterId,
      location,
      jobType,
      status,
      minSalary,
      maxSalary,
      skills,
      sortBy,
      sortOrder,
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    if (search) {
      const regex = new RegExp(String(search).trim(), 'i');
      query.$or = [
        { title: regex },
        { description: regex },
        { location: regex },
        { experience: regex },
        { jobType: regex },
        { skills: regex },
      ];
    }

    if (companyId) query.companyId = companyId;
    if (recruiterId) query.recruiterId = recruiterId;
    if (location) query.location = new RegExp(String(location).trim(), 'i');
    if (jobType) query.jobType = String(jobType).trim();
    if (status) query.status = String(status).trim();

    if (minSalary !== undefined || maxSalary !== undefined) {
      query.salary = {};
      if (minSalary !== undefined) query.salary.$gte = Number(minSalary);
      if (maxSalary !== undefined) query.salary.$lte = Number(maxSalary);
    }

    if (skills) {
      const extractedSkills = String(skills)
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean);
      if (extractedSkills.length) {
        query.skills = { $all: extractedSkills };
      }
    }

    const sortKey = sortBy ? String(sortBy).trim() : 'createdAt';
    const order = sortOrder === 'asc' ? 1 : -1;
    const sort = { [sortKey]: order };

    const pageNumber = Math.max(Number(page), 1);
    const pageSize = Math.max(Number(limit), 1);
    const skip = (pageNumber - 1) * pageSize;

    const [total, jobs] = await Promise.all([
      Job.countDocuments(query),
      Job.find(query)
        .sort(sort)
        .skip(skip)
        .limit(pageSize)
        .populate('companyId', 'companyName logo website')
        .populate('recruiterId', 'name email role'),
    ]);

    res.json(
      formatSuccess('Jobs retrieved successfully.', {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
        jobs,
      })
    );
  } catch (error) {
    next(error);
  }
}

export async function getJobById(req, res, next) {
  try {
    const job = await Job.findById(req.params.id)
      .populate('companyId', 'companyName logo website')
      .populate('recruiterId', 'name email role');

    if (!job) {
      return res.status(404).json(formatError('Job not found.'));
    }

    res.json(formatSuccess('Job retrieved successfully.', { job }));
  } catch (error) {
    next(error);
  }
}

export async function updateJob(req, res, next) {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json(formatError('Job not found.'));
    }

    if (job.recruiterId.toString() !== req.user.id) {
      return res.status(403).json(formatError('You are not authorized to update this job.'));
    }

    const update = {
      ...(req.body.title !== undefined && { title: String(req.body.title).trim() }),
      ...(req.body.companyId !== undefined && { companyId: req.body.companyId }),
      ...(req.body.location !== undefined && { location: String(req.body.location).trim() }),
      ...(req.body.salary !== undefined && { salary: Number(req.body.salary) }),
      ...(req.body.experience !== undefined && { experience: String(req.body.experience).trim() }),
      ...(req.body.skills !== undefined && {
        skills: Array.isArray(req.body.skills)
          ? req.body.skills.map((skill) => String(skill).trim())
          : [],
      }),
      ...(req.body.description !== undefined && { description: String(req.body.description).trim() }),
      ...(req.body.jobType !== undefined && { jobType: String(req.body.jobType).trim() }),
      ...(req.body.openings !== undefined && { openings: Number(req.body.openings) }),
      ...(req.body.status !== undefined && { status: String(req.body.status).trim() }),
    };

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, { $set: update }, { new: true })
      .populate('companyId', 'companyName logo website')
      .populate('recruiterId', 'name email role');

    res.json(formatSuccess('Job updated successfully.', { job: updatedJob }));
  } catch (error) {
    next(error);
  }
}

export async function deleteJob(req, res, next) {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json(formatError('Job not found.'));
    }

    if (job.recruiterId.toString() !== req.user.id) {
      return res.status(403).json(formatError('You are not authorized to delete this job.'));
    }

    await job.deleteOne();
    res.json(formatSuccess('Job deleted successfully.'));
  } catch (error) {
    next(error);
  }
}
