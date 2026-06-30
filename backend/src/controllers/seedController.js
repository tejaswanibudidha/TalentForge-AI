import User from '../models/User.js';
import Company from '../models/Company.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import bcrypt from 'bcryptjs';

// Seed Companies
const seedCompanies = [
  {
    companyId: 'comp-001',
    name: 'TCS',
    industry: 'IT Services',
    description: 'Tata Consultancy Services is a leading global IT services provider.',
    website: 'https://www.tcs.com',
    headquarters: 'Mumbai, India',
    logoUrl: 'https://cdn.worldvectorlogo.com/logos/tcs-2.svg',
    bannerUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200',
    benefits: ['Health Insurance', '401(k)', 'Free Training', 'Work-Life Balance'],
    hiringRoles: ['Java Developer', 'Frontend Developer', 'DevOps Engineer']
  },
  {
    companyId: 'comp-002',
    name: 'Infosys',
    industry: 'IT Services',
    description: 'Infosys is a global leader in next-generation digital services and consulting.',
    website: 'https://www.infosys.com',
    headquarters: 'Bangalore, India',
    logoUrl: 'https://cdn.worldvectorlogo.com/logos/infosys-2.svg',
    bannerUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200',
    benefits: ['Medical Coverage', 'Learning Programs', 'Flexible Hours', 'Career Growth'],
    hiringRoles: ['Python Developer', 'Data Analyst', 'Full Stack Developer']
  },
  {
    companyId: 'comp-003',
    name: 'Wipro',
    industry: 'IT Consulting',
    description: 'Wipro is a leading global IT services and consulting provider.',
    website: 'https://www.wipro.com',
    headquarters: 'Bangalore, India',
    logoUrl: 'https://cdn.worldvectorlogo.com/logos/wipro-2.svg',
    bannerUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200',
    benefits: ['Insurance', 'Stock Options', 'Wellness Program', 'Remote Work'],
    hiringRoles: ['React Developer', 'Cloud Engineer', 'QA Engineer']
  },
  {
    companyId: 'comp-004',
    name: 'Accenture',
    industry: 'Management Consulting',
    description: 'Accenture is a multinational management consulting and professional services company.',
    website: 'https://www.accenture.com',
    headquarters: 'Dublin, Ireland',
    logoUrl: 'https://cdn.worldvectorlogo.com/logos/accenture-2.svg',
    bannerUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200',
    benefits: ['Comprehensive Benefits', 'Training Academy', 'Global Opportunities', 'Innovation Fund'],
    hiringRoles: ['Full Stack Developer', 'AI/ML Engineer', 'Cloud Architect']
  },
  {
    companyId: 'comp-005',
    name: 'Cognizant',
    industry: 'IT Services',
    description: 'Cognizant is a leading provider of IT, consulting, and business process services.',
    website: 'https://www.cognizant.com',
    headquarters: 'Teaneck, New Jersey, USA',
    logoUrl: 'https://cdn.worldvectorlogo.com/logos/cognizant-2.svg',
    bannerUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200',
    benefits: ['Health & Wellness', 'Professional Development', 'Flexibility', 'Diversity Programs'],
    hiringRoles: ['Software Engineer', 'DevOps Engineer', 'Data Scientist']
  }
];

// Seed Jobs
const seedJobs = [
  {
    jobId: 'job-001',
    title: 'Java Developer',
    companyId: 'comp-001',
    description: 'Develop scalable Java applications for enterprise clients.',
    requiredSkills: ['Java', 'Spring Boot', 'Microservices', 'REST APIs'],
    experience: '3-5 years',
    salary: '₹8-12 LPA',
    location: 'Bangalore, India',
    employmentType: 'Full-time'
  },
  {
    jobId: 'job-002',
    title: 'Frontend Developer',
    companyId: 'comp-001',
    description: 'Build responsive web applications using modern frameworks.',
    requiredSkills: ['React', 'JavaScript', 'HTML/CSS', 'Redux'],
    experience: '2-4 years',
    salary: '₹6-10 LPA',
    location: 'Remote',
    employmentType: 'Full-time'
  },
  {
    jobId: 'job-003',
    title: 'Python Developer',
    companyId: 'comp-002',
    description: 'Develop backend services using Python and Django.',
    requiredSkills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
    experience: '2-3 years',
    salary: '₹7-11 LPA',
    location: 'Pune, India',
    employmentType: 'Full-time'
  },
  {
    jobId: 'job-004',
    title: 'Data Analyst',
    companyId: 'comp-002',
    description: 'Analyze business data and create insights for decision making.',
    requiredSkills: ['SQL', 'Tableau', 'Excel', 'Python'],
    experience: '1-3 years',
    salary: '₹5-8 LPA',
    location: 'Hyderabad, India',
    employmentType: 'Full-time'
  },
  {
    jobId: 'job-005',
    title: 'React Developer',
    companyId: 'comp-003',
    description: 'Create interactive user interfaces with React.',
    requiredSkills: ['React', 'TypeScript', 'Webpack', 'Jest'],
    experience: '3-5 years',
    salary: '₹9-13 LPA',
    location: 'Bangalore, India',
    employmentType: 'Full-time'
  },
  {
    jobId: 'job-006',
    title: 'Cloud Engineer',
    companyId: 'comp-003',
    description: 'Design and manage cloud infrastructure on AWS/Azure.',
    requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'Infrastructure as Code'],
    experience: '4-6 years',
    salary: '₹12-16 LPA',
    location: 'Delhi, India',
    employmentType: 'Full-time'
  },
  {
    jobId: 'job-007',
    title: 'Full Stack Developer',
    companyId: 'comp-004',
    description: 'Build end-to-end web solutions with modern stack.',
    requiredSkills: ['MERN', 'Node.js', 'MongoDB', 'React'],
    experience: '3-4 years',
    salary: '₹10-14 LPA',
    location: 'Bangalore, India',
    employmentType: 'Full-time'
  },
  {
    jobId: 'job-008',
    title: 'AI/ML Engineer',
    companyId: 'comp-004',
    description: 'Develop machine learning models for business solutions.',
    requiredSkills: ['Python', 'TensorFlow', 'Deep Learning', 'NLP'],
    experience: '2-4 years',
    salary: '₹11-15 LPA',
    location: 'Gurgaon, India',
    employmentType: 'Full-time'
  },
  {
    jobId: 'job-009',
    title: 'Software Engineer',
    companyId: 'comp-005',
    description: 'Develop robust software solutions for global clients.',
    requiredSkills: ['C++', 'Java', 'Python', 'System Design'],
    experience: '2-5 years',
    salary: '₹8-12 LPA',
    location: 'Chennai, India',
    employmentType: 'Full-time'
  },
  {
    jobId: 'job-010',
    title: 'DevOps Engineer',
    companyId: 'comp-005',
    description: 'Manage CI/CD pipelines and cloud infrastructure.',
    requiredSkills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS'],
    experience: '3-5 years',
    salary: '₹10-14 LPA',
    location: 'Mumbai, India',
    employmentType: 'Full-time'
  }
];

export async function seedDatabase() {
  try {
    // Seed Recruiters (one for each company)
    const hasRecruiterData = await User.countDocuments({ role: 'recruiter' });
    
    const recruiters = [];
    if (hasRecruiterData === 0) {
      const recruiterData = [
        { name: 'Rajesh Kumar (TCS)', email: 'rajesh.tcs@talentforge.com', role: 'recruiter' },
        { name: 'Priya Singh (Infosys)', email: 'priya.infosys@talentforge.com', role: 'recruiter' },
        { name: 'Amit Patel (Wipro)', email: 'amit.wipro@talentforge.com', role: 'recruiter' },
        { name: 'Sarah Johnson (Accenture)', email: 'sarah.accenture@talentforge.com', role: 'recruiter' },
        { name: 'Michael Chen (Cognizant)', email: 'michael.cognizant@talentforge.com', role: 'recruiter' }
      ];

      for (const r of recruiterData) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        const recruiter = await User.create({
          name: r.name,
          email: r.email,
          password: hashedPassword,
          role: 'recruiter'
        });
        recruiters.push(recruiter);
      }
      console.log('✓ Created 5 recruiters');
    } else {
      const existingRecruiters = await User.find({ role: 'recruiter' }).limit(5);
      recruiters.push(...existingRecruiters);
    }

    // Seed Companies with recruiter references
    const hasCompanyData = await Company.countDocuments();
    if (hasCompanyData === 0) {
      const companiesWithRecruiters = seedCompanies.map((company, idx) => ({
        ...company,
        recruiterId: recruiters[idx]?._id
      }));
      await Company.create(companiesWithRecruiters);
      console.log('✓ Created 5 companies');
    }

    // Seed Jobs with company and recruiter references
    const hasJobData = await Job.countDocuments();
    if (hasJobData === 0) {
      const companies = await Company.find().limit(5);
      const jobsWithRefs = seedJobs.map((job, idx) => {
        const company = companies.find(c => c.companyId === job.companyId);
        const recruiter = recruiters.find(r => r._id.toString() === company?.recruiterId?.toString());
        return {
          ...job,
          companyId: company?._id,
          recruiterId: recruiter?._id
        };
      });
      await Job.create(jobsWithRefs);
      console.log('✓ Created 10 jobs');
    }

    // Seed Demo Candidates and Applications
    const hasCandidateData = await User.countDocuments({ role: 'jobseeker' });
    if (hasCandidateData < 15) {
      const candidateNames = [
        'Arjun Verma', 'Neha Sharma', 'Rohan Desai', 'Anjali Kapoor', 'Vikram Singh',
        'Priya Nair', 'Rahul Jain', 'Divya Reddy', 'Akshay Patel', 'Sneha Gupta',
        'Nikhil Rao', 'Megha Bhat', 'Harshit Saxena', 'Shreya Menon', 'Siddharth Yadav'
      ];

      const skillSets = [
        ['Java', 'Spring Boot', 'REST APIs'],
        ['React', 'JavaScript', 'CSS'],
        ['Python', 'Django', 'PostgreSQL'],
        ['SQL', 'Tableau', 'Excel'],
        ['React', 'TypeScript', 'Node.js'],
        ['AWS', 'Docker', 'Kubernetes'],
        ['MERN', 'Node.js', 'MongoDB'],
        ['Python', 'TensorFlow', 'Machine Learning'],
        ['C++', 'System Design', 'Algorithms'],
        ['Docker', 'Jenkins', 'AWS'],
        ['Java', 'Microservices', 'REST'],
        ['Frontend', 'React', 'UI Design'],
        ['Backend', 'Node.js', 'MongoDB'],
        ['DevOps', 'CI/CD', 'Automation'],
        ['Full Stack', 'MERN', 'Agile']
      ];

      for (let i = 0; i < candidateNames.length; i++) {
        const existingCandidate = await User.findOne({ email: `candidate${i + 1}@talentforge.com` });
        if (!existingCandidate) {
          const hashedPassword = await bcrypt.hash('password123', 10);
          await User.create({
            name: candidateNames[i],
            email: `candidate${i + 1}@talentforge.com`,
            password: hashedPassword,
            role: 'jobseeker',
            skills: skillSets[i]
          });
        }
      }
      console.log('✓ Created 15 demo candidates');
    }

    // Seed Applications
    const hasApplicationData = await Application.countDocuments();
    if (hasApplicationData === 0) {
      const candidates = await User.find({ role: 'jobseeker' });
      const jobs = await Job.find();
      const applications = [];

      // Create 50 demo applications
      for (let i = 0; i < 50; i++) {
        const candidate = candidates[i % candidates.length];
        const job = jobs[i % jobs.length];
        const company = await Company.findById(job.companyId);
        const recruiter = await User.findById(job.recruiterId);

        applications.push({
          applicationId: `app-${String(i + 1).padStart(3, '0')}`,
          jobId: job._id,
          companyId: company?._id,
          recruiterId: recruiter?._id,
          candidateId: candidate._id,
          resumeId: null,
          applicationStatus: ['Applied', 'Under Review', 'Shortlisted'][Math.floor(Math.random() * 3)],
          aiScore: Math.floor(Math.random() * 40) + 60,
          atsScore: Math.floor(Math.random() * 40) + 60,
          skillMatch: Math.floor(Math.random() * 40) + 60,
          personalDetails: {
            fullName: candidate.name,
            email: candidate.email,
            phone: '+91' + Math.floor(Math.random() * 9000000000 + 1000000000),
            location: 'India'
          },
          education: [
            {
              institution: 'Indian Institute of Technology',
              degree: 'Bachelor',
              field: 'Computer Science',
              graduationYear: '2022'
            }
          ],
          skills: candidate.skills
        });
      }

      await Application.create(applications);
      console.log('✓ Created 50 demo applications');
    }

    console.log('✓ Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

