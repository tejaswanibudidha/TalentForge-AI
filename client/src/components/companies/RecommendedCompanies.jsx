import React, { useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../utils/animations";
import { Sparkles, Zap, Building2 } from "lucide-react";
import CompanyCardProfessional from "./CompanyCardProfessional";

const RecommendedCompanies = ({ companies = [], jobs = [] }) => {
  const [savedCompanies, setSavedCompanies] = useState({});

  const handleSaveCompany = (companyId, isSaved) => {
    setSavedCompanies((prev) => ({
      ...prev,
      [companyId]: isSaved,
    }));
  };

  // Get company job counts
  const getCompanyJobCount = (companyId, companyName) => {
    return jobs.filter(
      (job) => job.companyId === companyId || job.company === companyName
    ).length;
  };

  // Simulate recommended companies (actively hiring, high ratings)
  const recommendedCompanies = companies
    .filter(() => Math.random() > 0.4) // Show ~60% of companies as recommended
    .map((company) => ({
      ...company,
      matchScore: Math.floor(Math.random() * 20) + 80,
      reason: [
        "Actively hiring in your field",
        "Highly rated by employees",
        "Great career growth",
        "Matching your preferences",
      ][Math.floor(Math.random() * 4)],
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 4);

  if (recommendedCompanies.length === 0) return null;

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-2">
            <Sparkles className="text-indigo-600" size={32} />
            Recommended Companies
          </h2>
          <p className="text-slate-600">
            AI-curated companies based on your profile and career preferences
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm">
          <Zap size={16} />
          AI Powered
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid gap-6 lg:grid-cols-2"
      >
        {recommendedCompanies.map((company, idx) => (
          <motion.div
            key={company.id}
            variants={itemVariants}
            className="relative"
          >
            {/* Recommendation Badge */}
            <div className="absolute -top-3 left-6 z-10">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-[0.15em]"
              >
                <Building2 size={12} />
                {company.reason}
              </motion.div>
            </div>

            <CompanyCardProfessional
              company={company}
              onSave={handleSaveCompany}
              saved={savedCompanies[company.id] || false}
              openJobs={getCompanyJobCount(company.id, company.name || company.companyName)}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default RecommendedCompanies;
