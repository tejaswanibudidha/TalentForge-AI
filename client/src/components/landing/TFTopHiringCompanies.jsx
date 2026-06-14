import React from "react";
import { motion } from "framer-motion";
import { Building2, Globe2, Briefcase, Sparkles } from "lucide-react";
import { containerVariants, itemVariants } from "../../utils/animations";
import { topHiringCompanies } from "../../data/talentForgeData";

const TFTopHiringCompanies = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-10"
        >
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold mb-4">
              <Building2 size={18} /> Hiring Companies
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
              Top recruiters actively sourcing on TalentForge AI
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
              Explore the people-first companies that are hiring fast and scaling with smart talent decisions.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid gap-6 lg:grid-cols-3">
            {topHiringCompanies.map((company) => (
              <motion.div
                key={company.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-4xl mb-3">{company.logo}</div>
                    <h3 className="text-2xl font-bold text-slate-900">{company.name}</h3>
                  </div>
                  <div className="rounded-3xl bg-indigo-50 px-4 py-2 text-indigo-700 text-sm font-semibold">
                    {company.openings} Openings
                  </div>
                </div>
                <p className="text-slate-600 mb-6">{company.description}</p>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} className="text-indigo-500" /> {company.focus}
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe2 size={16} className="text-indigo-500" /> {company.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-indigo-500" /> {company.culture}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TFTopHiringCompanies;
