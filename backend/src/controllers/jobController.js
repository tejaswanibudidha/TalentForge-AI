import Job from '../models/Job.js';
import Company from '../models/Company.js';

export async function getAllJobs(req, res) {
  try {
    const jobs = await Job.find({ status: 'Open' })
      .populate('companyId', 'name logoUrl industry')
      .populate('recruiterId', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getJobById(req, res) {
  try {
    const { id } = req.params;
    const job = await Job.findById(id)
      .populate('companyId')
      .populate('recruiterId', 'name email');
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getJobsByCompany(req, res) {
  try {
    const { companyId } = req.params;
    const jobs = await Job.find({ companyId, status: 'Open' })
      .populate('companyId', 'name logoUrl')
      .populate('recruiterId', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getJobsByRecruiter(req, res) {
  try {
    const { recruiterId } = req.params;
    const jobs = await Job.find({ recruiterId })
      .populate('companyId', 'name logoUrl')
      .populate('recruiterId', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createJob(req, res) {
  try {
    const job = new Job(req.body);
    await job.save();
    const populatedJob = await Job.findById(job._id)
      .populate('companyId')
      .populate('recruiterId');
    res.status(201).json(populatedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateJob(req, res) {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndUpdate(id, req.body, { new: true })
      .populate('companyId')
      .populate('recruiterId');
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteJob(req, res) {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete(id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
