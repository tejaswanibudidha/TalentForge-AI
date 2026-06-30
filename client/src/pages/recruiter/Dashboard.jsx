import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import HiringMetricsOverview from '../../components/recruiter/HiringMetricsOverview';
import HiringAnalyticsCharts from '../../components/recruiter/HiringAnalyticsCharts';
import AIRecommendations from '../../components/recruiter/AIRecommendations';
import UpcomingInterviews from '../../components/recruiter/UpcomingInterviews';
import JobPerformanceAnalytics from '../../components/recruiter/JobPerformanceAnalytics';
import RecentActivity from '../../components/recruiter/RecentActivity';
import dashboardService from '../../services/dashboardService';
import { containerVariants, itemVariants } from '../../utils/animations';
import { BarChart3, Sparkles, TrendingUp } from 'lucide-react';

function RecruiterDashboard() {
  const { user } = useAuth();
  const { jobs } = useData();
  const [summary, setSummary] = useState({ totalJobs: 0, totalApplicants: 0, shortlisted: 0, interviews: 0, selected: 0 });

  const recruiterJobs = jobs.filter((job) => job.recruiterId === user?.id);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const data = await dashboardService.getRecruiterDashboard();
        setSummary(data);
      } catch (err) {
        console.error('Failed to load recruiter dashboard summary:', err?.response?.data || err.message || err);
      }
    };
    loadSummary();
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12 py-8"
    >
      <motion.div
        variants={itemVariants}
        className="relative rounded-[2rem] border border-slate-200 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 p-12 text-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.3),_transparent_50%)]"></div>
        <div className="relative space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm border border-white/30">
            <TrendingUp size={18} />
            <span className="font-semibold">Hiring Command Center</span>
          </div>
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Welcome back, {user?.fullName || user?.name || 'Recruiter'}! 👋
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Monitor your hiring operations, track candidate pipelines, and make data-driven decisions with AI-powered insights.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:shadow-lg transition-shadow"
            >
              <BarChart3 size={18} />
              Post New Job
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-semibold rounded-xl border border-white/30 backdrop-blur-sm hover:bg-white/30 transition"
            >
              <Sparkles size={18} />
              View AI Insights
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <HiringMetricsOverview />
      </motion.div>

      <motion.div variants={itemVariants}>
        <HiringAnalyticsCharts />
      </motion.div>

      <motion.div variants={containerVariants} className="grid gap-8 lg:grid-cols-2">
        <motion.div variants={itemVariants}>
          <AIRecommendations />
        </motion.div>
        <motion.div variants={itemVariants}>
          <UpcomingInterviews />
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <JobPerformanceAnalytics />
      </motion.div>

      <motion.div variants={itemVariants} className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm">
        <div className="grid gap-6 sm:grid-cols-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-600">{summary.totalJobs}</p>
            <p className="text-sm text-slate-600 mt-2 uppercase tracking-[0.2em] font-semibold">Jobs Posted</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">{summary.totalApplicants}</p>
            <p className="text-sm text-slate-600 mt-2 uppercase tracking-[0.2em] font-semibold">Total Applications</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-600">{summary.totalApplicants > 0 ? `${Math.round((summary.selected / summary.totalApplicants) * 100)}%` : '0%'}</p>
            <p className="text-sm text-slate-600 mt-2 uppercase tracking-[0.2em] font-semibold">Success Rate</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-rose-600">{summary.selected}</p>
            <p className="text-sm text-slate-600 mt-2 uppercase tracking-[0.2em] font-semibold">Offers Accepted</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default RecruiterDashboard;
