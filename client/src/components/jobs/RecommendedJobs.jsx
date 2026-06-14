import React, { useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../utils/animations";
import { Sparkles, Zap, TrendingUp } from "lucide-react";
import JobCardProfessional from "./JobCardProfessional";

const RecommendedJobs = ({ jobs = [] }) => {
  const [savedJobs, setSavedJobs] = useState({});

  const handleSaveJob = (jobId, isSaved) => {
    setSavedJobs((prev) => ({
      ...prev,
      [jobId]: isSaved,
    }));
  };

  // Simulate recommended jobs based on match score
  const recommendedJobs = jobs
    .filter(() => Math.random() > 0.3) // Show ~70% of jobs as recommended
    .map((job) => ({
      ...job,
      matchScore: Math.floor(Math.random() * 25) + 75,
      reason: [
        "Your skills match perfectly",
        "Based on your resume",
        "Matches your experience level",
        "Popular in your field",
      ][Math.floor(Math.random() * 4)],
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 4);

  if (recommendedJobs.length === 0) return null;

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-2">
            <Sparkles className="text-indigo-600" size={32} />
            Recommended For You
          </h2>
          <p className="text-slate-600">
            AI-curated jobs based on your profile, skills, and application history
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm">
          <Zap size={16} />
          AI Powered
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid gap-6 lg:grid-cols-2"
      >
        {recommendedJobs.map((job, idx) => (
          <motion.div
            key={job.id}
            variants={itemVariants}
            className="relative"
          >
            {/* Recommendation Badge */}
            <div className="absolute -top-3 left-6 z-10">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-[0.15em]"
              >
                <TrendingUp size={12} />
                {job.reason}
              </motion.div>
            </div>

            <JobCardProfessional
              job={job}
              onSave={handleSaveJob}
              saved={savedJobs[job.id] || false}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default RecommendedJobs;
