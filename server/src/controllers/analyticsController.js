import mongoose from 'mongoose';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import Interview from '../models/Interview.js';

export async function getRecruiterAnalytics(req, res, next) {
  try {
    const recruiterId = new mongoose.Types.ObjectId(req.user.id);

    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 5);
    sixMonthsAgo.setDate(1);

    const facets = await Application.aggregate([
      // Join job to filter by recruiter
      {
        $lookup: {
          from: 'jobs',
          localField: 'jobId',
          foreignField: '_id',
          as: 'job',
        },
      },
      { $unwind: '$job' },
      { $match: { 'job.recruiterId': recruiterId } },
      {
        $facet: {
          hiringFunnel: [
            {
              $group: {
                _id: '$status',
                count: { $sum: 1 },
              },
            },
          ],
          jobPerformance: [
            {
              $group: {
                _id: '$jobId',
                totalApplications: { $sum: 1 },
                interviewsScheduled: {
                  $sum: {
                    $cond: [{ $eq: ['$status', 'Interview Scheduled'] }, 1, 0],
                  },
                },
                hires: {
                  $sum: {
                    $cond: [{ $eq: ['$status', 'Selected'] }, 1, 0],
                  },
                },
              },
            },
            {
              $lookup: {
                from: 'jobs',
                localField: '_id',
                foreignField: '_id',
                as: 'job',
              },
            },
            { $unwind: { path: '$job', preserveNullAndEmptyArrays: true } },
            {
              $project: {
                jobId: '$_id',
                title: '$job.title',
                totalApplications: 1,
                interviewsScheduled: 1,
                hires: 1,
              },
            },
            { $sort: { totalApplications: -1 } },
            { $limit: 20 },
          ],
          monthlyGrowth: [
            { $match: { appliedAt: { $gte: sixMonthsAgo } } },
            {
              $group: {
                _id: { $dateToString: { format: '%Y-%m', date: '$appliedAt' } },
                applications: { $sum: 1 },
              },
            },
            { $sort: { _id: 1 } },
          ],
          timeToHire: [
            { $match: { status: 'Selected', appliedAt: { $exists: true }, updatedAt: { $exists: true } } },
            {
              $project: {
                diffDays: {
                  $divide: [{ $subtract: ['$updatedAt', '$appliedAt'] }, 1000 * 60 * 60 * 24],
                },
              },
            },
            {
              $group: {
                _id: null,
                avgDays: { $avg: '$diffDays' },
                medianDays: { $avg: '$diffDays' },
              },
            },
          ],
          conversion: [
            {
              $group: {
                _id: null,
                totalApplications: { $sum: 1 },
                interviews: {
                  $sum: { $cond: [{ $eq: ['$status', 'Interview Scheduled'] }, 1, 0] },
                },
                hires: { $sum: { $cond: [{ $eq: ['$status', 'Selected'] }, 1, 0] } },
              },
            },
          ],
        },
      },
    ]);

    const [data = {}] = facets;

    // Format hiring funnel as object
    const hiringFunnel = (data.hiringFunnel || []).reduce((acc, cur) => {
      acc[cur._id || 'Unknown'] = cur.count;
      return acc;
    }, {});

    // Build conversion metrics
    const conv = (data.conversion && data.conversion[0]) || { totalApplications: 0, interviews: 0, hires: 0 };
    const applicationConversion = {
      totalApplications: conv.totalApplications || 0,
      interviews: conv.interviews || 0,
      hires: conv.hires || 0,
      interviewRate: conv.totalApplications ? Number(((conv.interviews / conv.totalApplications) * 100).toFixed(2)) : 0,
      hireRate: conv.totalApplications ? Number(((conv.hires / conv.totalApplications) * 100).toFixed(2)) : 0,
    };

    const jobPerformance = data.jobPerformance || [];

    const monthlyGrowth = (data.monthlyGrowth || []).map((m) => ({ month: m._id, applications: m.applications }));

    const tthObj = (data.timeToHire && data.timeToHire[0]) || { avgDays: 0 };

    res.json({
      success: true,
      data: {
        hiringFunnel,
        applicationConversion,
        jobPerformance,
        monthlyGrowth,
        timeToHire: { avgDays: Number((tthObj.avgDays || 0).toFixed(2)) },
      },
    });
  } catch (err) {
    next(err);
  }
}
