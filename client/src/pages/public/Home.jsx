import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import AnimatedButton from '../../components/ui/AnimatedButton';
import { FiSearch, FiUsers, FiShield, FiTrendingUp } from 'react-icons/fi';

const stagger = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: 0.12 * i } }),
};

export default function Home() {
  const { user } = useAuth();
  const { jobs, companies } = useData();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <motion.section initial="hidden" animate="visible" className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr] items-center">
          <motion.div variants={stagger} className="space-y-6">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs uppercase tracking-[0.35em] text-blue-700">AI Recruitment Platform</span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900">Modern AI-powered hiring for recruiters and candidates.</h1>
            <p className="max-w-2xl text-slate-600 text-lg leading-relaxed">TalentForge AI turns your hiring workflow into a seamless, intelligent experience. From resume analysis to candidate ranking, build better teams faster.</p>
            <div className="flex flex-wrap gap-4">
              <AnimatedButton className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3 text-white shadow-lg hover:shadow-xl transition-shadow" onClick={() => navigate('/jobs')}>
                Get Started
              </AnimatedButton>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 sm:max-w-md">
              <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-600">Trusted by</p>
                <p className="mt-3 text-2xl font-bold text-slate-900">20+ companies</p>
              </div>
              <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-600">Match accuracy</p>
                <p className="mt-3 text-2xl font-bold text-slate-900">95%</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
            <div className="absolute -left-10 top-10 h-28 w-28 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 opacity-20 blur-3xl animate-blob" />
            <div className="absolute right-6 top-0 h-20 w-20 rounded-full bg-gradient-to-br from-indigo-400 to-blue-400 opacity-20 blur-3xl animate-blob animation-delay-2000" />
            <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-xl">
              <div className="absolute -right-10 top-20 h-32 w-32 rounded-full bg-gradient-to-br from-blue-300 to-indigo-300 opacity-15 blur-3xl" />
              <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
                <div className="grid gap-4">
                  <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-slate-600">Resume analysis</p>
                        <h2 className="mt-2 text-xl font-semibold text-slate-900">AI insights</h2>
                      </div>
                      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm text-white">Live</div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl bg-blue-50 p-4 text-sm text-slate-700">Skills matched</div>
                      <div className="rounded-3xl bg-indigo-50 p-4 text-sm text-slate-700">ATS ready</div>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.75rem] bg-gradient-to-br from-blue-50 to-indigo-50 p-5 text-slate-900 shadow-sm border border-gray-200">
                      <p className="text-sm uppercase tracking-[0.25em] text-slate-600">Candidate match</p>
                      <p className="mt-4 text-3xl font-bold text-blue-600">92%</p>
                    </div>
                    <div className="rounded-[1.75rem] bg-white p-5 text-slate-900 border border-gray-200">
                      <p className="text-sm uppercase tracking-[0.25em] text-slate-600">Job fit</p>
                      <p className="mt-4 text-3xl font-bold text-indigo-600">A+</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-[1.75rem] bg-gradient-to-br from-gray-50 to-white p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="text-sm uppercase tracking-[0.35em] text-slate-600">AI Recruiter preview</span>
                  <span className="text-sm text-blue-600">Realtime</span>
                </div>
                <div className="mt-4 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-5 text-white shadow-md">
                  <p className="text-sm uppercase tracking-[0.3em] text-blue-100">Candidate matching</p>
                  <h3 className="mt-3 text-xl font-semibold">Maria Gomez</h3>
                  <p className="mt-2 text-sm text-blue-50">AI indicates strong resume fit for product design roles.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* AI-Powered Recruitment Ecosystem */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-8 py-20">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">AI-Powered Recruitment Ecosystem</h2>
            <p className="text-slate-600 text-lg">Cutting-edge AI tools and insights for smarter hiring decisions</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Smart Resume Analysis', description: 'AI extracts and analyzes key competencies from every resume' },
              { title: 'Candidate Ranking', description: 'Intelligent scoring places top matches at the front of the queue' },
              { title: 'Job Recommendations', description: 'Real-time job matching based on candidate profile and skills' },
              { title: 'Hiring Pipeline', description: 'Visual workflow management for seamless recruitment process' },
              { title: 'Team Collaboration', description: 'Built-in communication tools for distributed hiring teams' },
              { title: 'Compliance & Analytics', description: 'Track metrics and ensure fair, unbiased hiring practices' },
            ].map((item, i) => (
              <motion.div key={i} variants={stagger} custom={i} className="group rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-sm hover:shadow-md transition-all hover:border-blue-200">
                <div className="inline-flex rounded-2xl bg-blue-50 p-3 text-blue-600 group-hover:bg-blue-100 transition-colors">
                  <FiTrendingUp size={24} />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-slate-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Why Choose TalentForge AI */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-8 py-20">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Why Choose TalentForge AI?</h2>
            <p className="text-slate-600 text-lg">Experience the future of intelligent hiring</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {[
              { icon: FiSearch, title: 'Intelligent Search', description: 'Advanced AI algorithms find the perfect candidate match in seconds' },
              { icon: FiUsers, title: 'Diverse Talent Pool', description: 'Connect with candidates from around the world effortlessly' },
              { icon: FiShield, title: 'Security & Privacy', description: 'Enterprise-grade security ensures your data stays protected' },
              { icon: FiTrendingUp, title: 'Data-Driven Insights', description: 'Real-time analytics to optimize your hiring strategy' },
            ].map(({ icon: Icon, title, description }, i) => (
              <motion.div key={i} variants={stagger} custom={i} className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all">
                <div className="inline-flex rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 text-blue-600 group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors">
                  <Icon size={28} />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-slate-600">{description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Build Your Career / Hire Smarter */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="py-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div variants={stagger} className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-12 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900">Build Your Career</h3>
              <p className="mt-4 text-slate-600">Discover opportunities that match your skills and aspirations. Our AI-powered platform connects you with roles tailored to your unique profile.</p>
              <ul className="mt-6 space-y-3">
                {['Create your profile', 'Get matched with opportunities', 'Apply with confidence', 'Track your progress'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">{i + 1}</span>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={stagger} className="rounded-3xl border border-gray-200 bg-gradient-to-br from-indigo-50 to-blue-50 p-12 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900">Hire Smarter</h3>
              <p className="mt-4 text-slate-600">Recruit top talent faster with AI-powered candidate matching and streamlined workflows. Build your dream team with confidence.</p>
              <ul className="mt-6 space-y-3">
                {['Post your jobs', 'Let AI find matches', 'Review top candidates', 'Hire with certainty'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">{i + 1}</span>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

