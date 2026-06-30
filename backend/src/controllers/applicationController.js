import Application from '../models/Application.js';
import Job from '../models/Job.js';
import User from '../models/User.js';

export async function createApplication(req, res) {
  try {
    const { jobId, candidateId, personalDetails, education, skills, additionalInfo } = req.body;
    
    // Get job details to extract company and recruiter
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if candidate already applied
    const existingApp = await Application.findOne({ jobId, candidateId });
    if (existingApp) {
      return res.status(400).json({ error: 'You have already applied for this job' });
    }

    // Create application with recruiter mapping
    const applicationId = `app-${Date.now()}`;
    const application = new Application({
      applicationId,
      jobId,
      companyId: job.companyId,
      recruiterId: job.recruiterId, // IMPORTANT: Automatically map to recruiter who created the job
      candidateId,
      personalDetails,
      education,
      skills,
      additionalInfo,
      aiScore: Math.floor(Math.random() * 40) + 60,
      atsScore: Math.floor(Math.random() * 40) + 60,
      skillMatch: Math.floor(Math.random() * 40) + 60
    });

    await application.save();
    
    const populatedApp = await Application.findById(application._id)
      .populate('jobId')
      .populate('companyId')
      .populate('recruiterId', 'name email')
      .populate('candidateId', 'name email');
    
    res.status(201).json(populatedApp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getApplicationById(req, res) {
  try {
    const { id } = req.params;
    const application = await Application.findById(id)
      .populate('jobId')
      .populate('companyId')
      .populate('recruiterId', 'name email')
      .populate('candidateId', 'name email');
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getMyApplications(req, res) {
  try {
    const { userId } = req.params;
    const applications = await Application.find({ candidateId: userId })
      .populate('jobId')
      .populate('companyId', 'name logoUrl')
      .populate('recruiterId', 'name email')
      .sort({ appliedDate: -1 });
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getRecruiterApplications(req, res) {
  try {
    const { recruiterId } = req.params;
    
    // Only recruiters can view their own applications
    if (req.user && req.user.id !== recruiterId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const applications = await Application.find({ recruiterId })
      .populate('jobId')
      .populate('companyId', 'name logoUrl')
      .populate('candidateId', 'name email skills')
      .sort({ appliedDate: -1 });
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateApplicationStatus(req, res) {
  try {
    const { id } = req.params;
    const { applicationStatus } = req.body;

    const application = await Application.findByIdAndUpdate(
      id,
      { applicationStatus, updatedAt: Date.now() },
      { new: true }
    )
      .populate('jobId')
      .populate('companyId')
      .populate('recruiterId', 'name email')
      .populate('candidateId', 'name email');

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getApplicationsByJob(req, res) {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ jobId })
      .populate('candidateId', 'name email skills')
      .populate('recruiterId', 'name email')
      .sort({ appliedDate: -1 });
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteApplication(req, res) {
  try {
    const { id } = req.params;
    const application = await Application.findByIdAndDelete(id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json({ message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
