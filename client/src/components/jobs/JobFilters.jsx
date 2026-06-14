import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Filter,
  MapPin,
  DollarSign,
  Briefcase,
  Building2,
  X,
} from "lucide-react";

const JobFilters = ({
  selectedFilters,
  onFilterChange,
  onClearFilters,
  isOpen,
  onToggle,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    skills: true,
    salary: true,
    experience: true,
    location: true,
    jobType: true,
    companyType: true,
  });

  const filters = {
    skills: [
      "React",
      "Python",
      "Node.js",
      "AWS",
      "Machine Learning",
      "TypeScript",
      "Docker",
      "PostgreSQL",
    ],
    salary: [
      "₹8-15 LPA",
      "₹15-25 LPA",
      "₹25-40 LPA",
      "₹40-60 LPA",
      "₹60+ LPA",
    ],
    experience: ["Fresher", "0-2 years", "2-5 years", "5-10 years", "10+ years"],
    location: [
      "Remote",
      "Bengaluru",
      "Mumbai",
      "Delhi",
      "Hyderabad",
      "Pune",
      "Gurgaon",
    ],
    jobType: ["Full-time", "Contract", "Internship", "Part-time"],
    companyType: ["Startup", "Scaleup", "MNC", "Established"],
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterToggle = (category, value) => {
    const current = selectedFilters[category] || [];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    onFilterChange(category, updated);
  };

  const FilterSection = ({ title, icon: Icon, category, items }) => (
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        onClick={() => toggleSection(category)}
        className="w-full flex items-center justify-between py-4 hover:bg-slate-50 transition"
      >
        <div className="flex items-center gap-3">
          <Icon size={18} className="text-indigo-600" />
          <span className="font-semibold text-slate-900">{title}</span>
        </div>
        <motion.div
          animate={{ rotate: expandedSections[category] ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} className="text-slate-600" />
        </motion.div>
      </button>

      <motion.div
        animate={{ height: expandedSections[category] ? "auto" : 0 }}
        initial={{ height: 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="space-y-3 pb-4 px-2">
          {items.map((item) => (
            <label key={item} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(selectedFilters[category] || []).includes(item)}
                onChange={() => handleFilterToggle(category, item)}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600"
              />
              <span className="text-sm text-slate-700 flex-1">{item}</span>
              <span className="text-xs text-slate-500">
                {Math.floor(Math.random() * 100) + 5}
              </span>
            </label>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const activeFilterCount = Object.values(selectedFilters).reduce(
    (sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0),
    0
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden flex items-center justify-between mb-6">
        <button
          onClick={onToggle}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white font-semibold text-slate-900 hover:bg-slate-50 transition"
        >
          <Filter size={18} />
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
      </div>

      {/* Filter Panel */}
      <motion.div
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -400 }}
        initial={{ opacity: 0, x: -400 }}
        transition={{ duration: 0.3 }}
        className={`fixed lg:relative inset-y-0 left-0 z-40 w-80 lg:w-full bg-white border-r border-slate-200 overflow-y-auto max-h-screen lg:max-h-none ${
          isOpen ? "block" : "hidden lg:block"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 lg:p-0 flex items-center justify-between lg:hidden">
          <h3 className="font-bold text-slate-900">Filters</h3>
          <button onClick={onToggle} className="p-2 hover:bg-slate-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-2">
          {/* Skills */}
          <FilterSection
            title="Skills"
            icon={Briefcase}
            category="skills"
            items={filters.skills}
          />

          {/* Salary */}
          <FilterSection
            title="Salary Range"
            icon={DollarSign}
            category="salary"
            items={filters.salary}
          />

          {/* Experience */}
          <FilterSection
            title="Experience Level"
            icon={Briefcase}
            category="experience"
            items={filters.experience}
          />

          {/* Location */}
          <FilterSection
            title="Location"
            icon={MapPin}
            category="location"
            items={filters.location}
          />

          {/* Job Type */}
          <FilterSection
            title="Job Type"
            icon={Briefcase}
            category="jobType"
            items={filters.jobType}
          />

          {/* Company Type */}
          <FilterSection
            title="Company Type"
            icon={Building2}
            category="companyType"
            items={filters.companyType}
          />

          {/* Clear Button */}
          {activeFilterCount > 0 && (
            <button
              onClick={onClearFilters}
              className="w-full mt-6 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </motion.div>

      {/* Overlay */}
      {isOpen && (
        <motion.div
          onClick={onToggle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
        />
      )}
    </>
  );
};

export default JobFilters;
