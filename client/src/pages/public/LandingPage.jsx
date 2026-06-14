import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import GlassCard from '../../components/ui/GlassCard';
import AnimatedButton from '../../components/ui/AnimatedButton';

function LandingPage() {
  const { user } = useAuth();
  const getStartedLink = user ? (user.role === 'recruiter' ? '/recruiter/dashboard' : '/home') : '/login';

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-4">
      <div className="relative w-full max-w-4xl">
        <div className="absolute -inset-6 rounded-24 bg-gradient-to-br from-white/40 to-white/30 blur-xl opacity-60" />
        <GlassCard className="relative mx-auto surface-card">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-4">
              <span className="inline-flex items-center rounded-full bg-surface-secondary/40 px-3 py-1 text-sm font-semibold text-secondary">AI-Powered Recruiting for Modern Teams</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-heading">
              TalentForge AI helps recruiters discover <span className="gradient-text">top talent faster</span>.
            </h1>
            <p className="mt-4 text-base text-body-text max-w-2xl">
              Build a scalable hiring workflow with resume analysis, job matching, automated candidate ranking, and recruiter intelligence.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to={getStartedLink}>
                <AnimatedButton className="btn-primary">Get Started</AnimatedButton>
              </Link>
              <Link to="/login">
                <AnimatedButton variant="ghost">Sign In</AnimatedButton>
              </Link>
            </div>
          </motion.div>
        </GlassCard>
      </div>
    </div>
  );
}

export default LandingPage;
