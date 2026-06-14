import { motion } from 'framer-motion';
import FeatureCard from '../../components/ui/FeatureCard';
import { talentForgeFeatures } from '../../data/talentForgeData';

export default function Features() {
  return (
    <div className="mx-auto max-w-7xl space-y-12 py-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-indigo-600">Platform features</p>
        <h1 className="text-4xl font-extrabold text-slate-900">AI-first tools designed for smarter hiring.</h1>
        <p className="max-w-2xl text-slate-600">TalentForge AI combines resume scoring, candidate ranking, job matching, and recruiter workflows inside one premium experience.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {talentForgeFeatures.map((feature) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            desc={feature.description}
            icon={<span className="text-2xl">{feature.icon === 'FileText' ? '📄' : feature.icon === 'Zap' ? '⚡' : feature.icon === 'TrendingUp' ? '📈' : feature.icon === 'Briefcase' ? '💼' : feature.icon === 'BarChart3' ? '📊' : feature.icon === 'CheckCircle' ? '✅' : '✨'}</span>}
          />
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-slate-900">Why TalentForge?</h2>
            <p className="text-slate-600">Every feature is built to streamline hiring and help job seekers present the best version of their career story.</p>
          </div>
          <div className="space-y-2 text-slate-600">
            <p>AI Resume Analyzer</p>
            <p>ATS compatibility scoring</p>
            <p>Smart matching & ranking</p>
          </div>
          <div className="space-y-2 text-slate-600">
            <p>Rich recruiter dashboards</p>
            <p>Company branding pages</p>
            <p>Community-driven career growth</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
