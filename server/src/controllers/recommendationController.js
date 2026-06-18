import Job from '../models/Job.js';
import UserProfile from '../models/UserProfile.js';
import Resume from '../models/Resume.js';

function normalizeSkills(skills) {
  if (!Array.isArray(skills)) return [];
  return Array.from(
    new Set(
      skills
        .filter((skill) => typeof skill === 'string' && skill.trim().length > 0)
        .map((skill) => skill.toLowerCase().trim())
    )
  );
}

export async function getJobRecommendations(req, res, next) {
  try {
    const userId = req.user.id;

    const [profile, resume] = await Promise.all([
      UserProfile.findOne({ userId }).lean(),
      Resume.findOne({ candidate: userId }).lean(),
    ]);

    const profileSkills = normalizeSkills(profile?.skills);
    const resumeSkills = normalizeSkills(resume?.skills);
    const combinedSkills = Array.from(new Set([...profileSkills, ...resumeSkills]));

    if (!combinedSkills.length) {
      return res.json({
        success: true,
        message: 'No skills found for recommendations. Please update your profile or resume skills.',
        data: { recommendations: [] },
      });
    }

    const recommendations = await Job.aggregate([
      {
        $match: {
          status: 'active',
          skills: { $exists: true, $ne: [] },
        },
      },
      {
        $addFields: {
          normalizedJobSkills: {
            $map: {
              input: '$skills',
              as: 'skill',
              in: { $toLower: { $trim: { input: '$$skill' } } },
            },
          },
        },
      },
      {
        $addFields: {
          skillMatches: {
            $size: {
              $setIntersection: ['$normalizedJobSkills', combinedSkills],
            },
          },
          totalJobSkills: { $size: '$normalizedJobSkills' },
        },
      },
      {
        $addFields: {
          matchPercentage: {
            $cond: [
              { $gt: ['$totalJobSkills', 0] },
              {
                $round: [
                  {
                    $multiply: [
                      { $divide: ['$skillMatches', '$totalJobSkills'] },
                      100,
                    ],
                  },
                  2,
                ],
              },
              0,
            ],
          },
        },
      },
      {
        $lookup: {
          from: 'companies',
          localField: 'companyId',
          foreignField: '_id',
          as: 'company',
        },
      },
      { $unwind: { path: '$company', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 0,
          title: 1,
          company: '$company.companyName',
          matchPercentage: 1,
        },
      },
      { $sort: { matchPercentage: -1 } },
      { $limit: 20 },
    ]);

    res.json({
      success: true,
      message: 'Job recommendations retrieved successfully.',
      data: { recommendations },
    });
  } catch (error) {
    next(error);
  }
}
