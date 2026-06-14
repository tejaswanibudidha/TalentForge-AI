import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { User, LogOut, Settings, LayoutDashboard } from 'lucide-react';

export default function ProfileDropdown() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    setOpen(false);
    logout();
  };

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        className="rounded-full overflow-hidden w-10 h-10 bg-slate-100"
      >
        <div className="w-full h-full flex items-center justify-center text-sm font-semibold text-slate-700">
          {user.fullName?.charAt(0)}
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
            <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 rounded-12 bg-white shadow-lg p-2 border border-slate-200"
          >
            <Link onClick={() => setOpen(false)} to="/profile" className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded">
              <User size={16} /> Profile
            </Link>
            <Link
              onClick={() => setOpen(false)}
              to={user.role === 'recruiter' ? '/recruiter/dashboard' : '/home'}
              className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded"
            >
              <LayoutDashboard size={16} /> Dashboard
            </Link>
            <Link onClick={() => setOpen(false)} to="/settings" className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded">
              <Settings size={16} /> Settings
            </Link>
            <button onClick={handleLogout} className="flex w-full items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded text-left">
              <LogOut size={16} /> Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
