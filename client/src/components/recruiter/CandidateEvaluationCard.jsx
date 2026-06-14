import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  CheckCircle2,
  XCircle,
  Calendar,
  Eye,
  Star,
  Zap,
  BarChart3,
} from "lucide-react";

const CandidateEvaluationCard = ({
  candidate,
  onViewResume,
  onScheduleInterview,
  onShortlist,
  onReject,
}) => {
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  const handleShortlist = () => {
    setIsShortlisted(!isShortlisted);
    onShortlist(candidate.id, !isShortlisted);
  };

  const handleReject = () => {
    setIsRejected(!isRejected);
    onReject(candidate.id, !isRejected);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm hover:shadow-2xl transition-all group overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-bold text-slate-900">{candidate.name}</h3>
          <p className="text-slate-600 font-semibold mt-1">
            {candidate.role || "Software Engineer"}
          </p>
          <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
            <span>{candidate.experience || "5+ years"}</span>
            <span>•</span>
            <span>{candidate.location || "Bengaluru"}</span>
          </div>
        </div>

        {/* Status Badge */}
        {isShortlisted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs uppercase tracking-[0.2em]"
          >
            <CheckCircle2 size={14} />
            Shortlisted
          </motion.div>
        )}
        {isRejected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold text-xs uppercase tracking-[0.2em]"
          >
            <XCircle size={14} />
            Rejected
          </motion.div>
        )}
      </div>

      {/* Scores Grid */}
      <div className="grid gap-4 sm:grid-cols-4 mb-8">
        {/* Resume Score */}
        <div className="rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-[0.2em]">
              Resume Score
            </p>
            <FileText size={16} className="text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">
            {candidate.resumeScore || 85}%
          </p>
        </div>

        {/* ATS Score */}
        <div className="rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-[0.2em]">
              ATS Score
            </p>
            <BarChart3 size={16} className="text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">
            {candidate.atsScore || 78}%
          </p>
        </div>

        {/* Skill Match */}
        <div className="rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-[0.2em]">
              Skill Match
            </p>
            <Zap size={16} className="text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-emerald-600">
            {candidate.skillMatch || 92}%
          </p>
        </div>

        {/* Overall Ranking */}
        <div className="rounded-lg bg-gradient-to-br from-amber-100 to-amber-50 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-[0.2em]">
              Ranking
            </p>
            <Star size={16} className="text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-amber-600">
            #{candidate.rank || 1}
          </p>
        </div>
      </div>

      {/* Skills and Education */}
      <div className="grid gap-4 sm:grid-cols-2 mb-8 pb-8 border-b border-slate-200">
        {/* Skills */}
        <div>
          <p className="text-sm font-bold text-slate-600 uppercase tracking-[0.2em] mb-3">
            Top Skills
          </p>
          <div className="flex flex-wrap gap-2">
            {(candidate.skills || ["React", "Node.js", "TypeScript", "AWS"]).slice(0, 4).map(
              (skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>

        {/* Education */}
        <div>
          <p className="text-sm font-bold text-slate-600 uppercase tracking-[0.2em] mb-3">
            Education
          </p>
          <p className="text-sm font-semibold text-slate-900">
            {candidate.education || "B.Tech in Computer Science"}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            {candidate.university || "Top Engineering College"}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewResume(candidate)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition text-sm"
          >
            <Eye size={18} />
            View Resume
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition text-sm"
          >
            <Download size={18} />
          </motion.button>
        </div>

        <div className="flex gap-2">
          {!isRejected ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onScheduleInterview(candidate)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-indigo-100 text-indigo-700 font-semibold hover:bg-indigo-200 transition text-sm"
              >
                <Calendar size={18} />
                Schedule
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShortlist}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition text-sm ${
                  isShortlisted
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <CheckCircle2 size={18} />
                {isShortlisted ? "Shortlisted" : "Shortlist"}
              </motion.button>
            </>
          ) : null}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReject}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition text-sm ${
              isRejected
                ? "bg-red-100 text-red-700"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <XCircle size={18} />
            {isRejected ? "Rejected" : "Reject"}
          </motion.button>
        </div>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-200/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </motion.div>
  );
};

export default CandidateEvaluationCard;
