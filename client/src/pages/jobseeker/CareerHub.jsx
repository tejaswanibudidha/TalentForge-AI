import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { containerVariants, itemVariants } from '../../utils/animations';
import { useAuth } from '../../context/AuthContext';
import {
  Sparkles,
  FileText,
  ShieldCheck,
  Award,
  Search,
  Zap,
  BookOpen,
  Code2,
  Brain,
  MessageSquare,
  Layers,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

const MetricCard = ({ icon: Icon, label, value, detail, color }) => (
  <motion.div
    variants={itemVariants}
    className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
  >
    <div className={`inline-flex h-11 w-11 items-center justify-center rounded-3xl ${color} text-white`}>
      <Icon size={20} />
    </div>
    <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{label}</p>
    <p className="mt-4 text-4xl font-semibold text-slate-900">{value}</p>
    <p className="mt-2 text-sm text-slate-600">{detail}</p>
  </motion.div>
);

const ProgressBar = ({ label, value, color }) => (
  <div>
    <div className="flex items-center justify-between text-sm text-slate-700 mb-2">
      <span>{label}</span>
      <span className="font-semibold">{value}%</span>
    </div>
    <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.2 }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  </div>
);

const CareerHub = () => {
  const { user } = useAuth();
  const recommendations = [
    {
      id: 1,
      title: 'Senior Full Stack Engineer',
      company: 'Neon Labs',
      location: 'Remote',
      match: 92,
      reason: 'Your current skills closely align with the job requirements.',
      skills: ['React', 'Node.js', 'AWS'],
      posted: '1 day ago',
    },
    {
      id: 2,
      title: 'AI Product Manager',
      company: 'Aura AI',
      location: 'Bengaluru',
      match: 88,
      reason: 'Strong leadership background and AI product experience.',
      skills: ['Machine Learning', 'Roadmapping', 'Stakeholder Management'],
      posted: '3 days ago',
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      company: 'CloudSprint',
      location: 'Hyderabad',
      match: 84,
      reason: 'A good blend of cloud and automation skills for the role.',
      skills: ['Docker', 'Kubernetes', 'CI/CD'],
      posted: '5 days ago',
    },
  ];

  const skillGaps = [
    { skill: 'System Design', current: 68, target: 90, status: 'Priority' },
    { skill: 'AWS Architecture', current: 62, target: 85, status: 'Priority' },
    { skill: 'Data Structures', current: 75, target: 85, status: 'Learning' },
    { skill: 'Communication', current: 82, target: 85, status: 'Trending' },
  ];

  const roadmap = [
    { phase: 'Resume Optimization', description: 'Update keywords and achievements to improve ATS match.', progress: 92 },
    { phase: 'Skill Deepening', description: 'Complete advanced system design and cloud labs.', progress: 60 },
    { phase: 'Interview Readiness', description: 'Practice behavioral and technical questions daily.', progress: 72 },
    { phase: 'Job Applications', description: 'Target roles with 85%+ match score.', progress: 45 },
  ];

  const interviewQuestions = [
    { question: 'Describe a time you improved a product through data-driven decisions.', type: 'Behavioral' },
    { question: 'How would you design a scalable notifications system?', type: 'System Design' },
    { question: 'Write an algorithm to merge k sorted arrays.', type: 'Coding' },
  ];

  const practiceLabs = [
    { title: 'Coding Practice', description: 'Solve algorithmic challenges with instant feedback.', color: 'from-indigo-600 to-cyan-500', icon: Code2 },
    { title: 'Aptitude Practice', description: 'Sharpen reasoning, numbers, and verbal skills.', color: 'from-emerald-600 to-teal-500', icon: Brain },
    { title: 'Reasoning Tests', description: 'Train logic, architecture, and problem solving.', color: 'from-amber-500 to-orange-500', icon: Layers },
    { title: 'Mock Interviews', description: 'Practice live interview scenarios with AI prompts.', color: 'from-fuchsia-600 to-pink-500', icon: MessageSquare },
  ];

  const learningRecommendations = [
    {
      title: 'Advanced System Design',
      provider: 'CareerForge Academy',
      timeline: '4 weeks',
      benefit: 'Boosts your ability to handle senior engineering interviews.',
    },
    {
      title: 'AWS Cloud Architect Path',
      provider: 'CloudPath',
      timeline: '6 weeks',
      benefit: 'Improves your cloud readiness for modern infrastructure roles.',
    },
    {
      title: 'Interview Mastery Toolkit',
      provider: 'SkillSprint',
      timeline: '3 weeks',
      benefit: 'Prepares you for behavioral and technical interview success.',
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      <motion.section
        variants={itemVariants}
        className="rounded-[2rem] bg-gradient-to-r from-indigo-700 via-purple-700 to-sky-700 p-10 text-white shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.25),_transparent_25%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-white/90 shadow-sm">
              <Sparkles size={18} />
              Career Intelligence Hub
            </div>
            <div>
              <h1 className="text-5xl font-bold leading-tight">AI-powered career growth, not just job search.</h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-200">
                Resume analysis, job matching, skill gap insights, and practice tools designed to make TalentForge AI feel like your personal career accelerator.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition hover:bg-slate-100">
                <Search size={18} />
                Explore your career score
              </Link>
              <button className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                <Zap size={18} />
                Start AI evaluation
              </button>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-inner backdrop-blur-xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] bg-white/15 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-200">Resume IQ</p>
                <p className="mt-4 text-4xl font-semibold text-white">92%</p>
                <p className="mt-3 text-sm text-slate-200">AI score for resume clarity, keywords, and impact.</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/15 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-200">Match Potential</p>
                <p className="mt-4 text-4xl font-semibold text-white">88%</p>
                <p className="mt-3 text-sm text-slate-200">Predicted fit for top career opportunities.</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/15 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-200">Skill Readiness</p>
                <p className="mt-4 text-4xl font-semibold text-white">76%</p>
                <p className="mt-3 text-sm text-slate-200">Current readiness for senior and technical roles.</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/15 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-200">Interview Confidence</p>
                <p className="mt-4 text-4xl font-semibold text-white">81%</p>
                <p className="mt-3 text-sm text-slate-200">AI forecast for interview preparation strength.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Resume Analysis</p>
                <h2 className="text-3xl font-bold text-slate-900">AI Resume Insights</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
                <FileText size={18} /> Real-time feedback
              </div>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-[1.5rem] bg-slate-50 p-6">
                <p className="text-sm text-slate-500">Top strengths</p>
                <ul className="mt-4 space-y-3 text-slate-700">
                  <li>• Strong action-driven achievement statements</li>
                  <li>• Clean formatting for easy ATS parsing</li>
                  <li>• Relevant industry keywords included</li>
                </ul>
              </div>
              <div className="rounded-[1.5rem] bg-slate-50 p-6">
                <p className="text-sm text-slate-500">Improvement opportunities</p>
                <ul className="mt-4 space-y-3 text-slate-700">
                  <li>• Add quantifiable metrics to two leadership bullet points</li>
                  <li>• Include more cloud architecture keywords</li>
                  <li>• Optimize summary for product-led growth roles</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Skill Gap Analysis</p>
                <h2 className="text-3xl font-bold text-slate-900">Close the gap faster</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                <ShieldCheck size={18} /> AI learning path
              </div>
            </div>
            <div className="mt-8 space-y-5">
              {skillGaps.map((item, idx) => (
                <div key={item.skill} className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-slate-900">{item.skill}</p>
                      <p className="text-sm text-slate-600">Target: {item.target}% • Status: {item.status}</p>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">Gap: {item.target - item.current}%</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <ProgressBar label="Current competence" value={item.current} color="bg-indigo-600" />
                    <ProgressBar label="Target level" value={item.target} color="bg-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div variants={itemVariants} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Job Matching</p>
                <h2 className="text-3xl font-bold text-slate-900">AI Job Match Recommendations</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
                <Search size={18} /> Smart fit
              </div>
            </div>
            <div className="mt-8 space-y-4">
              {recommendations.map((job, idx) => (
                <div key={job.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xl font-semibold text-slate-900">{job.title}</p>
                      <p className="text-sm text-slate-600">{job.company} • {job.location}</p>
                      <p className="mt-2 text-sm text-slate-600">{job.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-semibold text-slate-900">{job.match}%</p>
                      <p className="text-sm text-slate-500">Match score</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span key={skill} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200">{skill}</span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                    <span>{job.posted}</span>
                    <button className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-white text-sm font-semibold hover:bg-indigo-700 transition">
                      View role
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Career Roadmap</p>
                <h2 className="text-3xl font-bold text-slate-900">Next 90 days plan</h2>
              </div>
              <div className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                <Award size={18} /> AI curated
              </div>
            </div>
            <div className="mt-8 space-y-4">
              {roadmap.map((step, idx) => (
                <div key={step.phase} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-slate-900">{step.phase}</p>
                      <p className="text-sm text-slate-600">{step.description}</p>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{step.progress}%</span>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-slate-200 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${step.progress}%` }}
                      transition={{ duration: 1.2, delay: idx * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Interview Question Generator</p>
                <h2 className="text-3xl font-bold text-slate-900">AI-powered prompts</h2>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              {interviewQuestions.map((item, idx) => (
                <div key={item.question} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-slate-900">{item.question}</p>
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Practice Labs</p>
                <h2 className="text-3xl font-bold text-slate-900">Build your skills</h2>
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {practiceLabs.map((lab) => {
                const Icon = lab.icon;
                return (
                  <div key={lab.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                    <div className={`inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-gradient-to-r ${lab.color} text-white`}>
                      <Icon size={20} />
                    </div>
                    <p className="mt-4 text-xl font-semibold text-slate-900">{lab.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{lab.description}</p>
                    <button className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                      Start practice
                      <ArrowRight size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Learning Recommendations</p>
                <h2 className="text-3xl font-bold text-slate-900">Personalized growth plan</h2>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              {learningRecommendations.map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-600">{item.provider}</p>
                    </div>
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">{item.timeline}</span>
                  </div>
                  <p className="mt-4 text-sm text-slate-600">{item.benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">AI Suggestions</p>
                <h2 className="text-3xl font-bold text-slate-900">What to focus on next</h2>
              </div>
              <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                <ShieldCheck size={18} /> Recommended
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <p className="font-semibold text-slate-900">Optimize your resume headline for AI match terms.</p>
                <p className="mt-2 text-sm text-slate-600">Use role-specific keywords like "AI Product" and "Cloud Architecture" to improve discovery.</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <p className="font-semibold text-slate-900">Practice one system design challenge daily.</p>
                <p className="mt-2 text-sm text-slate-600">Focus on scalability and resilience for the next-level interviews.</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <p className="font-semibold text-slate-900">Apply to roles with 85%+ job match score first.</p>
                <p className="mt-2 text-sm text-slate-600">High match roles increase your chance of recruiter response and interview invites.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default CareerHub;
