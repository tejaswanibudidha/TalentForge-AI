import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  fadeInUpVariants,
  containerVariants,
  itemVariants,
  hoverScale,
} from "../../utils/animations";
import { ArrowRight } from "lucide-react";

const TFHeroSection = () => {
  return (
    <div
      id="home"
      className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full border border-indigo-200/50"
            >
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-indigo-700">
                AI-Powered Talent Acquisition Platform
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
                <span>Forge Better</span>
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Careers.
                </span>
                <br />
                <span>Build Stronger</span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Teams.
                </span>
              </h1>
            </div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              TalentForge AI helps recruiters discover top talent and empowers
              job seekers to find the right opportunities through AI-driven
              resume analysis, ATS scoring, candidate ranking, and smart job
              matching.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
                <motion.div
                {...hoverScale}
                className="inline-flex"
              >
                <Link
                  to="/register"
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-indigo-500/30 transition-shadow flex items-center justify-center gap-2"
                >
                  Get Started
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right - AI Recruitment Illustration */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            {/* Background Blobs */}
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 -z-10"
            >
              <div className="absolute -top-10 -right-10 w-80 h-80 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-40"></div>
              <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full blur-3xl opacity-30"></div>
            </motion.div>

            {/* Main Illustration Image */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/40 bg-white"
            >
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop" 
                alt="AI Recruitment and Hiring Technology"
                className="w-full h-full object-cover"
              />
              
              {/* Floating Info Card */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-4 text-white shadow-lg"
              >
                <p className="text-xs font-semibold text-indigo-100 uppercase tracking-wider">AI Powered Matching</p>
                <p className="mt-2 text-2xl font-bold">92% Accuracy</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TFHeroSection;
