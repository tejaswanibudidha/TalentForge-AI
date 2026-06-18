import mongoose from 'mongoose';
import Application from '../models/Application.js';

function normalizeArrayField(array) {
  if (!Array.isArray(array)) return [];
  return Array.from(
    new Set(
      array
        .filter((item) => typeof item === 'string' && item.trim().length > 0)
        .map((item) => item.toLowerCase().trim())
    )
  );
}

function buildFinalRankedResults(rows) {
  return rows
    .sort((a, b) => b.matchScore - a.matchScore || a.candidateName.localeCompare(b.candidateName))
    .map((item, index) => ({
      candidateName: item.candidateName || 'Unknown Candidate',
      matchScore: item.matchScore,
      rank: index + 1,
    }));
}

export async function getCandidateRanking(req, res, next) {
  try {
    const recruiterId = new mongoose.Types.ObjectId(req.user.id);

    const results = await Application.aggregate([
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
        $lookup: {
          from: 'resumes',
          localField: 'candidateId',
          foreignField: 'candidate',
          as: 'resume',
        },
      },
      { $unwind: { path: '$resume', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'userprofiles',
          localField: 'candidateId',
          foreignField: 'userId',
          as: 'profile',
        },
      },
      { $unwind: { path: '$profile', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'users',
          localField: 'candidateId',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          normalizedJobSkills: {
            $map: {
              input: { $ifNull: ['$job.skills', []] },
              as: 'skill',
              in: { $toLower: { $trim: { input: '$$skill' } } },
            },
          },
          normalizedResumeSkills: {
            $map: {
              input: { $ifNull: ['$resume.skills', []] },
              as: 'skill',
              in: { $toLower: { $trim: { input: '$$skill' } } },
            },
          },
          normalizedProfileSkills: {
            $map: {
              input: { $ifNull: ['$profile.skills', []] },
              as: 'skill',
              in: { $toLower: { $trim: { input: '$$skill' } } },
            },
          },
          experienceCount: { $size: { $ifNull: ['$profile.experience', []] } },
          educationCount: { $size: { $ifNull: ['$profile.education', []] } },
          atsScore: { $ifNull: ['$resume.atsScore', 0] },
        },
      },
      {
        $addFields: {
          combinedSkills: {
            $setUnion: ['$normalizedResumeSkills', '$normalizedProfileSkills'],
          },
        },
      },
      {
        $addFields: {
          skillMatchCount: {
            $size: {
              $setIntersection: ['$normalizedJobSkills', '$combinedSkills'],
            },
          },
          totalJobSkills: { $size: '$normalizedJobSkills' },
        },
      },
      {
        $addFields: {
          skillMatchPercentage: {
            $cond: [
              { $gt: ['$totalJobSkills', 0] },
              {
                $round: [
                  {
                    $multiply: [
                      { $divide: ['$skillMatchCount', '$totalJobSkills'] },
                      100,
                    ],
                  },
                  2,
                ],
              },
              0,
            ],
          },
          experiencePoints: {
            $min: [{ $multiply: ['$experienceCount', 10] }, 20],
          },
          educationPoints: {
            $min: [{ $multiply: ['$educationCount', 10] }, 10],
          },
        },
      },
      {
        $addFields: {
          weightedScore: {
            $round: [
              {
                $add: [
                  { $multiply: [{ $divide: ['$atsScore', 100] }, 40] },
                  { $multiply: ['$skillMatchPercentage', 30] },
                  { $multiply: ['$experiencePoints', 20] },
                  { $multiply: ['$educationPoints', 10] },
                ],
              },
              2,
            ],
          },
        },
      },
      {
        $group: {
          _id: '$candidateId',
          candidateName: { $first: { $ifNull: ['$profile.fullName', '$user.fullName'] } },
          matchScore: { $max: '$weightedScore' },
        },
      },
      {
        $project: {
          _id: 0,
          candidateName: 1,
          matchScore: 1,
        },
      },
    ]);

    const rankedCandidates = buildFinalRankedResults(results);

    res.json({
      success: true,
      message: 'Candidate ranking retrieved successfully.',
      data: { candidates: rankedCandidates },
    });
  } catch (error) {
    next(error);
  }
}
