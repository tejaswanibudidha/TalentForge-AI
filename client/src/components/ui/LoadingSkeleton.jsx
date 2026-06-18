import React from "react";
import { motion } from "framer-motion";

const MetricSkeleton = () => {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="space-y-4">
        {/* Icon skeleton */}
        <div className="inline-block w-14 h-14 rounded-2xl bg-slate-200" />

        {/* Label skeleton */}
        <div className="space-y-2">
          <div className="h-3 w-24 bg-slate-200 rounded" />
          <div className="h-8 w-32 bg-slate-200 rounded" />
        </div>

        {/* Trend skeleton */}
        <div className="h-4 w-28 bg-slate-200 rounded" />
      </div>
    </motion.div>
  );
};

export const MetricsSkeletonGrid = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 6 }).map((_, idx) => (
        <MetricSkeleton key={idx} />
      ))}
    </motion.div>
  );
};

export const CandidateCardSkeleton = () => {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="rounded-2xl border border-slate-200 bg-white p-6"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="h-5 w-32 bg-slate-200 rounded" />
            <div className="h-4 w-40 bg-slate-200 rounded" />
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-200" />
        </div>

        <div className="flex gap-4 pt-4">
          <div className="h-8 w-16 bg-slate-200 rounded-lg" />
          <div className="h-8 w-16 bg-slate-200 rounded-lg" />
        </div>
      </div>
    </motion.div>
  );
};

export default MetricSkeleton;
