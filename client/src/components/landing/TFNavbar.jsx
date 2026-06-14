import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

const TFNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Jobs", href: "#jobs" },
    { name: "Companies", href: "#companies" },
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
  ];

  const handleGetStarted = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(user.role === 'recruiter' ? '/recruiter/dashboard' : '/home');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TalentForge AI
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -2 }}
                className="text-slate-700 hover:text-indigo-600 font-medium text-sm transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to={user.role === 'recruiter' ? '/recruiter/dashboard' : '/home'}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium transition-colors hover:bg-indigo-700"
                >
                  Go to Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg font-medium transition-colors hover:bg-indigo-50"
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition-colors inline-flex"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-shadow inline-flex"
                  >
                    Register
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-700"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-200/30 py-4"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-700 font-medium hover:text-indigo-600 transition-colors px-4"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-3 px-4 pt-4 border-t border-slate-200/30">
                {user ? (
                  <>
                    <Link
                      to={user.role === 'recruiter' ? '/recruiter/dashboard' : '/home'}
                      className="flex-1 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg text-center"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="flex-1 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg text-center"
                    >
                      Profile
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex-1 px-4 py-2 text-indigo-600 font-medium border border-indigo-600 rounded-lg text-center"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg text-center"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default TFNavbar;
