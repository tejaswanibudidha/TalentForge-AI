import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Zap,
} from "lucide-react";

const CandidateAISummary = ({ candidate }) => {
  const insights = [
    {
      type: "strength",
      icon: CheckCircle2,
      label: "Key Strength",
      text: candidate.strength ||
        "Exceptional full-stack expertise with 5+ years of experience in scalable systems",
      color: "from-emerald-100 to-emerald-50",
      textColor: "text-emerald-700",
    },
    {
      type: "consideration",
      icon: AlertCircle,
      label: "Development Area",
      text: candidate.consideration ||
        "Limited experience with specific tech stack; willing to learn quickly",
      color: "from-amber-100 to-amber-50",
      textColor: "text-amber-700",
    },
    {
      type: "opportunity",
      icon: TrendingUp,
      label: "Growth Potential",
      text: candidate.opportunity ||
        "Strong learning curve and leadership qualities suggest high growth potential",
      color: "from-blue-100 to-blue-50",
      textColor: "text-blue-700",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Sparkles size={24} className="text-indigo-600" />
        <h3 className="text-lg font-bold text-slate-900">AI Candidate Summary</h3>
      </div>

      {/* Overall Assessment */}
      <div className="rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 p-4 border border-indigo-200">
        <div className="flex items-start gap-3">
          <Zap size={20} className="text-indigo-600 flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-slate-900 mb-2">Overall Assessment</p>
            <p className="text-sm text-slate-700 leading-relaxed">
              {candidate.assessment ||
                "This candidate demonstrates strong technical proficiency with excellent communication skills. Ideal fit for roles requiring senior-level expertise and mentorship capabilities. High recommendation for advancement to interview stage."}
            </p>
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid gap-3">
        {insights.map((insight, idx) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-lg bg-gradient-to-br ${insight.color} p-4 border border-slate-200`}
            >
              <div className="flex items-start gap-3">
                <Icon size={18} className={`${insight.textColor} flex-shrink-0 mt-0.5`} />
                <div className="flex-1">
                  <p className={`text-sm font-bold ${insight.textColor} uppercase tracking-[0.2em]`}>
                    {insight.label}
                  </p>
                  <p className="text-sm text-slate-700 mt-1">{insight.text}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CandidateAISummary;
