import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import JobCard from '../../components/JobCard';
import AnimatedButton from '../../components/ui/AnimatedButton';
import { FiSearch, FiUsers, FiShield, FiTrendingUp } from 'react-icons/fi';

const stagger = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: 0.12 * i } }),
};

function MetricCard({ value, label }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let current = 0;
    const target = parseInt(value, 10);
    const duration = 1000;
    const stepTime = Math.max(10, Math.floor(duration / target));
    const timer = setInterval(() => {
      current += Math.ceil(target / (duration / stepTime));
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCount(current);
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div whileHover={{ y: -6 }} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-blue-500/10 backdrop-blur-xl transition-all">
      <div className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{count}{label.includes('%') ? '%' : '+'}</div>
      <p className="mt-3 text-sm text-slate-200">{label}</p>
    </motion.div>
  );
}

export default function Home() {
  const { user } = useAuth();
  const { jobs, companies } = useData();
  const navigate = useNavigate();
  const featuredJobs = useMemo(() => jobs.slice(0, 4), [jobs]);
  const totalApplicants = jobs.reduce((sum, job) => sum + (job.applicants?.length || 0), 0);

  const ecosystemCards = [
    'AI Resume Analysis',
    'ATS Resume Scoring',
    'Smart Candidate Ranking',
    'Intelligent Job Matching',
    'Skill Gap Detection',
    'Interview Readiness Insights',
  ];

  const featureCards = [
    { title: 'AI Resume Analysis', description: 'Instantly analyze resumes and identify strengths, weaknesses, and key skills.', icon: <FiSearch className="text-2xl text-purple-300" /> },
    { title: 'ATS Optimization', description: 'Improve resume quality with AI-powered ATS compatibility checks.', icon: <FiShield className="text-2xl text-blue-300" /> },
    { title: 'Smart Matching', description: 'Connect candidates with the most relevant opportunities.', icon: <FiUsers className="text-2xl text-cyan-300" /> },
    { title: 'Recruitment Analytics', description: 'Gain insights into hiring performance and candidate quality.', icon: <FiTrendingUp className="text-2xl text-indigo-300" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <motion.section initial="hidden" animate="visible" className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr] items-center">
          <motion.div variants={stagger} className="space-y-6">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-purple-200">AI Recruitment Platform</span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">Modern AI-powered hiring for recruiters and candidates.</h1>
            <p className="max-w-2xl text-slate-300 text-lg leading-relaxed">TalentForge AI turns your hiring workflow into a seamless, intelligent experience. From resume analysis to candidate ranking, build better teams faster.</p>
            <div className="flex flex-wrap gap-4">
              <AnimatedButton className="rounded-3xl bg-gradient-to-r from-purple-500 to-blue-500 px-7 py-3 text-white shadow-2xl shadow-purple-500/20" onClick={() => navigate('/jobs')}>
                Get Started
              </AnimatedButton>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 sm:max-w-md">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-blue-500/5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Trusted by</p>
                <p className="mt-3 text-2xl font-bold text-white">20+ companies</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-purple-500/5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Match accuracy</p>
                <p className="mt-3 text-2xl font-bold text-white">95%</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
            <div className="absolute -left-10 top-10 h-28 w-28 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 opacity-30 blur-3xl animate-blob" />
            <div className="absolute right-6 top-0 h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 opacity-30 blur-3xl animate-blob animation-delay-2000" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-indigo-500/20 backdrop-blur-xl">
              <div className="absolute -right-10 top-20 h-32 w-32 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 opacity-20 blur-3xl" />
              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-inner shadow-black/30">
                <div className="grid gap-4">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Resume analysis</p>
                        <h2 className="mt-2 text-xl font-semibold text-white">AI insights</h2>
                      </div>
                      <div className="rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-3 py-2 text-sm text-white">Live</div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl bg-slate-900/70 p-4 text-sm text-slate-300">Skills matched</div>
                      <div className="rounded-3xl bg-slate-900/70 p-4 text-sm text-slate-300">ATS ready</div>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.75rem] bg-gradient-to-br from-purple-500/10 to-blue-500/15 p-5 text-white shadow-lg border border-white/10">
                      <p className="text-sm uppercase tracking-[0.25em] text-slate-300">Candidate match</p>
                      <p className="mt-4 text-3xl font-bold">92%</p>
                    </div>
                    <div className="rounded-[1.75rem] bg-white/10 p-5 text-white border border-white/10">
                      <p className="text-sm uppercase tracking-[0.25em] text-slate-300">Job fit</p>
                      <p className="mt-4 text-3xl font-bold">A+</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-[1.75rem] bg-slate-950/60 p-5 border border-white/10 shadow-lg">
                <div className="flex items-center justify-between text-slate-200">
                  <span className="text-sm uppercase tracking-[0.35em] text-slate-400">AI Recruiter preview</span>
                  <span className="text-sm text-cyan-300">Realtime</span>
                </div>
                <div className="mt-4 rounded-3xl bg-gradient-to-br from-purple-600 to-blue-500 p-5 text-white shadow-xl">
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-100/80">Candidate matching</p>
                  <h3 className="mt-3 text-xl font-semibold">Maria Gomez</h3>
                  <p className="mt-2 text-sm text-slate-200">AI indicates strong resume fit for product design roles.</p>
                </div>
              </div>
            </div>
        </motion.div>
        </motion.section>

        <section className="space-y-8 pt-10">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Explore</p>
            <h2 className="text-3xl font-extrabold">AI-Powered Recruitment Ecosystem</h2>
            <p className="max-w-2xl text-slate-400">A complete suite of intelligent hiring tools designed to streamline screening, ranking, and matching.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ecosystemCards.map((title, idx) => (
              <motion.div key={title} variants={stagger} custom={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ scale: 1.05 }} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-blue-500/10 transition-transform duration-300">
                <div className="rounded-3xl bg-gradient-to-r from-purple-500 to-blue-500 p-4 text-white shadow-md">{title.charAt(0)}</div>
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">AI-powered insights that help hiring teams move faster and decide with confidence.</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="space-y-8 pt-10">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Why TalentForge</p>
            <h2 className="text-3xl font-extrabold">Why Choose TalentForge AI?</h2>
            <p className="max-w-2xl text-slate-400">Designed for modern hiring teams and ambitious candidates, TalentForge AI brings premium intelligence to every step of the recruitment journey.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((feature, idx) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -6 }} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-purple-500/10 transition-all">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">{feature.icon}</div>
                <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-8 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl">
          <div className="pointer-events-none absolute -left-20 top-20 h-48 w-48 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 opacity-20 blur-3xl" />
          <div className="pointer-events-none absolute right-8 bottom-0 h-32 w-32 rounded-full bg-gradient-to-br from-blue-300 to-cyan-300 opacity-15 blur-3xl" />
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Platform</p>
            <h2 className="text-3xl font-extrabold">Build Your Career or Hire Smarter</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2 pt-6">
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">For Job Seekers</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">Career Growth Suite</h3>
              <ul className="mt-6 space-y-3 text-slate-300">
                <li>AI Resume Analysis</li>
                <li>ATS Score</li>
                <li>Job Matching</li>
                <li>Career Recommendations</li>
              </ul>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">For Recruiters</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">Talent Operations Hub</h3>
              <ul className="mt-6 space-y-3 text-slate-300">
                <li>Candidate Ranking</li>
                <li>Resume Screening</li>
                <li>Recruitment Analytics</li>
                <li>Application Tracking</li>
              </ul>
            </motion.div>
          </div>
        </section>

        <section className="space-y-8 pt-10">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Results</p>
            <h2 className="text-3xl font-extrabold">Driving Real Results</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard value="20" label="Companies" />
            <MetricCard value="5" label="Candidates" />
            <MetricCard value="50" label="Applications" />
            <MetricCard value="95" label="% Matching Accuracy" />
          </div>
        </section>

        <section className="space-y-6 pt-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Featured hiring</p>
              <h2 className="text-3xl font-extrabold">Featured jobs for fast-moving teams</h2>
            </div>
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            {featuredJobs.length > 0 ? (
              featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-300">
                No featured jobs available.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
