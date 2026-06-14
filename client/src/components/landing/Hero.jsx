import { motion } from 'framer-motion';
import AnimatedButton from '../ui/AnimatedButton';
import GlassCard from '../ui/GlassCard';

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 items-center">
        <div>
          <span className="inline-block rounded-full bg-surface-soft/60 px-3 py-1 text-sm font-semibold text-secondary">AI-Powered Recruitment Platform</span>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900">
            Forge Better <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Careers.</span>
          </motion.h1>
          <p className="mt-4 max-w-xl text-lg text-text-body">Automate resume screening, rank candidates instantly, and discover top talent faster.</p>
          <div className="mt-8 flex gap-4">
            <AnimatedButton>Get Started</AnimatedButton>
            <AnimatedButton variant="ghost" className="border">Watch Demo</AnimatedButton>
          </div>
        </div>

        <div className="relative">
          <GlassCard className="mx-auto max-w-md">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-gray-600">Candidate</div>
                <div className="text-xl font-bold text-gray-800">Jane Doe</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Score</div>
                <div className="text-2xl font-bold text-primary">92</div>
              </div>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div className="h-2 rounded-full" style={{ width: '92%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }} />
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
