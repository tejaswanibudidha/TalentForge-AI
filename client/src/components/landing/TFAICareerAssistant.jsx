import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Star, ShieldCheck, Zap } from "lucide-react";
import { containerVariants, itemVariants } from "../../utils/animations";
import { aiAssistantFeatures } from "../../data/talentForgeData";

const iconMap = {
  ResumeAnalysis: CheckCircle2,
  ATSScoring: ShieldCheck,
  JobRecommendations: Star,
  SkillGapAnalysis: Zap,
};

const TFAICareerAssistant = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_40%)]"></div>
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300 font-semibold mb-4">
              AI Career Assistant
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              A smarter way to build resumes, score applications, and find your next role
            </h2>
            <p className="text-lg text-slate-200 max-w-3xl mx-auto mt-4">
              TalentForge AI helps both recruiters and candidates uncover hidden opportunities with explainable insights and intelligent career guidance.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {aiAssistantFeatures.map((feature) => {
              const Icon = iconMap[feature.icon];
              return (
                <motion.div
                  key={feature.id}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  className="group rounded-[2rem] bg-slate-950/90 border border-white/10 p-8 shadow-2xl shadow-black/20"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-3xl bg-cyan-500/15 text-cyan-300 mb-6">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-black/20">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-200 font-semibold">Insight Snapshot</p>
                <h3 className="text-3xl font-bold text-white">Make hiring and applications work faster.</h3>
              </div>
              <div className="space-y-4 text-slate-200">
                <p>Resume matches, ATS fit notes, and skill gaps displayed in one unified dashboard.</p>
                <p>Recommend higher-quality candidates and career moves with instantly generated insights.</p>
              </div>
              <div className="flex items-center justify-end">
                <button className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition">
                  Explore Assistant
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TFAICareerAssistant;
