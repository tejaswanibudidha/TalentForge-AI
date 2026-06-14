import { motion } from 'framer-motion';

export default function Button({ children, variant = 'solid', className = '', ...props }) {
  const base = 'inline-flex items-center gap-2 px-5 py-3 rounded-24 text-sm font-semibold shadow-sm';
  const variants = {
    solid: 'btn-primary',
    ghost: 'bg-transparent border border-gray-200 text-var(--body-text) hover:bg-gray-50'
  };

  return (
    <motion.button whileTap={{ scale: 0.98 }} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </motion.button>
  );
}
