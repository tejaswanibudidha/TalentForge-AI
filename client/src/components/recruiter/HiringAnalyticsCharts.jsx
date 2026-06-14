import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon } from "lucide-react";

const HiringAnalyticsCharts = () => {
  const [activeChart, setActiveChart] = useState("applications");

  // Mock data for charts
  const chartTabs = [
    {
      id: "applications",
      label: "Applications Trend",
      icon: LineChartIcon,
      data: [
        { name: "Week 1", value: 120 },
        { name: "Week 2", value: 145 },
        { name: "Week 3", value: 198 },
        { name: "Week 4", value: 210 },
        { name: "Week 5", value: 174 },
      ],
    },
    {
      id: "hiring",
      label: "Hiring Funnel",
      icon: BarChart3,
      data: [
        { name: "Applications", value: 847 },
        { name: "Shortlisted", value: 156 },
        { name: "Interviewed", value: 62 },
        { name: "Offers", value: 18 },
        { name: "Accepted", value: 12 },
      ],
    },
    {
      id: "status",
      label: "Application Status",
      icon: PieChartIcon,
      data: [
        { name: "Under Review", value: 45, color: "from-blue-400 to-blue-600" },
        { name: "Shortlisted", value: 28, color: "from-emerald-400 to-emerald-600" },
        { name: "Rejected", value: 18, color: "from-red-400 to-red-600" },
        { name: "Interviewed", value: 7, color: "from-amber-400 to-amber-600" },
        { name: "Offered", value: 2, color: "from-purple-400 to-purple-600" },
      ],
    },
  ];

  const activeChartData = chartTabs.find((tab) => tab.id === activeChart);

  const maxValue =
    activeChart === "applications"
      ? 250
      : activeChart === "hiring"
      ? 900
      : 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <TrendingUp className="text-indigo-600" size={28} />
            Hiring Analytics
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Track hiring performance and trends
          </p>
        </div>
      </div>

      {/* Chart Tabs */}
      <div className="flex gap-2 mb-8 border-b border-slate-200">
        {chartTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveChart(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm transition border-b-2 ${
                activeChart === tab.id
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Chart Content */}
      <div className="space-y-6">
        {activeChart === "applications" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Line Chart Visualization */}
            <div className="h-64 flex items-flex-end gap-4 justify-between">
              {activeChartData?.data.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.value / maxValue) * 100}%` }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="flex-1 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-xl hover:shadow-lg transition-shadow relative group"
                >
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-3 py-1 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-600 font-medium">
              {activeChartData?.data.map((item) => (
                <span key={item.name}>{item.name}</span>
              ))}
            </div>
          </motion.div>
        )}

        {activeChart === "hiring" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Funnel Chart */}
            {activeChartData?.data.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-900">{item.name}</span>
                  <span className="text-sm font-bold text-slate-600">
                    {item.value}
                  </span>
                </div>
                <div className="h-10 bg-slate-100 rounded-lg overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / maxValue) * 100}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className={`h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-end pr-3`}
                  >
                    <span className="text-xs font-bold text-white">
                      {Math.round((item.value / maxValue) * 100)}%
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeChart === "status" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-6 lg:grid-cols-2"
          >
            {/* Donut Chart */}
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 200 200" className="transform -rotate-90">
                  {activeChartData?.data.map((item, idx) => {
                    const total = activeChartData.data.reduce(
                      (sum, d) => sum + d.value,
                      0
                    );
                    const percentage = (item.value / total) * 100;
                    const circumference = 2 * Math.PI * 70;
                    const offset =
                      circumference -
                      (percentage / 100) * circumference;
                    const startAngle = activeChartData.data
                      .slice(0, idx)
                      .reduce((sum, d) => sum + (d.value / total) * 100, 0);

                    return (
                      <motion.circle
                        key={idx}
                        cx="100"
                        cy="100"
                        r="70"
                        fill="none"
                        strokeWidth="20"
                        className={`stroke-gradient`}
                        style={{
                          strokeDasharray: circumference,
                          strokeDashoffset: offset,
                        }}
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-slate-900">100</p>
                    <p className="text-xs text-slate-600">Total</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              {activeChartData?.data.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color}`}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-600">{item.value}%</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="mt-8 pt-6 border-t border-slate-200 grid gap-4 sm:grid-cols-3">
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-900">847</p>
          <p className="text-xs text-slate-600 mt-1 uppercase tracking-[0.2em] font-semibold">
            Total Applications
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-emerald-600">68%</p>
          <p className="text-xs text-slate-600 mt-1 uppercase tracking-[0.2em] font-semibold">
            Success Rate
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-indigo-600">12</p>
          <p className="text-xs text-slate-600 mt-1 uppercase tracking-[0.2em] font-semibold">
            Offers Accepted
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default HiringAnalyticsCharts;
