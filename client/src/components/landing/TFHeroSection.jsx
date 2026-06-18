import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  fadeInUpVariants,
  containerVariants,
  itemVariants,
  hoverScale,
} from "../../utils/animations";
import { ArrowRight, PlayCircle } from "lucide-react";
import dashboardService from "../../services/dashboardService";

const TFHeroSection = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [summary, setSummary] = useState({
    atsScore: 0,
    matchScore: 0,
    totalCandidates: 0,
    pipelineCount: 0,
  });
  const [topCandidates, setTopCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const data = await dashboardService.getPublicDashboardSummary();
        setSummary({
          atsScore: data.atsScore ?? 0,
          matchScore: data.matchScore ?? 0,
          totalCandidates: data.totalCandidates ?? 0,
          pipelineCount: data.pipelineCount ?? 0,
        });
        setTopCandidates(data.topCandidates || []);
      } catch (error) {
        setSummary({
          atsScore: 0,
          matchScore: 0,
          totalCandidates: 0,
          pipelineCount: 0,
        });
        setTopCandidates([]);
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, []);

  const stats = [
    { label: "ATS Score", value: loading ? "--" : `${summary.atsScore}%`, icon: "⚡" },
    { label: "Match Score", value: loading ? "--" : `${summary.matchScore}%`, icon: "🎯" },
    { label: "Candidates", value: loading ? "--" : summary.totalCandidates.toLocaleString(), icon: "👥" },
    { label: "Pipeline", value: loading ? "--" : summary.pipelineCount.toLocaleString(), icon: "📊" },
  ];

  const candidates = loading
    ? [
        { name: "Loading...", score: 0 },
        { name: "Loading...", score: 0 },
        { name: "Loading...", score: 0 },
      ]
    : topCandidates.length > 0
    ? topCandidates.map((candidate) => ({
        name: candidate.candidateName || 'Candidate',
        score: candidate.atsScore || candidate.matchScore || 0,
      }))
    : [
        { name: "No candidate data", score: 0 },
      ];

  return (
    <div
      id="home"
      className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full border border-indigo-200/50"
            >
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-indigo-700">
                AI-Powered Talent Acquisition Platform
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
                <span>Forge Better</span>
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Careers.
                </span>
                <br />
                <span>Build Stronger</span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Teams.
                </span>
              </h1>
            </div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              TalentForge AI helps recruiters discover top talent and empowers
              job seekers to find the right opportunities through AI-driven
              resume analysis, ATS scoring, candidate ranking, and smart job
              matching.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
                <motion.div
                {...hoverScale}
                className="inline-flex"
              >
                <Link
                  to="/register"
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-indigo-500/30 transition-shadow flex items-center justify-center gap-2"
                >
                  Get Started
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </motion.div>
              <motion.button
                {...hoverScale}
                className="px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2"
              >
                <PlayCircle size={18} />
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right - Dashboard Preview */}
          <motion.div
            variants={itemVariants}
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Floating Background Cards */}
            <motion.div
              animate={{
                y: isHovering ? -10 : 0,
              }}
              className="relative w-full aspect-square"
            >
              {/* Main Dashboard Card */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-2xl p-8 border border-slate-200/50"
              >
                <div className="space-y-6">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900">
                      AI Talent Dashboard
                    </h3>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, idx) => (
                      <motion.div
                        key={idx}
                        animate={{
                          scale: isHovering ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                        className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100/50"
                      >
                        <div className="text-sm text-slate-600 mb-2">
                          {stat.label}
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-indigo-600">
                            {stat.value}
                          </span>
                          <span className="text-xl">{stat.icon}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Candidates List */}
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-slate-700 mb-3">
                      Top Candidates
                    </div>
                    {candidates.map((candidate, idx) => (
                      <div
                        key={`${candidate.name}-${idx}`}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-slate-700">{candidate.name}</span>
                        <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${candidate.score}%` }}
                            transition={{
                              duration: 1.2,
                              ease: "easeOut",
                              delay: idx * 0.15,
                            }}
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                animate={{
                  x: [0, -10, 0],
                  y: [20, 0, 20],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-10 -right-8 bg-white rounded-lg shadow-lg p-4 border border-slate-200/50 w-32"
              >
                <div className="text-xs font-semibold text-indigo-600 mb-1">
                  Resume Analysis
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {loading ? '--' : `${summary.atsScore}%`}
                </div>
              </motion.div>

              <motion.div
                animate={{
                  x: [0, 10, 0],
                  y: [-20, 0, -20],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute bottom-10 -left-8 bg-white rounded-lg shadow-lg p-4 border border-slate-200/50 w-32"
              >
                <div className="text-xs font-semibold text-purple-600 mb-1">
                  Skill Match
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {loading ? '--' : `${summary.matchScore}%`}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TFHeroSection;
