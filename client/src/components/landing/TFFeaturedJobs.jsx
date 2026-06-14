import React from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../utils/animations";
import { featuredJobs } from "../../data/talentForgeData";

const TFFeaturedJobs = () => {
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
            <p className="text-sm uppercase tracking-[0.35em] text-indigo-600 font-semibold mb-3">
              Featured Opportunities
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
              Jobs curated for fast-moving talent
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
              Browse top roles from high-growth companies and discover your next career step with AI guidance.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid gap-6 lg:grid-cols-2">
            {featuredJobs.map((job) => (
              <motion.div
                key={job.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm text-indigo-600 font-semibold uppercase tracking-[0.2em] mb-2">
                      {job.type}
                    </p>
                    <h3 className="text-2xl font-bold text-slate-900">{job.title}</h3>
                    <p className="mt-3 text-slate-600">{job.company}</p>
                  </div>
                  <div className="rounded-3xl bg-white/80 border border-slate-200 p-4 text-slate-900 text-center">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Match</p>
                    <p className="text-2xl font-bold mt-1 text-indigo-600">{job.match}%</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 mb-6 text-sm text-slate-600">
                  <div className="inline-flex items-center gap-2">
                    <span className="text-indigo-600">📍</span>
                    {job.location}
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <span className="text-indigo-600">⏳</span>
                    {job.experience}
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed mb-6">{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-indigo-50 px-3 py-1 text-sm text-indigo-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-600">{job.company} • {job.salary}</span>
                  <button className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
                    View Job
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TFFeaturedJobs;
