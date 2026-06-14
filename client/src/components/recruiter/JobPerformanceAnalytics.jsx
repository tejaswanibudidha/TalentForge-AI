import React, { useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../utils/animations";
import { TrendingUp, Eye, Share2, AlertCircle } from "lucide-react";

const JobPerformanceAnalytics = () => {
  const [sortBy, setSortBy] = useState("applications");

  const jobs = [
    {
      id: 1,
      title: "Senior Full Stack Engineer",
      company: "Tech Innovations",
      posted: "2 weeks ago",
      applications: 124,
      views: 1240,
      shortlisted: 28,
      applicationsChange: "+24%",
      status: "Hot",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Tech Innovations",
      posted: "3 weeks ago",
      applications: 89,
      views: 980,
      shortlisted: 15,
      applicationsChange: "+12%",
      status: "Active",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Tech Innovations",
      posted: "1 week ago",
      applications: 156,
      views: 1850,
      shortlisted: 42,
      applicationsChange: "+45%",
      status: "Hot",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "Tech Innovations",
      posted: "4 weeks ago",
      applications: 34,
      views: 420,
      shortlisted: 6,
      applicationsChange: "-8%",
      status: "Filled",
      color: "from-slate-500 to-slate-600",
    },
  ];

  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortBy === "applications") return b.applications - a.applications;
    if (sortBy === "views") return b.views - a.views;
    if (sortBy === "shortlisted") return b.shortlisted - a.shortlisted;
    return 0;
  });

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
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8"
      >
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <TrendingUp className="text-indigo-600" size={28} />
            Job Performance Analytics
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Track how each job posting is performing
          </p>
        </div>

        {/* Sort Options */}
        <div className="flex gap-2">
          {[
            { label: "Applications", value: "applications" },
            { label: "Views", value: "views" },
            { label: "Shortlisted", value: "shortlisted" },
          ].map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSortBy(option.value)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                sortBy === option.value
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Jobs List */}
      <motion.div variants={containerVariants} className="space-y-4">
        {sortedJobs.map((job, idx) => (
          <motion.div
            key={job.id}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all group"
          >
            <div className="flex flex-col gap-4">
              {/* Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-900 flex-1 truncate">
                      {job.title}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold flex-shrink-0 ${
                        job.status === "Hot"
                          ? "bg-emerald-100 text-emerald-700"
                          : job.status === "Active"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {job.status === "Hot" && <AlertCircle size={12} />}
                      {job.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    {job.company} • Posted {job.posted}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid gap-4 sm:grid-cols-3">
                {/* Applications */}
                <div className="rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-[0.2em]">
                      Applications
                    </p>
                    <span
                      className={`text-xs font-bold ${
                        job.applicationsChange.startsWith("+")
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {job.applicationsChange}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">
                    {job.applications}
                  </p>
                </div>

                {/* Views */}
                <div className="rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-[0.2em]">
                      Views
                    </p>
                    <Eye size={16} className="text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">
                    {job.views}
                  </p>
                </div>

                {/* Shortlisted */}
                <div className="rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-[0.2em]">
                      Shortlisted
                    </p>
                    <span className="text-xs font-bold text-emerald-600">
                      {Math.round((job.shortlisted / job.applications) * 100)}%
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">
                    {job.shortlisted}
                  </p>
                </div>
              </div>

              {/* Performance Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>Conversion Rate</span>
                  <span>
                    {Math.round((job.shortlisted / job.views) * 100)}%
                  </span>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="h-2 bg-slate-200 rounded-full overflow-hidden"
                >
                  <div
                    className={`h-full bg-gradient-to-r ${job.color}`}
                    style={{
                      width: `${Math.round((job.shortlisted / job.views) * 100)}%`,
                    }}
                  />
                </motion.div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition text-sm"
                >
                  View Applicants
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 font-semibold hover:bg-indigo-200 transition text-sm"
                >
                  Edit Post
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View All Button */}
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="w-full mt-6 px-6 py-3 rounded-xl border border-indigo-300 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
      >
        View Detailed Analytics →
      </motion.button>
    </motion.section>
  );
};

export default JobPerformanceAnalytics;
