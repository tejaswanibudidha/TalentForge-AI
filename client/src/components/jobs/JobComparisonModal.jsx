import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, DollarSign, MapPin, Briefcase } from "lucide-react";

const JobComparisonModal = ({ isOpen, jobs = [], onClose }) => {
  if (jobs.length === 0) return null;

  const comparisonFields = [
    { label: "Salary", key: "salary", icon: DollarSign },
    { label: "Location", key: "location", icon: MapPin },
    { label: "Experience Level", key: "experience", icon: Briefcase },
    { label: "Job Type", key: "type", icon: Briefcase },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-200 bg-white">
              <h2 className="text-2xl font-bold text-slate-900">
                Compare {jobs.length} Jobs
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-100 transition"
              >
                <X size={24} className="text-slate-600" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="w-40 px-6 py-4 text-left font-semibold text-slate-900 bg-slate-50"></th>
                    {jobs.map((job) => (
                      <th
                        key={job.id}
                        className="w-64 px-6 py-4 text-left border-l border-slate-200 bg-gradient-to-b from-indigo-50 to-transparent"
                      >
                        <div className="space-y-1">
                          <p className="font-bold text-slate-900 text-lg">
                            {job.title}
                          </p>
                          <p className="text-sm text-slate-600">{job.company}</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFields.map((field) => {
                    const Icon = field.icon;
                    return (
                      <tr key={field.key} className="border-b border-slate-200">
                        <td className="px-6 py-4 font-semibold text-slate-900 bg-slate-50 flex items-center gap-2">
                          <Icon size={18} className="text-indigo-600" />
                          {field.label}
                        </td>
                        {jobs.map((job) => (
                          <td
                            key={`${job.id}-${field.key}`}
                            className="px-6 py-4 border-l border-slate-200 text-slate-700"
                          >
                            {job[field.key] || "Not specified"}
                          </td>
                        ))}
                      </tr>
                    );
                  })}

                  {/* Skills Row */}
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      Skills
                    </td>
                    {jobs.map((job) => (
                      <td
                        key={`${job.id}-skills`}
                        className="px-6 py-4 border-l border-slate-200"
                      >
                        <div className="flex flex-wrap gap-2">
                          {(Array.isArray(job.skills)
                            ? job.skills
                            : job.skills?.split(",") || []
                          ).map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Action Row */}
                  <tr>
                    <td className="px-6 py-6"></td>
                    {jobs.map((job) => (
                      <td
                        key={`${job.id}-action`}
                        className="px-6 py-6 border-l border-slate-200 text-center"
                      >
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => window.location.assign(`/apply/${job.id}`)}
                          className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-shadow"
                        >
                          Apply
                        </motion.button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default JobComparisonModal;
