import React from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../utils/animations";
import {
  Activity,
  FileText,
  CheckCircle2,
  User,
  MessageSquare,
  Zap,
} from "lucide-react";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "application",
      title: "New Application Received",
      description: "Priya Sharma applied for Senior Full Stack Engineer",
      time: "2 hours ago",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-100 to-blue-50",
    },
    {
      id: 2,
      type: "shortlist",
      title: "Candidate Shortlisted",
      description: "Rajesh Kumar moved to shortlist for Product Manager role",
      time: "4 hours ago",
      icon: CheckCircle2,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "from-emerald-100 to-emerald-50",
    },
    {
      id: 3,
      type: "interview",
      title: "Interview Scheduled",
      description: "Technical interview scheduled with Aisha Patel",
      time: "6 hours ago",
      icon: User,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-100 to-purple-50",
    },
    {
      id: 4,
      type: "job_posted",
      title: "New Job Posted",
      description: "Data Scientist role posted for your company",
      time: "1 day ago",
      icon: Zap,
      color: "from-amber-500 to-amber-600",
      bgColor: "from-amber-100 to-amber-50",
    },
    {
      id: 5,
      type: "feedback",
      title: "Feedback Received",
      description: "Interview feedback submitted for Vikram Singh",
      time: "1 day ago",
      icon: MessageSquare,
      color: "from-rose-500 to-rose-600",
      bgColor: "from-rose-100 to-rose-50",
    },
  ];

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <Activity className="text-indigo-600" size={28} />
          Recent Activity
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Latest updates from your hiring operations
        </p>
      </motion.div>

      {/* Activity Timeline */}
      <motion.div variants={containerVariants} className="space-y-0">
        {activities.map((activity, idx) => {
          const Icon = activity.icon;
          return (
            <motion.div
              key={activity.id}
              variants={itemVariants}
              className={`flex gap-6 pb-6 ${
                idx !== activities.length - 1 ? "border-b border-slate-200" : ""
              }`}
            >
              {/* Timeline Dot */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${activity.bgColor} flex items-center justify-center`}
                >
                  <Icon
                    size={20}
                    className={`text-slate-900`}
                    style={{
                      background: `linear-gradient(135deg, ${
                        activity.color.split(" ")[0]
                      }, ${activity.color.split(" ")[1]})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  />
                </div>
                {idx !== activities.length - 1 && (
                  <div className="w-1 h-12 bg-gradient-to-b from-slate-300 to-transparent mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h3 className="font-semibold text-slate-900">
                  {activity.title}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {activity.description}
                </p>
                <p className="text-xs text-slate-500 mt-2 font-medium">
                  {activity.time}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* View All Button */}
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="w-full mt-6 px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition"
      >
        View All Activity →
      </motion.button>
    </motion.section>
  );
};

export default RecentActivity;
