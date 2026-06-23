import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiSearch, FiUsers, FiShield } from 'react-icons/fi';
import { useData } from '../context/DataContext';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: 0.12 * i } }),
};

function Stat({ value, label, delay = 0 }) {
  const [num, setNum] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 900;
    const stepTime = Math.max(10, Math.floor(duration / end));
    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / stepTime));
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setNum(start);
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div whileHover={{ scale: 1.03 }} className="flex flex-col items-center p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10 shadow-lg w-36">
      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{num}{label.includes('%') ? '%' : ''}</div>
      <div className="text-sm text-gray-300 text-center mt-2">{label.replace('%','')}</div>
    </motion.div>
  );
}

export default function Home() {
  const { jobs } = useData();

  return (
    <div className="mx-auto max-w-7xl py-12 px-6 space-y-16">
      {/* HERO */}
      <motion.section initial="hidden" animate="visible" className="grid gap-8 md:grid-cols-2 items-center">
        <motion.div variants={fadeUp} className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
            TalentForge AI — Hire Smarter with AI
          </h1>
          <p className="text-gray-300 max-w-xl">
            AI-powered recruitment for modern teams. Analyze resumes, rank candidates, and match talent to roles with industry-leading accuracy.
          </p>
          <div className="flex items-center gap-4">
            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href="#" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-lg">
              Get Started
            </motion.a>
          </div>
          <div className="hidden sm:flex gap-4 mt-6">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur p-3 rounded-xl border border-white/10">
              <FiSearch className="text-xl text-purple-300" />
              <div>
                <div className="text-sm text-gray-300">AI Resume Analysis</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur p-3 rounded-xl border border-white/10">
              <FiUsers className="text-xl text-blue-300" />
              <div>
                <div className="text-sm text-gray-300">Smart Matching</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="relative flex justify-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          <div className="relative w-full max-w-md">
            <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br from-purple-600 to-blue-400 opacity-30 blur-3xl animate-blob" />
            <div className="absolute -right-6 -bottom-10 w-56 h-56 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-20 blur-3xl animate-blob animation-delay-2000" />

            <div className="relative p-6 rounded-3xl bg-gradient-to-tr from-white/6 to-white/3 border border-white/10 backdrop-blur shadow-2xl">
              {/* Illustration placeholder */}
              <div className="w-full h-64 rounded-xl overflow-hidden bg-gradient-to-br from-purple-700 to-blue-600 flex items-center justify-center">
                <svg width="260" height="220" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0" y="0" width="260" height="220" rx="16" fill="url(#g)" />
                  <defs>
                    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#7C3AED" />
                      <stop offset="1" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute text-white text-center px-6">
                  <div className="text-lg font-bold">AI Recruitment Studio</div>
                  <div className="text-sm text-gray-100/80 mt-2">Resume insights • Candidate matching • ATS optimization</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white/4 backdrop-blur border border-white/6 text-xs text-gray-200">Resume Scan</div>
                <div className="p-3 rounded-xl bg-white/4 backdrop-blur border border-white/6 text-xs text-gray-200">Match Score</div>
                <div className="p-3 rounded-xl bg-white/4 backdrop-blur border border-white/6 text-xs text-gray-200">ATS Ready</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* AI-Powered Recruitment Ecosystem */}
      <section>
        <h3 className="text-2xl font-semibold text-white mb-6">AI-Powered Recruitment Ecosystem</h3>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[
            'AI Resume Analysis',
            'ATS Resume Scoring',
            'Smart Candidate Ranking',
            'Intelligent Job Matching',
            'Skill Gap Detection',
            'Interview Readiness Insights',
          ].map((t, i) => (
            <motion.div key={t} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ scale: 1.05 }} className="p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500 to-blue-400 flex items-center justify-center text-white text-xl shadow-md">{t.charAt(0)}</div>
                <div>
                  <div className="font-semibold text-white">{t}</div>
                  <div className="text-sm text-gray-300 mt-1">AI-driven capability to improve hiring outcomes and speed up screening.</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose */}
      <section>
        <h3 className="text-2xl font-semibold text-white mb-6">Why Choose TalentForge AI?</h3>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {[
            { title: 'AI Resume Analysis', icon: <FiSearch /> , text: 'Instantly analyze resumes and identify strengths, weaknesses, and key skills.'},
            { title: 'ATS Optimization', icon: <FiShield /> , text: 'Improve resume quality with AI-powered ATS compatibility checks.'},
            { title: 'Smart Matching', icon: <FiUsers /> , text: 'Connect candidates with the most relevant opportunities.'},
            { title: 'Recruitment Analytics', icon: <FiTrendingUp /> , text: 'Gain insights into hiring performance and candidate quality.'},
          ].map((c, i) => (
            <motion.div key={c.title} whileHover={{ y: -6 }} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl bg-gradient-to-tr from-white/6 to-white/3 border border-white/10 backdrop-blur shadow-md">
              <div className="flex items-start gap-4">
                <div className="text-2xl text-purple-400">{c.icon}</div>
                <div>
                  <div className="font-semibold text-white">{c.title}</div>
                  <div className="text-sm text-gray-300 mt-1">{c.text}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Build Your Career or Hire Smarter */}
      <section>
        <h3 className="text-2xl font-semibold text-white mb-6">Build Your Career or Hire Smarter</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          <motion.div className="p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 shadow-lg" whileHover={{ scale: 1.02 }}>
            <div className="font-semibold text-white text-lg">For Job Seekers</div>
            <ul className="mt-3 text-gray-300 list-disc list-inside">
              <li>AI Resume Analysis</li>
              <li>ATS Score</li>
              <li>Job Matching</li>
              <li>Career Recommendations</li>
            </ul>
          </motion.div>

          <motion.div className="p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 shadow-lg" whileHover={{ scale: 1.02 }}>
            <div className="font-semibold text-white text-lg">For Recruiters</div>
            <ul className="mt-3 text-gray-300 list-disc list-inside">
              <li>Candidate Ranking</li>
              <li>Resume Screening</li>
              <li>Recruitment Analytics</li>
              <li>Application Tracking</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Driving Real Results */}
      <section>
        <h3 className="text-2xl font-semibold text-white mb-6">Driving Real Results</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <Stat value={20} label="Companies" />
          <Stat value={5} label="Candidates" />
          <Stat value={50} label="Applications" />
          <Stat value={95} label="% Matching Accuracy" />
        </div>
      </section>

      {/* Existing Job list (kept for functionality) */}
      <section>
        <h3 className="text-2xl font-semibold text-white mb-4">Job Listings</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {jobs && jobs.length ? jobs.map((job) => (
            <div key={job.id} className="p-4 rounded-xl bg-white/3 border border-white/6"> 
              <div className="font-semibold text-white">{job.title}</div>
              <div className="text-sm text-gray-300">{job.location}</div>
            </div>
          )) : <div className="text-gray-400">No jobs yet.</div>}
        </div>
      </section>

    </div>
  );
}
