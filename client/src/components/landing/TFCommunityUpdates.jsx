import React from "react";
import { motion } from "framer-motion";
import { Megaphone, CalendarDays, Sparkles } from "lucide-react";
import { containerVariants, itemVariants } from "../../utils/animations";
import { communityUpdates } from "../../data/talentForgeData";

const TFCommunityUpdates = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
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
              <Megaphone size={18} /> Community Updates
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
              Stay informed with the latest hiring trends and success stories
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
              Keep up with new features, candidate wins, and recruiter best practices curated by our community.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid gap-6 lg:grid-cols-3">
            {communityUpdates.map((update) => (
              <motion.div
                key={update.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-3 border border-slate-200 mb-6">
                  <div className="w-10 h-10 grid place-items-center rounded-3xl bg-indigo-600 text-white">
                    {update.icon}
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">{update.category}</p>
                    <p className="text-xs text-slate-400">{update.date}</p>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">{update.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{update.summary}</p>
                <div className="flex items-center justify-between text-sm text-indigo-600 font-semibold">
                  <span>Read more</span>
                  <CalendarDays size={16} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TFCommunityUpdates;
