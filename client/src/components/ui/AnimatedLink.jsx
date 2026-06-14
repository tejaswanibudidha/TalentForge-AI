import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

export default function AnimatedLink({ to, children, className = '', ...props }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `relative inline-flex items-center gap-1 text-sm font-medium transition ${isActive ? 'text-indigo-700' : 'text-slate-700 hover:text-indigo-600'} ${className}`}
      {...props}
    >
      {({ isActive }) => (
        <>
          {children}
          {isActive && (
            <motion.span
              layoutId="nav-underline"
              className="absolute left-0 right-0 bottom-[-4px] h-1 rounded-full bg-indigo-700"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </>
      )}
    </NavLink>
  );
}
