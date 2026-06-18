import mongoose from 'mongoose';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import User from '../models/User.js';
import UserProfile from '../models/UserProfile.js';
import ATSAnalysis from '../models/ATSAnalysis.js';

function formatSuccess(message, data = {}) {
  return { success: true, message, data };
}

function formatError(message) {
  return { success: false, message };
}

function calculateProfileCompletion(user, profile) {
  if (user?.profileCompleted) return 100;
  if (!profile) return 0;

  const fields = [
    profile.fullName,
    profile.phone,
    profile.location,
    profile.bio,
    profile.resumeUrl,
    profile.skills?.length,
    profile.education?.length,
    profile.experience?.length,
  ];

  const filledCount = fields.filter((value) => value !== undefined && value !== null && value !== '').length;
  return Math.round((filledCount / fields.length) * 100);
}

export async function getRecruiterDashboard(req, res, next) {
  try {
    const recruiterId = new mongoose.Types.ObjectId(req.user.id);

    const stats = await Job.aggregate([
      { $match: { recruiterId } },
      {
        $lookup: {
          from: 'applications',
          localField: '_id',
          foreignField: 'jobId',
          as: 'applications',
        },
      },
      {
        $project: {
          totalApplicants: { $size: '$applications' },
          shortlisted: {
            $size: {
              $filter: {
                input: '$applications',
                as: 'application',
                cond: { $eq: ['$$application.status', 'Shortlisted'] },
              },
            },
          },
          interviews: {
            $size: {
              $filter: {
                input: '$applications',
                as: 'application',
                cond: { $eq: ['$$application.status', 'Interview Scheduled'] },
              },
            },
          },
          selected: {
            $size: {
              $filter: {
                input: '$applications',
                as: 'application',
                cond: { $eq: ['$$application.status', 'Selected'] },
              },
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalJobs: { $sum: 1 },
          totalApplicants: { $sum: '$totalApplicants' },
          shortlisted: { $sum: '$shortlisted' },
          interviews: { $sum: '$interviews' },
          selected: { $sum: '$selected' },
        },
      },
    ]);

    const result = stats[0] || {
      totalJobs: 0,
      totalApplicants: 0,
      shortlisted: 0,
      interviews: 0,
      selected: 0,
    };

    res.json(formatSuccess('Recruiter dashboard data retrieved successfully.', result));
  } catch (error) {
    next(error);
  }
}

export async function getJobseekerDashboard(req, res, next) {
  try {
    const candidateId = new mongoose.Types.ObjectId(req.user.id);

    const applicationStats = await Application.aggregate([
      { $match: { candidateId } },
      {
        $group: {
          _id: null,
          applicationsSubmitted: { $sum: 1 },
          shortlistedJobs: {
            $sum: {
              $cond: [{ $eq: ['$status', 'Shortlisted'] }, 1, 0],
            },
          },
          interviewsScheduled: {
            $sum: {
              $cond: [{ $eq: ['$status', 'Interview Scheduled'] }, 1, 0],
            },
          },
          offersReceived: {
            $sum: {
              $cond: [{ $eq: ['$status', 'Selected'] }, 1, 0],
            },
          },
        },
      },
    ]);

    const [{
      applicationsSubmitted = 0,
      shortlistedJobs = 0,
      interviewsScheduled = 0,
      offersReceived = 0,
    } = {}] = applicationStats;

    const user = await User.findById(req.user.id).select('profileCompleted');
    const profile = await UserProfile.findOne({ userId: req.user.id });
    const profileCompletion = calculateProfileCompletion(user, profile);

    const recommendedJobsPipeline = [
      { $match: { status: 'active' } },
    ];

    if (profile?.skills?.length) {
      recommendedJobsPipeline.push({
        $addFields: {
          skillMatches: {
            $size: {
              $setIntersection: ['$skills', profile.skills],
            },
          },
        },
      });
      recommendedJobsPipeline.push({ $sort: { skillMatches: -1, createdAt: -1 } });
    } else {
      recommendedJobsPipeline.push({ $sort: { createdAt: -1 } });
    }

    recommendedJobsPipeline.push(
      {
        $lookup: {
          from: 'companies',
          localField: 'companyId',
          foreignField: '_id',
          as: 'company',
        },
      },
      { $unwind: { path: '$company', preserveNullAndEmptyArrays: true } },
      { $limit: 5 },
      {
        $project: {
          title: 1,
          location: 1,
          jobType: 1,
          companyId: 1,
          companyName: '$company.companyName',
          createdAt: 1,
          skillMatches: 1,
        },
      }
    );

    const recommendedJobs = await Job.aggregate(recommendedJobsPipeline);

    res.json(
      formatSuccess('Jobseeker dashboard data retrieved successfully.', {
        applicationsSubmitted,
        shortlistedJobs,
        interviewsScheduled,
        offersReceived,
        profileCompletion,
        recommendedJobs,
      })
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Get Recruiter Dashboard Metrics
 * Returns: ATS Score, Match Score, Total Candidates, Pipeline Count, Top Candidates
 */
export async function getRecruiterDashboardMetrics(req, res, next) {
  try {
    const recruiterId = new mongoose.Types.ObjectId(req.user.id);

    // 1. Get ATS Score (Latest ATS analysis score for logged-in recruiter's candidates)
    const latestATSScore = await ATSAnalysis.findOne()
      .sort({ createdAt: -1 })
      .select('atsScore')
      .exec();

    const atsScore = latestATSScore?.atsScore || 0;

    // 2. Get Match Score (Calculate using matched skills / total skills)
    const matchScoreData = await Application.aggregate([
      {
        $lookup: {
          from: 'atsanalyses',
          localField: 'candidateId',
          foreignField: 'candidateId',
          as: 'atsData',
        },
      },
      { $unwind: { path: '$atsData', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: null,
          avgMatchScore: { $avg: '$atsData.matchScore' },
        },
      },
    ]);

    const matchScore = Math.round(matchScoreData[0]?.avgMatchScore || 0);

    // 3. Get Total Candidates (Count users where role="jobseeker")
    const totalCandidates = await User.countDocuments({ role: 'jobseeker' });

    // 4. Get Pipeline Count (Applications with status: Applied, Under Review, Shortlisted)
    const pipelineCount = await Application.countDocuments({
      status: { $in: ['Applied', 'Under Review', 'Shortlisted'] },
    });

    // 5. Get Top 5 Candidates (Ranked by ATS Score, Skill Match, Experience)
    const topCandidates = await Application.aggregate([
      {
        $lookup: {
          from: 'atsanalyses',
          localField: 'candidateId',
          foreignField: 'candidateId',
          as: 'atsData',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'candidateId',
          foreignField: '_id',
          as: 'candidateUser',
        },
      },
      {
        $lookup: {
          from: 'userprofiles',
          localField: 'candidateId',
          foreignField: 'userId',
          as: 'candidateProfile',
        },
      },
      { $unwind: { path: '$atsData', preserveNullAndEmptyArrays: true } },
      { $unwind: { path: '$candidateUser', preserveNullAndEmptyArrays: true } },
      { $unwind: { path: '$candidateProfile', preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          sortScore: {
            $add: [
              { $multiply: ['$atsData.atsScore', 0.5] },
              { $multiply: ['$atsData.matchScore', 0.3] },
              { $multiply: [{ $ifNull: ['$atsData.experience', 0] }, 5] },
            ],
          },
        },
      },
      { $sort: { sortScore: -1, 'atsData.createdAt': -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 1,
          candidateId: 1,
          candidateName: '$candidateUser.fullName',
          candidateEmail: '$candidateUser.email',
          atsScore: { $ifNull: ['$atsData.atsScore', 0] },
          matchScore: { $ifNull: ['$atsData.matchScore', 0] },
          experience: { $ifNull: ['$atsData.experience', 0] },
          skills: { $ifNull: ['$candidateProfile.skills', []] },
          status: 1,
          appliedAt: 1,
          profileImage: { $ifNull: ['$candidateProfile.profileImage', null] },
        },
      },
    ]);

    res.json(
      formatSuccess('Recruiter dashboard metrics retrieved successfully.', {
        atsScore,
        matchScore,
        totalCandidates,
        pipelineCount,
        topCandidates,
      })
    );
  } catch (error) {
    next(error);
  }
}

export async function getDashboardSummary(req, res, next) {
  try {
    const latestATSAnalysis = await ATSAnalysis.findOne()
      .sort({ analyzedAt: -1 })
      .select('atsScore')
      .lean();

    const atsScore = latestATSAnalysis?.atsScore || 0;

    const matchScoreData = await ATSAnalysis.aggregate([
      {
        $group: {
          _id: null,
          avgMatchScore: { $avg: '$matchScore' },
        },
      },
    ]);

    const matchScore = Math.round(matchScoreData[0]?.avgMatchScore || 0);

    const totalCandidates = await User.countDocuments({ role: 'jobseeker' });
    const pipelineCount = await Application.countDocuments({
      status: { $in: ['Applied', 'Under Review', 'Shortlisted'] },
    });

    const topCandidates = await ATSAnalysis.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'candidateId',
          foreignField: '_id',
          as: 'candidateUser',
        },
      },
      { $unwind: { path: '$candidateUser', preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          sortScore: {
            $add: [
              { $multiply: ['$atsScore', 0.6] },
              { $multiply: ['$matchScore', 0.3] },
              { $multiply: [{ $ifNull: ['$experience', 0] }, 4] },
            ],
          },
        },
      },
      { $sort: { sortScore: -1, analyzedAt: -1 } },
      { $limit: 3 },
      {
        $project: {
          _id: 0,
          candidateName: '$candidateUser.fullName',
          atsScore: { $ifNull: ['$atsScore', 0] },
          matchScore: { $ifNull: ['$matchScore', 0] },
        },
      },
    ]);

    res.json(
      formatSuccess('Public dashboard summary retrieved successfully.', {
        atsScore,
        matchScore,
        totalCandidates,
        pipelineCount,
        topCandidates,
      })
    );
  } catch (error) {
    next(error);
  }
}
