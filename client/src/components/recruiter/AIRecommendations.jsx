import React from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../utils/animations";
import {
  Sparkles,
  User,
  Briefcase,
  Star,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const AIRecommendations = () => {
  const recommendations = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Senior Full Stack Engineer",
      matchScore: 94,
      skills: ["React", "Node.js", "AWS", "System Design"],
      reason: "Perfect match for your Senior Engineer role based on resume and experience",
      applications: 2,
      avatar: "👩‍💻",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Product Manager",
      matchScore: 88,
      skills: ["Product Strategy", "Analytics", "User Research", "Leadership"],
      reason: "Strong background in SaaS product management aligned with your hiring needs",
      applications: 1,
      avatar: "👨‍💼",
    },
    {
      id: 3,
      name: "Aisha Patel",
      role: "Data Scientist",
      matchScore: 91,
      skills: ["Machine Learning", "Python", "SQL", "TensorFlow"],
      reason: "Exceptional ML expertise matches your data team expansion perfectly",
      applications: 3,
      avatar: "👩‍🔬",
    },
  ];

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between gap-4 mb-8"
      >
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Sparkles className="text-indigo-600" size={28} />
            AI-Powered Recommendations
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Candidates AI ranked for your open positions
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm">
          <Sparkles size={16} />
          AI Analysis
        </div>
      </motion.div>

      {/* Recommendations List */}
      <motion.div variants={containerVariants} className="space-y-4">
        {recommendations.map((candidate, idx) => (
          <motion.div
            key={candidate.id}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="rounded-xl border border-slate-200 p-6 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group"
          >
            {/* Top Row */}
            <div className="flex items-start gap-4 mb-4">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-2xl flex-shrink-0">
                {candidate.avatar}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-slate-900">
                    {candidate.name}
                  </h3>
                  <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
                </div>
                <p className="text-sm text-slate-600 flex items-center gap-1">
                  <Briefcase size={14} className="text-indigo-600" />
                  {candidate.role}
                </p>
              </div>

              {/* Match Score */}
              <div className="flex flex-col items-end">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 px-4 py-2 text-right"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-600 font-bold">
                    Match
                  </p>
                  <p className="text-2xl font-bold text-emerald-700">
                    {candidate.matchScore}%
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Reason */}
            <p className="text-sm text-slate-600 mb-4 italic">
              "{candidate.reason}"
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {candidate.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-500 font-medium">
                {candidate.applications} application{candidate.applications > 1 ? 's' : ''}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:shadow-lg transition-shadow"
              >
                View Profile
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View All Button */}
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="w-full mt-6 px-6 py-3 rounded-xl border border-indigo-300 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
      >
        View All Recommendations →
      </motion.button>
    </motion.section>
  );
};

export default AIRecommendations;
