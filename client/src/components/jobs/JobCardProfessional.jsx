import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Share2,
  ArrowRight,
  MapPin,
  DollarSign,
  Clock,
  Users,
  Zap,
  Bookmark,
  BookmarkPlus,
} from "lucide-react";
import { Link } from "react-router-dom";

const JobCardProfessional = ({ job, onSave, saved = false }) => {
  const [isSaved, setIsSaved] = useState(saved);
  const [showCompare, setShowCompare] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    if (onSave) onSave(job.id, !isSaved);
  };

  const daysAgo = Math.floor(Math.random() * 7) + 1;
  const applicants = Math.floor(Math.random() * 50) + 5;
  const matchScore = Math.floor(Math.random() * 25) + 75;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm hover:shadow-2xl transition-all overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex-1">
          <Link to={`/jobs/${job.id}`}>
            <h3 className="text-2xl font-bold text-slate-900 hover:text-indigo-600 transition mb-2">
              {job.title}
            </h3>
          </Link>
          <p className="text-slate-600 font-semibold">{job.company}</p>
        </div>

        {/* Match Badge */}
        {matchScore && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 px-4 py-2 text-right"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-600 font-bold">
              Match
            </p>
            <p className="text-2xl font-bold text-indigo-700">{matchScore}%</p>
          </motion.div>
        )}
      </div>

      {/* Meta Info */}
      <div className="grid gap-3 sm:grid-cols-2 mb-6 pb-6 border-b border-slate-200">
        {job.location && (
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin size={18} className="text-indigo-600 flex-shrink-0" />
            <span className="text-sm font-medium">{job.location}</span>
          </div>
        )}

        {job.salary && (
          <div className="flex items-center gap-2 text-slate-600">
            <DollarSign size={18} className="text-indigo-600 flex-shrink-0" />
            <span className="text-sm font-medium">{job.salary}</span>
          </div>
        )}

        {job.experience && (
          <div className="flex items-center gap-2 text-slate-600">
            <Zap size={18} className="text-indigo-600 flex-shrink-0" />
            <span className="text-sm font-medium">{job.experience}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-slate-600">
          <Clock size={18} className="text-indigo-600 flex-shrink-0" />
          <span className="text-sm font-medium">Posted {daysAgo}d ago</span>
        </div>
      </div>

      {/* Skills */}
      {job.skills && (
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-600 font-semibold mb-3">
            Required Skills
          </p>
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(job.skills) ? job.skills : job.skills.split(",")).map(
              (skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700"
                >
                  {skill.trim()}
                </span>
              )
            )}
          </div>
        </div>
      )}

      {/* Stats and Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-1">
            <Users size={16} className="text-indigo-600" />
            <span className="font-semibold">{applicants} applied</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className={`p-2 rounded-lg transition ${
              isSaved
                ? "bg-indigo-100 text-indigo-600"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
            title={isSaved ? "Saved" : "Save job"}
          >
            {isSaved ? (
              <BookmarkPlus size={20} />
            ) : (
              <Bookmark size={20} />
            )}
          </motion.button>

          {/* View Job Button */}
          <Link to={`/jobs/${job.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-shadow"
            >
              Apply Now
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-200/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </motion.div>
  );
};

export default JobCardProfessional;
