import React from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../utils/animations";
import { Sparkles } from "lucide-react";
import { trendingSkills } from "../../data/talentForgeData";

const TFTrendingSkills = () => {
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
              <Sparkles size={18} /> Trending Skills
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
              Skills recruiters are looking for right now
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
              Discover the most in-demand skills and tailor your profile to stand out with AI-informed recommendations.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {trendingSkills.map((skill) => (
              <motion.div
                key={skill.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="text-3xl">{skill.emoji}</div>
                  <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-sm font-semibold">
                    {skill.demand}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {skill.name}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TFTrendingSkills;
