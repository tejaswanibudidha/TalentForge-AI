import { motion } from 'framer-motion';

export default function FeatureCard({ title, desc, icon }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="rounded-24 bg-white p-6 shadow hover:shadow-xl transition">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg icon-gradient">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600">{desc}</p>
    </motion.div>
  );
}
