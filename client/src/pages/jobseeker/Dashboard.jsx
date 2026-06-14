import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { containerVariants, itemVariants } from "../../utils/animations";
import { useAuth } from "../../context/AuthContext";
import CareerProgressOverview from "../../components/dashboard/CareerProgressOverview";
import ATSResumeScore from "../../components/dashboard/ATSResumeScore";
import AIJobRecommendations from "../../components/dashboard/AIJobRecommendations";
import ApplicationTracker from "../../components/dashboard/ApplicationTracker";
import SkillGapAnalysis from "../../components/dashboard/SkillGapAnalysis";
import InterviewPreparation from "../../components/dashboard/InterviewPreparation";
import { Sparkles, Zap } from "lucide-react";

function JobseekerDashboard() {
  const { user } = useAuth();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      {/* Header Section */}
      <motion.div
        variants={itemVariants}
        className="relative rounded-[2rem] border border-slate-200 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 p-12 text-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.3),_transparent_50%)]"></div>
        <div className="relative space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm border border-white/30">
            <Sparkles size={18} />
            <span className="font-semibold">AI Career Mentor</span>
          </div>
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Welcome back, {user?.name || "Job Seeker"}! 👋
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Your personalized AI career growth center is here to help you get
              hired faster with smarter applications, skill development, and
              interview preparation.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:shadow-lg transition-shadow"
            >
              <Zap size={18} />
              Improve Resume Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-semibold rounded-xl border border-white/30 backdrop-blur-sm hover:bg-white/30 transition"
            >
              Schedule Mock Interview
            </motion.button>
            <Link
              to="/career-hub"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition"
            >
              <Sparkles size={18} />
              Open Career Hub
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Career Progress Overview */}
      <CareerProgressOverview />

      {/* ATS Resume Score */}
      <ATSResumeScore />

      {/* AI Job Recommendations */}
      <AIJobRecommendations />

      {/* Application Tracking Timeline */}
      <ApplicationTracker />

      {/* Skill Gap Analysis */}
      <SkillGapAnalysis />

      {/* Interview Preparation Tools */}
      <InterviewPreparation />

      {/* AI Career Mentor CTA */}
      <motion.div
        variants={itemVariants}
        className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-12 text-center shadow-sm"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Ready to level up your career?
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
          Use all these AI-powered tools together to boost your interview
          success rate and land your dream job faster.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-shadow"
        >
          Start Your AI Career Journey
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default JobseekerDashboard;
