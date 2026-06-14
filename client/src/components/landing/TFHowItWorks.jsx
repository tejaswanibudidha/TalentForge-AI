import React from "react";
import { motion } from "framer-motion";
import {
  recruiterSteps,
  jobSeekerSteps,
} from "../../data/talentForgeData";
import { containerVariants, itemVariants } from "../../utils/animations";
import {
  Building2,
  User,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const TFHowItWorks = () => {
  const [activeTab, setActiveTab] = React.useState("recruiter");

  const steps = activeTab === "recruiter" ? recruiterSteps : jobSeekerSteps;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
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
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Simple, streamlined workflows designed for both recruiters and job
              seekers
            </p>
          </motion.div>

          {/* Tab Selector */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-4"
          >
            {[
              { id: "recruiter", label: "For Recruiters", icon: Building2 },
              { id: "seeker", label: "For Job Seekers", icon: User },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setActiveTab(tab.id === "recruiter" ? "recruiter" : "seeker")
                  }
                  className={`px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Steps Timeline */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex gap-6 md:gap-8 group"
              >
                {/* Step Number and Line */}
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-indigo-500/30 transition-shadow z-10"
                  >
                    {step.step}
                  </motion.div>
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 120 }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                      className="w-1 bg-gradient-to-b from-indigo-500 to-purple-500 my-4"
                    />
                  )}
                </div>

                {/* Content */}
                <motion.div
                  whileHover={{ x: 8 }}
                  className="pt-1 pb-8 flex-1 group-hover:translate-x-2 transition-transform"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>

                {/* Arrow Icon */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="hidden lg:flex items-center text-indigo-500 group-hover:text-indigo-600 group-hover:translate-x-2 transition-all"
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Success Checkmark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 border border-green-200 rounded-full">
              <CheckCircle2 size={20} className="text-green-600" />
              <span className="text-green-700 font-semibold">
                Get started in minutes
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TFHowItWorks;
