import { motion } from 'framer-motion';

export default function AnimatedCard({ children, className = '', ...props }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={`rounded-3xl bg-white p-6 shadow-lg border border-slate-200 transition-transform hover:shadow-xl hover:scale-[1.02] ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
