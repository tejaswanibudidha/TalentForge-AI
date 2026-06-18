function cleanText(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[–—]/g, ' ')
    .replace(/[.,/#!$%^&*;:{}=_`~()"?<>\[\]\n\r\t]/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function extractKeywords(text) {
  const stopwords = new Set([
    'and', 'or', 'the', 'for', 'with', 'to', 'of', 'in', 'on', 'a', 'an', 'by', 'at', 'from', 'is', 'are', 'as', 'that', 'this', 'will', 'be', 'have', 'has', 'using', 'using', 'your', 'you', 'can', 'will', 'should', 'job', 'role', 'candidate', 'recruiter', 'experience', 'requirements', 'responsibilities', 'skills', 'including', 'strong', 'excellent', 'team', 'work', 'working', 'ability', 'required', 'preferred'
  ]);

  const words = cleanText(text).split(' ').filter((word) => word.length > 1 && !stopwords.has(word));
  return Array.from(new Set(words));
}

function sortKeywordsByRelevance(keywords, sourceText) {
  const source = cleanText(sourceText);
  return [...keywords].sort((a, b) => {
    const countA = (source.match(new RegExp(`\\b${a}\\b`, 'g')) || []).length;
    const countB = (source.match(new RegExp(`\\b${b}\\b`, 'g')) || []).length;
    return countB - countA;
  });
}

function buildFeedback(score, matchedKeywords, missingKeywords) {
  const strengths = [];
  const suggestions = [];

  if (matchedKeywords.length) {
    strengths.push(`Strong match on keywords: ${matchedKeywords.slice(0, 6).join(', ')}.`);
  } else {
    strengths.push('Resume includes very few job-specific keywords.');
  }

  if (score >= 85) {
    suggestions.push('Your resume is well aligned with the job description. Keep the keyword focus and add specific results where possible.');
  } else if (score >= 60) {
    suggestions.push('You have a solid match, but adding more of the job description keywords could improve your ATS score.');
  } else {
    suggestions.push('Add more role-specific keywords and phrases from the job description to improve your ATS match.');
  }

  if (missingKeywords.length) {
    suggestions.push(`Consider incorporating these missing terms: ${missingKeywords.slice(0, 8).join(', ')}.`);
  }

  suggestions.push('Use strong action verbs, quantify achievements, and keep keyword usage natural.');

  return {
    strengths,
    suggestions,
  };
}

export function analyzeResume(req, res) {
  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({
      success: false,
      message: 'Resume Text and Job Description are required.',
    });
  }

  const resumeKeywords = new Set(extractKeywords(resumeText));
  const descriptionKeywords = extractKeywords(jobDescription);

  const matchedKeywords = descriptionKeywords.filter((keyword) => resumeKeywords.has(keyword));
  const missingKeywords = descriptionKeywords.filter((keyword) => !resumeKeywords.has(keyword));

  const keywordCount = descriptionKeywords.length || 1;
  const score = Math.round((matchedKeywords.length / keywordCount) * 100);

  const orderedMatched = sortKeywordsByRelevance(matchedKeywords, jobDescription);
  const orderedMissing = sortKeywordsByRelevance(missingKeywords, jobDescription);

  const feedback = buildFeedback(score, orderedMatched, orderedMissing);

  res.json({
    success: true,
    message: 'ATS analysis complete.',
    data: {
      score,
      matchedKeywords: orderedMatched,
      missingKeywords: orderedMissing,
      strengths: feedback.strengths,
      suggestions: feedback.suggestions,
    },
  });
}
