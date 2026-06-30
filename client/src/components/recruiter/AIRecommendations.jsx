import React, { useState, useEffect } from "react";
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
import dashboardService from "../../services/dashboardService";
import { CandidateCardSkeleton } from "../ui/LoadingSkeleton";

const AIRecommendations = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getRecruiterMetrics();

        // Map API data to component structure
        const mappedCandidates = (data.topCandidates || []).map((candidate) => ({
          id: candidate.candidateId,
          name: candidate.candidateName || "Unknown",
          role: candidate.candidateEmail || "Candidate",
          matchScore: candidate.matchScore || 0,
          atsScore: candidate.atsScore || 0,
          skills: candidate.skills || [],
          reason: `ATS Score: ${candidate.atsScore}% | Match: ${candidate.matchScore}% | Experience: ${candidate.experience || 0} years`,
          applications: 1,
          avatar: candidate.profileImage
            ? `<img src="${candidate.profileImage}" class="w-full h-full rounded-full" />`
            : "👤",
          status: candidate.status || "Applied",
        }));

        setCandidates(mappedCandidates);
        setError(null);
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setError("Failed to load recommendations");
        setCandidates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Show loading skeletons
  if (loading) {
    return (
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
      >
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
        </motion.div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <CandidateCardSkeleton key={idx} />
          ))}
        </div>
      </motion.section>
    );
  }

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
            {candidates.length > 0
              ? `${candidates.length} top candidates AI ranked for your open positions`
              : "No candidates available"}
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm">
          <Sparkles size={16} />
          AI Analysis
        </div>
      </motion.div>

      {/* Empty State */}
      {candidates.length === 0 && !loading && (
        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-dashed border-slate-300 p-12 text-center bg-slate-50"
        >
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            No candidates available yet
          </h3>
          <p className="text-slate-600">
            Start posting jobs to find top talent matched to your requirements.
          </p>
        </motion.div>
      )}

      {/* Recommendations List */}
      {candidates.length > 0 && (
        <motion.div variants={containerVariants} className="space-y-4">
          {candidates.map((candidate, idx) => (
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
                  {candidate.avatar.startsWith("<img") ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: candidate.avatar }}
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    candidate.avatar
                  )}
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
                {candidate.skills.length > 0 ? (
                  candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500">No skills listed</span>
                )}
              </div>

              {/* Bottom Row */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 font-medium">
                  Status: {candidate.status}
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
      )}
    </motion.section>
  );
};

export default AIRecommendations;
