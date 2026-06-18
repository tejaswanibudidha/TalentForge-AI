import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  FileText,
  CheckCircle2,
  Calendar,
  TrendingUp,
  Target,
} from "lucide-react";
import dashboardService from "../../services/dashboardService";
import { MetricsSkeletonGrid } from "../ui/LoadingSkeleton";

const HiringMetricsOverview = () => {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getRecruiterDashboard();

        // Map API data to metrics structure
        const mappedMetrics = [
          {
            id: 1,
            icon: Briefcase,
            label: "Active Jobs",
            value: String(data.totalJobs || 0),
            trend: `${data.totalJobs || 0} active`,
            color: "from-blue-500 to-blue-600",
            bgColor: "from-blue-100 to-blue-50",
            trendColor: "text-blue-600",
          },
          {
            id: 2,
            icon: FileText,
            label: "Applications",
            value: String(data.totalApplicants || 0),
            trend: `${data.totalApplicants || 0} received`,
            color: "from-purple-500 to-purple-600",
            bgColor: "from-purple-100 to-purple-50",
            trendColor: "text-purple-600",
          },
          {
            id: 3,
            icon: CheckCircle2,
            label: "Shortlisted",
            value: String(data.shortlisted || 0),
            trend: `${data.shortlisted || 0} candidates`,
            color: "from-emerald-500 to-emerald-600",
            bgColor: "from-emerald-100 to-emerald-50",
            trendColor: "text-emerald-600",
          },
          {
            id: 4,
            icon: Calendar,
            label: "Interviews Scheduled",
            value: String(data.interviews || 0),
            trend: `${data.interviews || 0} pending`,
            color: "from-amber-500 to-amber-600",
            bgColor: "from-amber-100 to-amber-50",
            trendColor: "text-amber-600",
          },
          {
            id: 5,
            icon: TrendingUp,
            label: "Success Rate",
            value: data.totalApplicants > 0 ? `${Math.round((data.selected / data.totalApplicants) * 100)}%` : "0%",
            trend: `${data.selected || 0} offers sent`,
            color: "from-rose-500 to-rose-600",
            bgColor: "from-rose-100 to-rose-50",
            trendColor: "text-rose-600",
          },
          {
            id: 6,
            icon: Target,
            label: "Selected Candidates",
            value: String(data.selected || 0),
            trend: `${data.selected || 0} hired`,
            color: "from-indigo-500 to-indigo-600",
            bgColor: "from-indigo-100 to-indigo-50",
            trendColor: "text-indigo-600",
          },
        ];

        setMetrics(mappedMetrics);
        setError(null);
      } catch (err) {
        console.error("Error fetching metrics:", err);
        setError("Failed to load metrics");
        // Set default metrics with 0 values on error
        setMetrics([
          {
            id: 1,
            icon: Briefcase,
            label: "Active Jobs",
            value: "0",
            trend: "0 active",
            color: "from-blue-500 to-blue-600",
            bgColor: "from-blue-100 to-blue-50",
            trendColor: "text-blue-600",
          },
          {
            id: 2,
            icon: FileText,
            label: "Applications",
            value: "0",
            trend: "0 received",
            color: "from-purple-500 to-purple-600",
            bgColor: "from-purple-100 to-purple-50",
            trendColor: "text-purple-600",
          },
          {
            id: 3,
            icon: CheckCircle2,
            label: "Shortlisted",
            value: "0",
            trend: "0 candidates",
            color: "from-emerald-500 to-emerald-600",
            bgColor: "from-emerald-100 to-emerald-50",
            trendColor: "text-emerald-600",
          },
          {
            id: 4,
            icon: Calendar,
            label: "Interviews Scheduled",
            value: "0",
            trend: "0 pending",
            color: "from-amber-500 to-amber-600",
            bgColor: "from-amber-100 to-amber-50",
            trendColor: "text-amber-600",
          },
          {
            id: 5,
            icon: TrendingUp,
            label: "Success Rate",
            value: "0%",
            trend: "0 offers sent",
            color: "from-rose-500 to-rose-600",
            bgColor: "from-rose-100 to-rose-50",
            trendColor: "text-rose-600",
          },
          {
            id: 6,
            icon: Target,
            label: "Selected Candidates",
            value: "0",
            trend: "0 hired",
            color: "from-indigo-500 to-indigo-600",
            bgColor: "from-indigo-100 to-indigo-50",
            trendColor: "text-indigo-600",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <MetricsSkeletonGrid />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            whileHover={{ y: -8 }}
            className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm hover:shadow-2xl transition-all group"
          >
            {/* Background Icon */}
            <div
              className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${metric.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />

            {/* Content */}
            <div className="relative space-y-4">
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${metric.color}`}
              >
                <Icon size={24} className="text-white" />
              </div>

              {/* Label and Value */}
              <div>
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-[0.2em]">
                  {metric.label}
                </p>
                <p className="mt-2 text-4xl font-bold text-slate-900">
                  {metric.value}
                </p>
              </div>

              {/* Trend */}
              <p className={`text-sm font-semibold ${metric.trendColor}`}>
                {metric.trend}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default HiringMetricsOverview;
