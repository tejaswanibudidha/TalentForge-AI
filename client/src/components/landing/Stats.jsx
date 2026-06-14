import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const stats = [
  { label: 'Resumes Analyzed', value: 10000 },
  { label: 'Companies', value: 500 },
  { label: 'Matching Accuracy', value: 95 },
  { label: 'Candidates', value: 50000 }
];

function formatValue(stat, current) {
  if (stat.label === 'Matching Accuracy') return `${current}%`;
  if (stat.label === 'Resumes Analyzed' || stat.label === 'Candidates') return `${current.toLocaleString()}+`;
  return current.toString();
}

export default function Stats() {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    let interval;
    let stopTimeout;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCounts((prev) => prev.map((value, index) => {
          const target = stats[index].value;
          const step = Math.max(1, Math.ceil(target / 25));
          return Math.min(target, value + step);
        }));
      }, 35);

      stopTimeout = setTimeout(() => {
        clearInterval(interval);
      }, 1000);
    }, 150);

    return () => {
      clearTimeout(timeout);
      clearTimeout(stopTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="mx-auto max-w-7xl py-12">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((s, index) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} className="rounded-24 bg-white p-6 text-center shadow">
            <div className="text-2xl font-semibold text-primary">{formatValue(s, counts[index])}</div>
            <div className="mt-2 text-sm text-gray-500">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
