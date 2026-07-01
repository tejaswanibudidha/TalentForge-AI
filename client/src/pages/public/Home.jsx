import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import AnimatedButton from '../../components/ui/AnimatedButton';
import { FiSearch, FiUsers, FiShield, FiTrendingUp } from 'react-icons/fi';

const stagger = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: 0.12 * i } }),
};

export default function Home() {
  const { companies } = useData();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Hero Section */}
        <motion.section initial="hidden" animate="visible" className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr] items-center pb-20">
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

          {/* Hero Right Side - AI Recruitment Illustration */}
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
            <div className="absolute -left-10 top-10 h-28 w-28 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 opacity-20 blur-3xl animate-blob" />
            <div className="absolute right-6 top-0 h-20 w-20 rounded-full bg-gradient-to-br from-indigo-400 to-blue-400 opacity-20 blur-3xl animate-blob animation-delay-2000" />
            
            <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop" 
                alt="AI Recruitment and Hiring Technology"
                className="w-full h-96 object-cover"
              />
              
              {/* Floating Animation Card Overlay */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-4 left-4 right-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white shadow-lg"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-blue-100 font-semibold">AI Powered Match</p>
                <p className="mt-2 text-lg font-bold">92% Accuracy</p>
              </motion.div>
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
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="py-20 space-y-8">
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

          {/* Statistics Section */}
          <div className="grid gap-6 md:grid-cols-4 pt-8">
            {[
              { value: '20+', label: 'Companies Trust Us' },
              { value: '95%', label: 'Matching Accuracy' },
              { value: '10,000+', label: 'Candidates Matched' },
              { value: '50+', label: 'Applications Daily' },
            ].map((stat, i) => (
              <motion.div key={i} variants={stagger} custom={i} className="rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{stat.value}</div>
                <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

