import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function AuthLayout({ title, subtitle, children, ctaText, ctaLink }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="grid w-full max-w-6xl overflow-hidden rounded-[32px] bg-white/90 shadow-[0_40px_120px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:grid-cols-[1.18fr_0.9fr]"
      >
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 p-10 text-white sm:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.24),_transparent_28%)]" />
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute left-0 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex h-full flex-col justify-between">
            <div>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
                <ShieldCheck size={16} /> TalentForge AI
              </div>
              <h1 className="max-w-lg text-4xl font-semibold leading-tight tracking-tight">A modern hiring workflow for recruiters and career builders.</h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/80">{subtitle}</p>
            </div>

            <div className="space-y-4 rounded-[28px] border border-white/15 bg-white/10 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
              <div className="text-sm uppercase tracking-[0.24em] text-white/70">Built to feel premium</div>
              <p className="mt-3 text-lg font-semibold leading-7">Glassmorphism, gradient motion, and polished experience that matches modern SaaS.</p>
            </div>
          </div>
        </div>

        <div className="glass-panel flex min-h-[540px] flex-col justify-center p-8 sm:p-12">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Welcome back</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">{title}</h2>
            </div>
            <Link
              to={ctaLink}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              {ctaText} <ArrowRight size={16} />
            </Link>
          </div>

          {children}
        </div>
      </motion.div>
    </div>
  );
}
