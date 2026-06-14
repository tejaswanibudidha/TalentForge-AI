import React from "react";
import { motion } from "framer-motion";
import { platformBenefits } from "../../data/talentForgeData";
import { containerVariants, itemVariants } from "../../utils/animations";
import { X, Check } from "lucide-react";

const TFPlatformBenefits = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-200/25 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/2 left-1/3 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-16"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Why TalentForge AI?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See how we revolutionize traditional hiring with intelligent automation
            </p>
          </motion.div>

          {/* Comparison Cards */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Traditional Hiring */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200/50 p-8 md:p-12"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-8">
                Traditional Hiring
              </h3>
              <div className="space-y-4">
                {platformBenefits.traditional.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1">
                      <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <X size={16} className="text-red-600" />
                      </div>
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed">
                      {benefit}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* TalentForge AI */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 rounded-2xl border-2 border-indigo-200/50 p-8 md:p-12 relative shadow-xl"
            >
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-full">
                Recommended
              </div>

              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
                TalentForge AI
              </h3>
              <div className="space-y-4">
                {platformBenefits.talentForge.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check size={16} className="text-green-600" />
                      </div>
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed">
                      {benefit}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-10 w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-shadow"
              >
                Start Free Trial
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TFPlatformBenefits;
