import React from "react";
import { motion } from "framer-motion";
import { trustedCompanies } from "../../data/talentForgeData";
import { containerVariants, itemVariants } from "../../utils/animations";

const TFTrustedCompanies = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-12"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Trusted by Leading Organizations
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Join hundreds of companies already using TalentForge AI to
              revolutionize their hiring process
            </p>
          </motion.div>

          {/* Companies Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {trustedCompanies.map((company) => (
              <motion.div
                key={company.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="flex items-center justify-center h-24 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200/50 hover:border-indigo-200 transition-colors group cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                    {company.logo}
                  </div>
                  <p className="text-sm font-semibold text-slate-600 group-hover:text-indigo-600 transition-colors">
                    {company.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TFTrustedCompanies;
