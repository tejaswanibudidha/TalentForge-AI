import React, { useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../utils/animations";
import { AlertCircle, CheckCircle2, Zap } from "lucide-react";

const ATSResumeScore = () => {
  const [resumeData] = useState({
    overallScore: 78,
    atsCompatibility: 82,
    keywordOptimization: 71,
    formatting: 88,
  });

  const strengths = [
    "Clear professional summary",
    "Well-structured experience section",
    "Relevant skill keywords included",
    "Proper date formatting",
  ];

  const weaknesses = [
    "Missing quantifiable achievements (add numbers/percentages)",
    "Industry-specific keywords could be stronger",
    "Some formatting inconsistencies",
    "Limited certifications section",
  ];

  const missingSkills = [
    "Cloud Architecture (AWS/Azure)",
    "Advanced Python (Data Science)",
    "Kubernetes/DevOps",
    "GraphQL",
  ];

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-10"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-slate-900">ATS Resume Score</h2>
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            AI-Powered Analysis
          </span>
        </div>
        <p className="text-slate-600">
          Understand how recruiters will see your resume and optimize it for ATS systems
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Score Section */}
        <motion.div variants={itemVariants} className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-600 font-semibold mb-3">
                Overall ATS Score
              </p>
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="8"
                    strokeDasharray={`${(resumeData.overallScore / 100) * 352} 352`}
                    initial={{ strokeDasharray: "0 352" }}
                    animate={{ strokeDasharray: `${(resumeData.overallScore / 100) * 352} 352` }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-indigo-600">
                      {resumeData.overallScore}%
                    </p>
                    <p className="text-xs text-slate-600 uppercase tracking-[0.25em]">
                      Good
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "ATS Compatibility", score: resumeData.atsCompatibility },
                { label: "Keyword Optimization", score: resumeData.keywordOptimization },
                { label: "Formatting", score: resumeData.formatting },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm font-semibold text-slate-700">
                      {item.label}
                    </p>
                    <p className="text-sm text-indigo-600 font-bold">
                      {item.score}%
                    </p>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 1.5, delay: 0.3 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-shadow"
          >
            Improve Your Resume
          </motion.button>
        </motion.div>

        {/* Insights Section */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Strengths */}
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-emerald-600 p-2 text-white">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="text-lg font-bold text-emerald-900">
                Your Strengths
              </h3>
            </div>
            <ul className="space-y-2">
              {strengths.map((item, idx) => (
                <li key={idx} className="text-sm text-emerald-800 flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-amber-600 p-2 text-white">
                <AlertCircle size={20} />
              </div>
              <h3 className="text-lg font-bold text-amber-900">Areas to Improve</h3>
            </div>
            <ul className="space-y-2">
              {weaknesses.map((item, idx) => (
                <li key={idx} className="text-sm text-amber-800 flex items-start gap-2">
                  <span className="text-amber-600 mt-1">!</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Missing Skills */}
      <motion.div variants={itemVariants} className="mt-8 rounded-3xl border border-slate-200 bg-white p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-full bg-indigo-600 p-2 text-white">
            <Zap size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Skills to Learn Next
          </h3>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          These skills will boost your ATS score and make you more competitive
        </p>
        <div className="flex flex-wrap gap-3">
          {missingSkills.map((skill) => (
            <motion.button
              key={skill}
              whileHover={{ y: -2 }}
              className="rounded-full border-2 border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 transition"
            >
              {skill}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default ATSResumeScore;
