import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Download, CheckCircle2, XCircle, Calendar } from "lucide-react";

const ResumeViewerModal = ({ isOpen, candidate, onClose }) => {
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
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-200 bg-white z-10">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {candidate.name}
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  {candidate.role || "Software Engineer"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-100 transition"
              >
                <X size={24} className="text-slate-600" />
              </button>
            </div>

            {/* Resume Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-3xl mx-auto space-y-6">
                {/* Contact Info */}
                <section>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    Contact Information
                  </h3>
                  <div className="grid gap-3 text-sm text-slate-600">
                    <div>
                      <span className="font-semibold text-slate-900">Email:</span>{" "}
                      {candidate.email || "candidate@example.com"}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900">Phone:</span>{" "}
                      {candidate.phone || "+91 98XXXX XXXX"}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900">Location:</span>{" "}
                      {candidate.location || "Bengaluru, India"}
                    </div>
                  </div>
                </section>

                {/* Professional Summary */}
                <section>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    Professional Summary
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {candidate.summary ||
                      "Experienced software engineer with strong expertise in full-stack development, cloud technologies, and system design. Proven track record of building scalable applications and leading technical initiatives."}
                  </p>
                </section>

                {/* Experience */}
                <section>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    Experience
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Senior Full Stack Engineer",
                        company: "Tech Company",
                        duration: "2022 - Present",
                      },
                      {
                        title: "Full Stack Engineer",
                        company: "Previous Company",
                        duration: "2020 - 2022",
                      },
                      {
                        title: "Junior Developer",
                        company: "First Company",
                        duration: "2018 - 2020",
                      },
                    ].map((exp, idx) => (
                      <div key={idx} className="border-l-2 border-indigo-600 pl-4">
                        <h4 className="font-semibold text-slate-900">
                          {exp.title}
                        </h4>
                        <p className="text-sm text-slate-600">{exp.company}</p>
                        <p className="text-xs text-slate-500 mt-1">{exp.duration}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Skills */}
                <section>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(candidate.skills || [
                      "React",
                      "Node.js",
                      "TypeScript",
                      "AWS",
                      "Docker",
                      "System Design",
                    ]).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Education */}
                <section>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    Education
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        B.Tech in Computer Science
                      </h4>
                      <p className="text-sm text-slate-600">
                        Top Engineering College
                      </p>
                      <p className="text-xs text-slate-500">2018</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 flex items-center justify-end gap-3 p-6 border-t border-slate-200 bg-white">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-indigo-300 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
              >
                <Download size={18} />
                Download Resume
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-6 py-3 rounded-lg bg-slate-200 text-slate-900 font-semibold hover:bg-slate-300 transition"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResumeViewerModal;
