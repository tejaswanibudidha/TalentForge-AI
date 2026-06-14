import React, { useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../utils/animations";
import { Code2, Brain, BookOpen, MessageSquare, CheckCircle2 } from "lucide-react";

const InterviewPreparation = () => {
  const [activeTab, setActiveTab] = useState("aptitude");

  const resources = {
    aptitude: [
      {
        id: 1,
        title: "Quantitative Aptitude Basics",
        topic: "Numbers, percentages, ratios",
        difficulty: "Easy",
        duration: "45 min",
      },
      {
        id: 2,
        title: "Logical Reasoning Puzzles",
        topic: "Pattern recognition, problem solving",
        difficulty: "Medium",
        duration: "60 min",
      },
      {
        id: 3,
        title: "Data Interpretation",
        topic: "Charts, graphs, analysis",
        difficulty: "Medium",
        duration: "50 min",
      },
    ],
    coding: [
      {
        id: 4,
        title: "Array & String Problems",
        topic: "Manipulation, searching, sorting",
        difficulty: "Medium",
        duration: "90 min",
      },
      {
        id: 5,
        title: "Binary Trees & Graphs",
        topic: "Traversal, BFS, DFS, shortest path",
        difficulty: "Hard",
        duration: "120 min",
      },
      {
        id: 6,
        title: "Dynamic Programming",
        topic: "Optimization, memoization",
        difficulty: "Hard",
        duration: "150 min",
      },
    ],
    reasoning: [
      {
        id: 7,
        title: "System Design Fundamentals",
        topic: "Scalability, databases, caching",
        difficulty: "Hard",
        duration: "100 min",
      },
      {
        id: 8,
        title: "Design Patterns",
        topic: "Creational, structural, behavioral",
        difficulty: "Medium",
        duration: "80 min",
      },
      {
        id: 9,
        title: "High-Level Architecture",
        topic: "Building real-world systems",
        difficulty: "Hard",
        duration: "120 min",
      },
    ],
    questions: [
      {
        id: 10,
        title: "Behavioral Questions",
        topic: "STAR method, teamwork, leadership",
        difficulty: "Easy",
        duration: "30 min",
      },
      {
        id: 11,
        title: "Technical Interview Questions",
        topic: "Backend, frontend, full-stack",
        difficulty: "Medium",
        duration: "60 min",
      },
      {
        id: 12,
        title: "Company-Specific Questions",
        topic: "Research, culture fit",
        difficulty: "Easy",
        duration: "40 min",
      },
    ],
  };

  const tabs = [
    { id: "aptitude", label: "Aptitude", icon: Brain },
    { id: "coding", label: "Coding", icon: Code2 },
    { id: "reasoning", label: "System Design", icon: BookOpen },
    { id: "questions", label: "Interview Q&A", icon: MessageSquare },
  ];

  const currentResources = resources[activeTab];

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Interview Preparation Tools
        </h2>
        <p className="text-slate-600">
          Practice with AI-curated challenges, questions, and resources to ace your interviews
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap gap-3 rounded-full border border-slate-200 bg-slate-50 p-2"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition ${
                activeTab === tab.id
                  ? "bg-white text-indigo-600 shadow-sm border border-indigo-200"
                  : "text-slate-700 hover:bg-white/50"
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Resources Grid */}
      <motion.div
        variants={containerVariants}
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid gap-6 md:grid-cols-3"
      >
        {currentResources.map((resource, idx) => {
          const difficultyColor =
            resource.difficulty === "Easy"
              ? "bg-emerald-100 text-emerald-700"
              : resource.difficulty === "Medium"
              ? "bg-amber-100 text-amber-700"
              : "bg-red-100 text-red-700";

          return (
            <motion.div
              key={resource.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-2xl transition-all"
            >
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-sm text-slate-600">{resource.topic}</p>
              </div>

              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${difficultyColor}`}>
                  {resource.difficulty}
                </span>
                <span className="text-sm text-slate-500 flex items-center gap-1">
                  ⏱️ {resource.duration}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-shadow flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={18} />
                Start Practice
              </motion.button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Progress Summary */}
      <motion.div
        variants={itemVariants}
        className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-8"
      >
        <h3 className="text-lg font-bold text-slate-900 mb-4">Your Interview Readiness</h3>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "Aptitude", score: 72 },
            { label: "Coding", score: 65 },
            { label: "System Design", score: 58 },
            { label: "Communication", score: 78 },
          ].map((item) => (
            <div key={item.label} className="rounded-xl bg-white p-4 text-center">
              <p className="text-sm text-slate-600 font-semibold mb-2">
                {item.label}
              </p>
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="4"
                  />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="4"
                    strokeDasharray={`${(item.score / 100) * 226.4} 226.4`}
                    initial={{ strokeDasharray: "0 226.4" }}
                    animate={{ strokeDasharray: `${(item.score / 100) * 226.4} 226.4` }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute text-center">
                  <p className="text-2xl font-bold text-indigo-600">
                    {item.score}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default InterviewPreparation;
