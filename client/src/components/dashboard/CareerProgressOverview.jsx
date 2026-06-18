import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../utils/animations";
import { FileText, CheckCircle2, Calendar, Gift, TrendingUp } from "lucide-react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const CareerProgressCard = ({ icon: Icon, label, value, trend, color, loading }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -8 }}
    className={`rounded-[2rem] border border-slate-200 bg-gradient-to-br ${color} p-8 shadow-sm hover:shadow-2xl transition-all`}
  >
    <div className="flex items-start justify-between mb-6">
      <div className={`rounded-3xl p-4 ${color}`}>
        <Icon size={32} className="text-white" />
      </div>
      {trend && (
        <div className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
          <TrendingUp size={14} /> {trend}
        </div>
      )}
    </div>
    <p className="text-sm uppercase tracking-[0.35em] text-slate-600 font-semibold mb-2">
      {label}
    </p>
    <p className="text-5xl font-bold text-slate-900">
      {loading ? "..." : value}
    </p>
  </motion.div>
);

const CareerProgressOverview = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    applicationsSubmitted: 0,
    shortlistedJobs: 0,
    interviewsScheduled: 0,
    offersReceived: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardStats() {
      if (!user?.token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await api.get('/dashboard/jobseeker', {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (response?.data?.success && response.data.data) {
          const {
            applicationsSubmitted = 0,
            shortlistedJobs = 0,
            interviewsScheduled = 0,
            offersReceived = 0,
          } = response.data.data;

          setUserData({
            applicationsSubmitted,
            shortlistedJobs,
            interviewsScheduled,
            offersReceived,
          });
        }
      } catch (error) {
        console.error('Error loading career progress stats', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardStats();
  }, [user?.token]);

  const cards = [
    {
      icon: FileText,
      label: "Applications Submitted",
      value: userData.applicationsSubmitted,
      color: "from-indigo-50 to-blue-50",
      trend: "+6 this week",
    },
    {
      icon: CheckCircle2,
      label: "Shortlisted Jobs",
      value: userData.shortlistedJobs,
      color: "from-emerald-50 to-teal-50",
      trend: "+2 this week",
    },
    {
      icon: Calendar,
      label: "Interviews Scheduled",
      value: userData.interviewsScheduled,
      color: "from-amber-50 to-orange-50",
      trend: "1 confirmed",
    },
    {
      icon: Gift,
      label: "Offers Received",
      value: userData.offersReceived,
      color: "from-purple-50 to-pink-50",
      trend: "Pending response",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div>
        <h2 className="text-4xl font-bold text-slate-900 mb-3">
          Your Career Progress
        </h2>
        <p className="text-lg text-slate-600">
          Track your job search journey in real-time with AI-powered insights
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {cards.map((card) => (
          <CareerProgressCard key={card.label} loading={loading} {...card} />
        ))}
      </div>
    </motion.div>
  );
};

export default CareerProgressOverview;
