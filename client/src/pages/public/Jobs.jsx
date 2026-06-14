import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import { containerVariants, itemVariants } from "../../utils/animations";
import JobFilters from "../../components/jobs/JobFilters";
import JobCardProfessional from "../../components/jobs/JobCardProfessional";
import RecommendedJobs from "../../components/jobs/RecommendedJobs";
import JobComparisonModal from "../../components/jobs/JobComparisonModal";
import { Search, Layout, LayoutGrid, MapPin, DollarSign } from "lucide-react";

export default function Jobs() {
  const { jobs } = useData();
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [savedJobs, setSavedJobs] = useState({});
  const [comparisonJobs, setComparisonJobs] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search filter
      const matchesSearch = search
        ? [job.title, job.company, job.description]
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
        : true;

      // Skills filter
      const matchesSkills =
        selectedFilters.skills && selectedFilters.skills.length > 0
          ? selectedFilters.skills.some((skill) =>
              (job.skills || "").toLowerCase().includes(skill.toLowerCase())
            )
          : true;

      // Location filter
      const matchesLocation =
        selectedFilters.location && selectedFilters.location.length > 0
          ? selectedFilters.location.some((loc) =>
              job.location?.toLowerCase().includes(loc.toLowerCase()) ||
              loc.toLowerCase() === "remote"
            )
          : true;

      // Salary filter
      const matchesSalary =
        selectedFilters.salary && selectedFilters.salary.length > 0
          ? selectedFilters.salary.some((range) =>
              (job.salary || "").includes(range)
            )
          : true;

      // Experience filter
      const matchesExperience =
        selectedFilters.experience && selectedFilters.experience.length > 0
          ? selectedFilters.experience.some((exp) =>
              (job.experience || "").toLowerCase().includes(exp.toLowerCase())
            )
          : true;

      // Job Type filter
      const matchesJobType =
        selectedFilters.jobType && selectedFilters.jobType.length > 0
          ? selectedFilters.jobType.some((type) =>
              (job.type || "Full-time")
                .toLowerCase()
                .includes(type.toLowerCase())
            )
          : true;

      // Company Type filter
      const matchesCompanyType =
        selectedFilters.companyType && selectedFilters.companyType.length > 0
          ? selectedFilters.companyType.some((type) =>
              (job.companyType || "Startup")
                .toLowerCase()
                .includes(type.toLowerCase())
            )
          : true;

      return (
        matchesSearch &&
        matchesSkills &&
        matchesLocation &&
        matchesSalary &&
        matchesExperience &&
        matchesJobType &&
        matchesCompanyType
      );
    });
  }, [jobs, search, selectedFilters]);

  const handleFilterChange = (category, values) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: values,
    }));
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
    setSearch("");
  };

  const handleAddToComparison = (job) => {
    if (comparisonJobs.find((j) => j.id === job.id)) {
      setComparisonJobs(comparisonJobs.filter((j) => j.id !== job.id));
    } else if (comparisonJobs.length < 3) {
      setComparisonJobs([...comparisonJobs, job]);
    }
  };

  const activeFilterCount = Object.values(selectedFilters).reduce(
    (sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white px-4 py-16 md:py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.3),_transparent_50%)]"></div>

        <div className="mx-auto max-w-7xl relative z-10 space-y-8">
          <motion.div variants={itemVariants} className="space-y-4 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-white/80 font-bold">
              Career Marketplace
            </p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Find Your Next Opportunity
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Discover AI-curated jobs tailored to your skills, experience, and
              career goals. Search across 10,000+ roles from top companies.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            variants={itemVariants}
            className="relative max-w-3xl"
          >
            <div className="relative flex items-center">
              <Search
                size={24}
                className="absolute left-6 text-white/70 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search by job title, company, or skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-16 pr-6 py-4 rounded-full bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg font-medium"
              />
            </div>
          </motion.div>

          {/* Quick Filters */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/30">
              <MapPin size={18} />
              <span className="text-sm font-semibold">All Locations</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/30">
              <DollarSign size={18} />
              <span className="text-sm font-semibold">All Salaries</span>
            </div>
            {activeFilterCount > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleClearFilters}
                className="px-4 py-2 rounded-full bg-white text-indigo-600 font-semibold hover:bg-slate-100 transition"
              >
                Clear {activeFilterCount} filters
              </motion.button>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 lg:grid-cols-[320px_1fr]"
        >
          {/* Sidebar Filters */}
          <JobFilters
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            isOpen={filterPanelOpen}
            onToggle={() => setFilterPanelOpen(!filterPanelOpen)}
          />

          {/* Main Content Area */}
          <motion.div variants={containerVariants} className="space-y-12">
            {/* Results Header */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-slate-600 font-medium">
                  Showing {filteredJobs.length} of {jobs.length} jobs
                </p>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  {filteredJobs.length > 0
                    ? "Available Positions"
                    : "No jobs found"}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                {comparisonJobs.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowComparison(true)}
                    className="px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 font-semibold hover:bg-indigo-200 transition"
                  >
                    Compare ({comparisonJobs.length})
                  </motion.button>
                )}

                <div className="hidden sm:flex items-center gap-2 border border-slate-200 rounded-lg bg-white p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded transition ${
                      viewMode === "grid"
                        ? "bg-indigo-600 text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <LayoutGrid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded transition ${
                      viewMode === "list"
                        ? "bg-indigo-600 text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Layout size={20} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Job Listings */}
            {filteredJobs.length > 0 ? (
              <motion.div
                variants={containerVariants}
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "lg:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {filteredJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    variants={itemVariants}
                    className="relative"
                  >
                    {comparisonJobs.find((j) => j.id === job.id) && (
                      <div className="absolute -top-3 -right-3 z-10">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                          ✓
                        </div>
                      </div>
                    )}
                    <JobCardProfessional
                      job={job}
                      onSave={() => handleAddToComparison(job)}
                      saved={comparisonJobs.some((j) => j.id === job.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                variants={itemVariants}
                className="rounded-[2rem] border-2 border-dashed border-slate-300 bg-white p-12 text-center"
              >
                <div className="space-y-4">
                  <p className="text-6xl">🔍</p>
                  <h3 className="text-2xl font-bold text-slate-900">
                    No jobs found
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto">
                    Try adjusting your filters or search query to find more
                    relevant positions.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={handleClearFilters}
                    className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition inline-block"
                  >
                    Clear All Filters
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Recommended Jobs Section */}
            {filteredJobs.length > 0 && (
              <RecommendedJobs jobs={filteredJobs.slice(0, 8)} />
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Comparison Modal */}
      <JobComparisonModal
        isOpen={showComparison}
        jobs={comparisonJobs}
        onClose={() => setShowComparison(false)}
      />
    </div>
  );
}
