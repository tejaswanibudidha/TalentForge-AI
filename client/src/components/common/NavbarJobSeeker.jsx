import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { Bell, User, Menu } from 'lucide-react';
import ProfileDropdown from '../ProfileDropdown';
import { useAuth } from '../../context/AuthContext';
import AnimatedLink from '../ui/AnimatedLink';

const MotionLink = motion(RouterLink);

export default function NavbarJobSeeker() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <MotionLink to="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full icon-gradient flex items-center justify-center text-white font-bold">TF</div>
          <span className="text-lg font-semibold text-slate-700">TalentForge AI</span>
        </MotionLink>

        <nav className="hidden items-center gap-8 md:flex text-sm font-medium text-slate-700">
          <AnimatedLink to="/home">Home</AnimatedLink>
          <AnimatedLink to="/jobs">Jobs</AnimatedLink>
          <AnimatedLink to="/companies">Companies</AnimatedLink>
          <AnimatedLink to="/features">Features</AnimatedLink>
          <AnimatedLink to="/about">About</AnimatedLink>
          {user && <AnimatedLink to="/dashboard">Dashboard</AnimatedLink>}
          {user && <AnimatedLink to="/career-hub">Career Hub</AnimatedLink>}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition">
            <Bell size={18} />
          </motion.button>
          <ProfileDropdown />
        </div>

        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-center rounded-full p-3 text-slate-700 md:hidden">
          <Menu size={20} />
        </motion.button>
      </div>
    </header>
  );
}
