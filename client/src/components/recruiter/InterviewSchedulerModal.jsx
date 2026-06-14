import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, MapPin } from "lucide-react";

const InterviewSchedulerModal = ({ isOpen, candidate, onClose, onSchedule }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "02:00 PM",
    type: "Technical",
    mode: "Video Call",
    notes: "",
  });

  const interviewTypes = ["Technical", "HR Round", "Final Round", "Screening"];
  const modes = ["Video Call", "In-person", "Phone Call"];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSchedule(formData);
    setFormData({
      date: "",
      time: "02:00 PM",
      type: "Technical",
      mode: "Video Call",
      notes: "",
    });
  };

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
            className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Schedule Interview
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  with {candidate.name}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-100 transition"
              >
                <X size={24} className="text-slate-600" />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  <Calendar size={16} className="inline mr-2" />
                  Interview Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  <Clock size={16} className="inline mr-2" />
                  Time
                </label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              {/* Interview Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Interview Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {interviewTypes.map((type) => (
                    <motion.button
                      key={type}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setFormData({ ...formData, type })}
                      className={`px-4 py-3 rounded-lg font-semibold transition ${
                        formData.type === type
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {type}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Mode */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  <MapPin size={16} className="inline mr-2" />
                  Interview Mode
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {modes.map((mode) => (
                    <motion.button
                      key={mode}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setFormData({ ...formData, mode })}
                      className={`px-4 py-3 rounded-lg font-semibold transition ${
                        formData.mode === mode
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {mode}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Interview Notes (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Add any notes for the interview..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-lg bg-slate-200 text-slate-900 font-semibold hover:bg-slate-300 transition"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-shadow"
                >
                  Schedule Interview
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InterviewSchedulerModal;
