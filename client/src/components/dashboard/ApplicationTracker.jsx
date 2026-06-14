import React, { useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../utils/animations";
import { CheckCircle2, Clock, AlertCircle, MessageSquare } from "lucide-react";

const ApplicationTracker = () => {
  const [applications] = useState([
    {
      id: 1,
      jobTitle: "Senior Full Stack Engineer",
      company: "TechVenture Labs",
      appliedDate: "2024-06-10",
      status: "Interview Scheduled",
      statusColor: "bg-blue-100 text-blue-700",
      timeline: [
        { event: "Application Submitted", date: "2024-06-10", completed: true },
        { event: "Application Viewed", date: "2024-06-11", completed: true },
        { event: "Interview Scheduled", date: "2024-06-15", completed: true },
        { event: "Final Decision", date: "2024-06-22", completed: false },
      ],
    },
    {
      id: 2,
      jobTitle: "AI/ML Engineer",
      company: "DataFlow Inc.",
      appliedDate: "2024-06-08",
      status: "Under Review",
      statusColor: "bg-amber-100 text-amber-700",
      timeline: [
        { event: "Application Submitted", date: "2024-06-08", completed: true },
        { event: "Application Viewed", date: "2024-06-09", completed: true },
        { event: "Technical Assessment", date: "2024-06-18", completed: false },
        { event: "Interview Round", date: "2024-06-25", completed: false },
      ],
    },
    {
      id: 3,
      jobTitle: "Frontend Developer",
      company: "StartupHub",
      appliedDate: "2024-06-05",
      status: "Rejected",
      statusColor: "bg-red-100 text-red-700",
      timeline: [
        { event: "Application Submitted", date: "2024-06-05", completed: true },
        { event: "Application Viewed", date: "2024-06-06", completed: true },
        { event: "Rejection", date: "2024-06-12", completed: true },
      ],
    },
  ]);

  const StatusIcon = ({ status }) => {
    if (status === "Interview Scheduled")
      return <CheckCircle2 size={20} className="text-blue-600" />;
    if (status === "Under Review")
      return <Clock size={20} className="text-amber-600" />;
    if (status === "Rejected")
      return <AlertCircle size={20} className="text-red-600" />;
    return <MessageSquare size={20} className="text-slate-600" />;
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Application Tracking Timeline
        </h2>
        <p className="text-slate-600">
          Monitor the status of every job application and stay informed every step of the way
        </p>
      </motion.div>

      <motion.div variants={containerVariants} className="space-y-6">
        {applications.map((app) => (
          <motion.div
            key={app.id}
            variants={itemVariants}
            className="rounded-[2rem] border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-50 to-white p-8 border-b border-slate-200">
              <div className="flex items-start justify-between gap-6 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">
                    {app.jobTitle}
                  </h3>
                  <p className="text-slate-600">{app.company}</p>
                </div>
                <div className={`rounded-full px-4 py-2 font-semibold text-sm inline-flex items-center gap-2 ${app.statusColor}`}>
                  <StatusIcon status={app.status} />
                  {app.status}
                </div>
              </div>
              <p className="text-sm text-slate-500">
                Applied on {new Date(app.appliedDate).toLocaleDateString()}
              </p>
            </div>

            {/* Timeline */}
            <div className="p-8">
              <div className="space-y-6">
                {app.timeline.map((event, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`w-5 h-5 rounded-full border-3 flex items-center justify-center ${
                          event.completed
                            ? "bg-indigo-600 border-indigo-600"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {event.completed && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </motion.div>
                      {idx < app.timeline.length - 1 && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 80 }}
                          transition={{ delay: idx * 0.1 + 0.2 }}
                          className={`w-1 my-2 ${
                            event.completed ? "bg-indigo-600" : "bg-slate-200"
                          }`}
                        />
                      )}
                    </div>
                    <div className="pt-1 flex-1">
                      <p className="font-semibold text-slate-900">
                        {event.event}
                      </p>
                      <p className="text-sm text-slate-500">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ApplicationTracker;
