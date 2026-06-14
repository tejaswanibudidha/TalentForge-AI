import React, { useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../utils/animations";
import { Target, TrendingUp, BookOpen } from "lucide-react";

const SkillGapAnalysis = () => {
  const [targetRole] = useState("Senior Full Stack Engineer");

  const skillComparison = [
    {
      skill: "React",
      userLevel: 85,
      requiredLevel: 90,
      gap: 5,
      status: "Almost there",
    },
    {
      skill: "Node.js",
      userLevel: 78,
      requiredLevel: 85,
      gap: 7,
      status: "Learning",
    },
    {
      skill: "System Design",
      userLevel: 65,
      requiredLevel: 90,
      gap: 25,
      status: "Priority",
    },
    {
      skill: "AWS",
      userLevel: 60,
      requiredLevel: 80,
      gap: 20,
      status: "Priority",
    },
    {
      skill: "Database Design",
      userLevel: 75,
      requiredLevel: 85,
      gap: 10,
      status: "Learning",
    },
    {
      skill: "Problem Solving",
      userLevel: 88,
      requiredLevel: 85,
      gap: -3,
      status: "Exceeds",
    },
  ];

  const recommendations = [
    {
      skill: "System Design",
      resources: ["System Design Interview Course (Educative)", "Designing Data-Intensive Applications"],
      estimatedTime: "6-8 weeks",
    },
    {
      skill: "AWS",
      resources: ["AWS Solutions Architect Associate Certification", "Practical AWS Projects"],
      estimatedTime: "4-6 weeks",
    },
    {
      skill: "Node.js Advanced",
      resources: ["The Complete Node.js Developer Course", "Node.js Performance Tuning"],
      estimatedTime: "3-4 weeks",
    },
  ];

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-3 mb-2">
          <Target className="text-indigo-600" size={28} />
          <h2 className="text-3xl font-bold text-slate-900">Skill Gap Analysis</h2>
        </div>
        <p className="text-slate-600">
          Compare your skills against the <span className="font-semibold text-slate-900">{targetRole}</span> role and get personalized improvement suggestions
        </p>
      </motion.div>

      {/* Skills Comparison */}
      <motion.div
        variants={itemVariants}
        className="rounded-[2rem] border border-slate-200 bg-white p-8"
      >
        <h3 className="text-xl font-bold text-slate-900 mb-6">Your Skills vs. Target Role</h3>
        <div className="space-y-6">
          {skillComparison.map((item, idx) => {
            const statusColor =
              item.status === "Exceeds"
                ? "bg-emerald-100 text-emerald-700"
                : item.status === "Almost there"
                ? "bg-blue-100 text-blue-700"
                : item.status === "Learning"
                ? "bg-amber-100 text-amber-700"
                : "bg-red-100 text-red-700";

            return (
              <motion.div
                key={item.skill}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-bold text-slate-900">{item.skill}</p>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold mt-1 ${statusColor}`}>
                      {item.status}
                      {item.gap > 0 ? ` (+${item.gap}% gap)` : " ✓"}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600">Your Level / Required</p>
                    <p className="text-lg font-bold text-slate-900">
                      {item.userLevel}% / {item.requiredLevel}%
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 mb-1">Your Level</p>
                      <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.userLevel}%` }}
                          transition={{ duration: 1.5, delay: idx * 0.1 }}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 mb-1">Required</p>
                      <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                        <motion.div
                          className="h-full bg-gray-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.requiredLevel}%` }}
                          transition={{ duration: 1.5, delay: idx * 0.1 + 0.2 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-3">
        {recommendations.map((rec, idx) => (
          <motion.div
            key={rec.skill}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 + 0.3 }}
            className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-full bg-indigo-600 p-2 text-white">
                <BookOpen size={20} />
              </div>
              <h4 className="text-lg font-bold text-slate-900">{rec.skill}</h4>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              <span className="font-semibold">Estimated time:</span> {rec.estimatedTime}
            </p>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-600 font-semibold">
                Recommended Resources
              </p>
              {rec.resources.map((resource) => (
                <div
                  key={resource}
                  className="text-sm text-indigo-700 bg-indigo-50 rounded-lg p-3 flex items-start gap-2"
                >
                  <span className="text-indigo-600 mt-0.5">→</span>
                  <span>{resource}</span>
                </div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 font-semibold hover:bg-indigo-200 transition"
            >
              Start Learning
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default SkillGapAnalysis;
