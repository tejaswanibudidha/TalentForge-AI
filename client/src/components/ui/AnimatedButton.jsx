import { motion } from 'framer-motion';

export default function AnimatedButton({ children, variant = 'solid', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-24 text-sm font-semibold transition focus:outline-none';
  const variants = {
    solid: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 transform-gpu hover:scale-105',
    ghost: 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
