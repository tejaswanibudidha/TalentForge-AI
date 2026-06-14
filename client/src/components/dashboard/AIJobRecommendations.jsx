import React, { useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../utils/animations";
import { Sparkles, MapPin, DollarSign, Zap } from "lucide-react";

const AIJobRecommendations = () => {
  const [recommendations] = useState([
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechVenture Labs",
      location: "Bengaluru, India",
      salary: "₹28-38 LPA",
      matchScore: 94,
      matchReason: "Perfect alignment with your backend experience",
      skills: ["Python", "AWS", "PostgreSQL"],
      postedDaysAgo: 2,
    },
    {
      id: 2,
      title: "AI/ML Engineer",
      company: "DataFlow Inc.",
      location: "Mumbai, India",
      salary: "₹25-35 LPA",
      matchScore: 87,
      matchReason: "Strong ML foundation + Python expertise",
      skills: ["TensorFlow", "Python", "Data Science"],
      postedDaysAgo: 5,
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "StartupHub",
      location: "Remote",
      salary: "₹18-26 LPA",
      matchScore: 81,
      matchReason: "Your React and Node.js skills are perfect",
      skills: ["React", "Node.js", "MongoDB"],
      postedDaysAgo: 1,
    },
  ]);

  const MatchBadge = ({ score }) => {
    let color = "text-red-600 bg-red-50";
    if (score >= 85) color = "text-emerald-600 bg-emerald-50";
    else if (score >= 75) color = "text-amber-600 bg-amber-50";
    return (
      <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${color} font-semibold text-sm`}>
        <Zap size={14} />
        {score}% Match
      </div>
    );
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-2">
              <Sparkles className="text-indigo-600" size={28} />
              AI-Powered Job Recommendations
            </h2>
            <p className="text-slate-600">
              Curated jobs based on your skills, experience, and career goals
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} className="grid gap-6">
        {recommendations.map((job) => (
          <motion.div
            key={job.id}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-sm hover:shadow-2xl transition-all"
          >
            <div className="flex items-start justify-between gap-6 mb-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {job.title}
                </h3>
                <div className="flex items-center gap-4 text-slate-600 mb-4">
                  <span className="font-semibold text-slate-900">
                    {job.company}
                  </span>
                  <span>•</span>
                  <div className="inline-flex items-center gap-1">
                    <MapPin size={16} className="text-indigo-600" />
                    {job.location}
                  </div>
                </div>
                <p className="text-sm text-slate-500 mb-3">
                  Posted {job.postedDaysAgo} day{job.postedDaysAgo > 1 ? "s" : ""} ago
                </p>
                <p className="text-slate-600 mb-4">{job.matchReason}</p>
              </div>
              <div className="text-right">
                <MatchBadge score={job.matchScore} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mb-6 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-2 text-slate-700">
                <DollarSign size={18} className="text-indigo-600" />
                <span className="font-semibold">{job.salary}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="text-indigo-600">💼</span>
                <span className="font-semibold">Full-time</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-shadow"
              >
                View Job
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default AIJobRecommendations;
