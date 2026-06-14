import React from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../utils/animations";
import { Calendar, Clock, User, MapPin, Video, ArrowRight } from "lucide-react";

const UpcomingInterviews = () => {
  const interviews = [
    {
      id: 1,
      candidateName: "Priya Sharma",
      role: "Senior Full Stack Engineer",
      date: "2026-06-16",
      time: "02:00 PM",
      type: "Technical",
      mode: "Video Call",
      duration: "60 min",
      avatar: "👩‍💻",
      status: "Scheduled",
    },
    {
      id: 2,
      candidateName: "Rajesh Kumar",
      role: "Product Manager",
      date: "2026-06-16",
      time: "03:30 PM",
      type: "HR Round",
      mode: "Video Call",
      duration: "45 min",
      avatar: "👨‍💼",
      status: "Scheduled",
    },
    {
      id: 3,
      candidateName: "Aisha Patel",
      role: "Data Scientist",
      date: "2026-06-17",
      time: "10:00 AM",
      type: "Technical",
      mode: "In-person",
      duration: "90 min",
      avatar: "👩‍🔬",
      status: "Confirmed",
    },
    {
      id: 4,
      candidateName: "Vikram Singh",
      role: "Backend Engineer",
      date: "2026-06-17",
      time: "02:00 PM",
      type: "Final Round",
      mode: "Video Call",
      duration: "60 min",
      avatar: "👨‍💻",
      status: "Scheduled",
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
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between gap-4 mb-8"
      >
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Calendar className="text-indigo-600" size={28} />
            Upcoming Interviews
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Your interview schedule for the next 7 days
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-semibold text-sm">
          <Clock size={16} />
          {interviews.length} Scheduled
        </div>
      </motion.div>

      {/* Interviews List */}
      <motion.div variants={containerVariants} className="space-y-4">
        {interviews.map((interview, idx) => (
          <motion.div
            key={interview.id}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="rounded-xl border border-slate-200 p-6 hover:border-amber-300 hover:bg-amber-50/50 transition-all group"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              {/* Left Side - Candidate Info */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-xl flex-shrink-0">
                  {interview.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-slate-900">
                    {interview.candidateName}
                  </h3>
                  <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                    <MapPin size={14} className="text-indigo-600 flex-shrink-0" />
                    {interview.role}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                      {interview.type}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                      {interview.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle - Date/Time */}
              <div className="flex items-center gap-4 lg:flex-col lg:items-end">
                <div>
                  <p className="text-xs text-slate-600 uppercase tracking-[0.2em] font-semibold mb-1">
                    Date
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    {new Date(interview.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 uppercase tracking-[0.2em] font-semibold mb-1">
                    Time
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    {interview.time}
                  </p>
                </div>
              </div>

              {/* Right - Mode and Action */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-slate-600 uppercase tracking-[0.2em] font-semibold mb-1">
                    Mode
                  </p>
                  <div className="flex items-center gap-1 text-sm font-semibold text-slate-900">
                    {interview.mode === "Video Call" ? (
                      <Video size={16} className="text-blue-600" />
                    ) : (
                      <User size={16} className="text-emerald-600" />
                    )}
                    {interview.mode}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-white hover:shadow-lg transition-shadow"
                  title="Join or view details"
                >
                  <ArrowRight size={20} />
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
        className="w-full mt-6 px-6 py-3 rounded-xl border border-amber-300 text-amber-600 font-semibold hover:bg-amber-50 transition"
      >
        View Full Calendar →
      </motion.button>
    </motion.section>
  );
};

export default UpcomingInterviews;
