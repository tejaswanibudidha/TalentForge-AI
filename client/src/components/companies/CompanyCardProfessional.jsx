import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Star,
  MapPin,
  Briefcase,
  Users,
  CheckCircle2,
  ArrowRight,
  Bookmark,
  BookmarkPlus,
} from "lucide-react";
import { Link } from "react-router-dom";

const CompanyCardProfessional = ({
  company,
  onSave,
  saved = false,
  openJobs = 0,
}) => {
  const [isSaved, setIsSaved] = useState(saved);

  const handleSave = () => {
    setIsSaved(!isSaved);
    if (onSave) onSave(company.id, !isSaved);
  };

  // Mock data for demonstration
  const rating = (Math.random() * 1.5 + 3.8).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 450) + 50;
  const isVerified = Math.random() > 0.3;
  const hiringStatus = ["Actively Hiring", "Actively Growing", "Hiring Selectively"][
    Math.floor(Math.random() * 3)
  ];
  const companySize = ["Startup (1-50)", "Scaleup (51-500)", "Mid-size (501-2000)", "Enterprise (2000+)"][
    Math.floor(Math.random() * 4)
  ];

  const hiringStatusColor = {
    "Actively Hiring": "from-emerald-100 to-emerald-50",
    "Actively Growing": "from-blue-100 to-blue-50",
    "Hiring Selectively": "from-amber-100 to-amber-50",
  };

  const hiringStatusBadgeColor = {
    "Actively Hiring": "bg-emerald-100 text-emerald-700",
    "Actively Growing": "bg-blue-100 text-blue-700",
    "Hiring Selectively": "bg-amber-100 text-amber-700",
  };

  const companyName = company.name || company.companyName || "Company";
  const industry = company.industry || "Technology";
  const location = company.locations?.[0] || company.hq || "Remote";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group rounded-[2rem] border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all h-full flex flex-col"
    >
      {/* Header with gradient background */}
      <div
        className={`bg-gradient-to-br ${
          hiringStatusColor[hiringStatus]
        } p-6 border-b border-slate-200 relative`}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          {/* Logo */}
          <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-4xl border border-slate-200">
            {company.logo || "🏢"}
          </div>

          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className={`p-2 rounded-lg transition ${
              isSaved
                ? "bg-indigo-100 text-indigo-600"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
            title={isSaved ? "Saved" : "Save company"}
          >
            {isSaved ? (
                <BookmarkPlus size={20} />
            ) : (
              <Bookmark size={20} />
            )}
          </motion.button>
        </div>

        {/* Company Name and Verification */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Link to={`/companies/${company.id}`}>
              <h3 className="text-2xl font-bold text-slate-900 hover:text-indigo-600 transition">
                {companyName}
              </h3>
            </Link>
            {isVerified && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold"
                title="Verified Recruiter"
              >
                <CheckCircle2 size={14} />
                <span>Verified</span>
              </motion.div>
            )}
          </div>
          <p className="text-slate-600 font-medium">{industry}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Rating and Reviews */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.floor(rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-300"
                }
              />
            ))}
          </div>
          <div>
            <span className="font-bold text-slate-900">{rating}</span>
            <span className="text-sm text-slate-600 ml-2">
              ({reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* Meta Information Grid */}
        <div className="grid gap-3 grid-cols-2 text-sm">
          {/* Location */}
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin size={18} className="text-indigo-600 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-[0.2em] font-semibold">
                Location
              </p>
              <p className="font-medium text-slate-900">{location}</p>
            </div>
          </div>

          {/* Company Size */}
          <div className="flex items-center gap-2 text-slate-600">
            <Users size={18} className="text-indigo-600 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-[0.2em] font-semibold">
                Size
              </p>
              <p className="font-medium text-slate-900">{companySize}</p>
            </div>
          </div>

          {/* Open Positions */}
          <div className="flex items-center gap-2 text-slate-600">
            <Briefcase size={18} className="text-indigo-600 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-[0.2em] font-semibold">
                Open Roles
              </p>
              <p className="font-medium text-slate-900">
                {openJobs} position{openJobs !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Hiring Status */}
          <div className={`rounded-lg ${hiringStatusBadgeColor[hiringStatus]} px-3 py-2 text-center`}>
            <p className="text-xs font-bold uppercase tracking-[0.2em]">
              {hiringStatus}
            </p>
          </div>
        </div>

        {/* Company Description */}
        {company.description && (
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
            {company.description}
          </p>
        )}
      </div>

      {/* Footer with CTA */}
      <div className="border-t border-slate-200 p-6 flex items-center justify-between gap-3">
        <div className="text-xs text-slate-500">
          {isVerified && (
            <span className="font-semibold text-emerald-700">✓ Recruiter Verified</span>
          )}
        </div>
        <Link to={`/companies/${company.id}`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-shadow text-sm"
          >
            Explore
            <ArrowRight size={16} />
          </motion.button>
        </Link>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-200/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </motion.div>
  );
};

export default CompanyCardProfessional;
