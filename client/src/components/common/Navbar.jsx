import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { Bell, MessageCircle, Menu, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ProfileDropdown from '../ProfileDropdown';
import AnimatedLink from '../ui/AnimatedLink';

const MotionLink = motion(RouterLink);

function Navbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <MotionLink to="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full icon-gradient flex items-center justify-center text-white font-bold">TF</div>
          <span className="text-lg font-semibold text-heading">TalentForge AI</span>
        </MotionLink>

        <nav className="hidden items-center gap-8 md:flex text-sm text-slate-700">
          <AnimatedLink to="/">Home</AnimatedLink>
          <AnimatedLink to="/jobs">Jobs</AnimatedLink>
          <AnimatedLink to="/companies">Companies</AnimatedLink>
          <AnimatedLink to="/features">Features</AnimatedLink>
          {user && <AnimatedLink to="/dashboard">Dashboard</AnimatedLink>}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!user ? (
            <>
              <MotionLink whileHover={{ scale: 1.03 }} className="rounded-24 px-4 py-2 text-sm font-medium border border-slate-300 text-slate-700 hover:text-indigo-600 transition" to="/login">
                Login
              </MotionLink>
              <MotionLink whileHover={{ scale: 1.03 }} className="rounded-24 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25" to="/register">
                Register
              </MotionLink>
            </>
          ) : (
            <>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="p-2 rounded-full text-gray-600 hover:bg-gray-50 transition">
                <Bell size={18} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="p-2 rounded-full text-gray-600 hover:bg-gray-50 transition">
                <MessageCircle size={18} />
              </motion.button>
              <ProfileDropdown />
            </>
          )}
        </div>

        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-center rounded-full p-3 text-gray-700 md:hidden">
          <Menu size={20} />
        </motion.button>
      </div>
    </header>
  );
}

export default Navbar;
