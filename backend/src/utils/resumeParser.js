const SKILL_KEYWORDS = [
  'javascript', 'react', 'node', 'express', 'python', 'django', 'flask', 'mongodb', 'sql', 'aws', 'docker', 'kubernetes', 'html', 'css', 'typescript'
];

function findSection(text, heading) {
  const regex = new RegExp(`${heading}[:\n](.*?)(?:\n\n|$)`, 'is');
  const match = text.match(regex);
  if (!match) return [];
  return match[1]
    .split(/\n|,|\r/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function extractSkills(text) {
  const lower = text.toLowerCase();
  return SKILL_KEYWORDS.filter((skill) => lower.includes(skill)).map((skill) => skill.charAt(0).toUpperCase() + skill.slice(1));
}

export function extractResumeData(text) {
  const lines = text.split(/\n|\r/).map((line) => line.trim()).filter(Boolean);
  const name = lines[0] || '';
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  const phoneMatch = text.match(/\+?[0-9][0-9\-\s]{7,}[0-9]/);

  const skills = Array.from(new Set(extractSkills(text)));
  const education = findSection(text, 'education');
  const experience = findSection(text, 'experience');
  const projects = findSection(text, 'project');
  const certifications = findSection(text, 'certification');

  return {
    name,
    email: emailMatch ? emailMatch[0] : '',
    phone: phoneMatch ? phoneMatch[0] : '',
    skills,
    education,
    experience,
    projects,
    certifications,
    summary: lines.slice(1, 4).join(' ')
  };
}
