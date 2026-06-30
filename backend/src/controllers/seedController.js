import Job from '../models/Job.js';

const seedJobs = [
  {
    title: 'Frontend Developer',
    company: 'Apex Tech',
    location: 'Remote',
    description: 'Build responsive user interfaces with React and Tailwind.',
    requiredSkills: ['React', 'JavaScript', 'HTML', 'CSS']
  },
  {
    title: 'Backend Engineer',
    company: 'Nimbus Labs',
    location: 'San Francisco',
    description: 'Design APIs and data workflows with Node.js and MongoDB.',
    requiredSkills: ['Node', 'Express', 'MongoDB', 'APIs']
  },
  {
    title: 'AI Data Specialist',
    company: 'TalentForge',
    location: 'Hybrid',
    description: 'Analyze resumes and train models for job matching.',
    requiredSkills: ['Python', 'AI', 'Data Analysis', 'Machine Learning']
  }
];

export async function seedJobsInDatabase() {
  const existing = await Job.countDocuments();
  if (existing === 0) {
    await Job.create(seedJobs);
    console.log('Seeded default job postings');
  }
}
