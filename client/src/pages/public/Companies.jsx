import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import api from "../../services/api";
import { containerVariants, itemVariants } from "../../utils/animations";
import CompanyFilters from "../../components/companies/CompanyFilters";
import CompanyCardProfessional from "../../components/companies/CompanyCardProfessional";
import { Search, Layout, LayoutGrid } from "lucide-react";

export default function Companies() {
  const { companies, jobs } = useData();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [availableCompanies, setAvailableCompanies] = useState(companies);
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [savedCompanies, setSavedCompanies] = useState({});
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const isApiConfigured = Boolean(import.meta.env.VITE_API_URL);

    async function loadCompanies() {
      if (isApiConfigured) {
        try {
          const response = await api.get('/companies');
          const fetchedCompanies = response?.data?.success ? response.data.data.companies : null;
          if (Array.isArray(fetchedCompanies)) {
            setAvailableCompanies(isAuthenticated ? fetchedCompanies : fetchedCompanies.slice(0, 5));
            return;
          }
        } catch (error) {
          // Fallback to local data below
        }
      }

      setAvailableCompanies(isAuthenticated ? companies : companies.slice(0, 5));
    }

    loadCompanies();
  }, [companies, isAuthenticated]);

  // Enrich companies with job counts
  const allCompanies = useMemo(() => {
    return availableCompanies.map((company) => ({
      ...company,
      openJobs: jobs.filter(
        (job) =>
          job.companyId === company.id || job.company === company.companyName || job.company === company.name
      ).length,
    }));
  }, [availableCompanies, jobs]);

  const filteredCompanies = useMemo(() => {
    return allCompanies.filter((company) => {
      // Search filter
      const companyName = (company.name || company.companyName || "").toLowerCase();
      const matchesSearch = search
        ? [companyName, (company.description || "").toLowerCase()]
            .join(" ")
            .includes(search.toLowerCase())
        : true;

      // Industry filter
      const matchesIndustry =
        selectedFilters.industry && selectedFilters.industry.length > 0
          ? selectedFilters.industry.some((ind) =>
              (company.industry || "Technology")
                .toLowerCase()
                .includes(ind.toLowerCase())
            )
          : true;

      // Location filter
      const matchesLocation =
        selectedFilters.location && selectedFilters.location.length > 0
          ? selectedFilters.location.some((loc) =>
              (company.hq || company.locations?.[0] || "Remote")
                .toLowerCase()
                .includes(loc.toLowerCase()) || loc.toLowerCase() === "remote"
            )
          : true;

      // Company Size filter (mock for now - would be from company data)
      const matchesCompanySize =
        selectedFilters.companySize && selectedFilters.companySize.length > 0
          ? true // Simplified - would need actual company size data
          : true;

      // Hiring Status filter (mock for now)
      const matchesHiringStatus =
        selectedFilters.hiringStatus && selectedFilters.hiringStatus.length > 0
          ? true // Simplified - would need actual hiring status tracking
          : true;

      return (
        matchesSearch &&
        matchesIndustry &&
        matchesLocation &&
        matchesCompanySize &&
        matchesHiringStatus
      );
    });
  }, [allCompanies, search, selectedFilters]);

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

  const handleAddToSaved = (companyId, isSaved) => {
    setSavedCompanies((prev) => ({
      ...prev,
      [companyId]: isSaved,
    }));
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
              Recruiter Network
            </p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Discover Top Hiring Companies
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Explore 500+ verified companies and make informed career decisions.
              Find roles at companies where you'll thrive, grow, and succeed.
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
                placeholder="Search by company name or industry..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-16 pr-6 py-4 rounded-full bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg font-medium"
              />
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3"
          >
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
          <CompanyFilters
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
                  Showing {filteredCompanies.length} of {allCompanies.length} companies
                </p>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  {filteredCompanies.length > 0
                    ? "Featured Companies"
                    : "No companies found"}
                </h2>
              </div>

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
            </motion.div>

            {/* Company Listings */}
            {!isAuthenticated && (
              <motion.div variants={itemVariants} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-center">
                <p className="text-lg font-semibold text-slate-900">
                  Login to explore all hiring companies and job opportunities.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition"
                >
                  Login
                </button>
              </motion.div>
            )}

            {filteredCompanies.length > 0 ? (
              <motion.div
                variants={containerVariants}
                className={`relative grid gap-6 ${
                  viewMode === "grid"
                    ? "lg:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {filteredCompanies.map((company) => (
                  <motion.div
                    key={company.id}
                    variants={itemVariants}
                  >
                    <CompanyCardProfessional
                      company={company}
                      onSave={handleAddToSaved}
                      saved={savedCompanies[company.id] || false}
                      openJobs={company.openJobs}
                    />
                  </motion.div>
                ))}

                {!isAuthenticated && filteredCompanies.length >= 6 && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 rounded-[2rem] bg-white/90 backdrop-blur-sm border-t border-slate-200 flex items-center justify-center px-6">
                    <div className="text-center">
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                        Login to unlock all companies.
                      </p>
                      <p className="mt-2 text-base text-slate-700">
                        Unlock the full hiring network and discover more opportunities.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                variants={itemVariants}
                className="rounded-[2rem] border-2 border-dashed border-slate-300 bg-white p-12 text-center"
              >
                <div className="space-y-4">
                  <p className="text-6xl">🔍</p>
                  <h3 className="text-2xl font-bold text-slate-900">
                    No companies found
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto">
                    Try adjusting your filters or search query to find more
                    companies.
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

          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
