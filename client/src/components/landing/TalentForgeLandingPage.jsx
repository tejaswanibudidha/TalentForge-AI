import React from "react";
import { motion } from "framer-motion";
import TFNavbar from "./TFNavbar";
import TFHeroSection from "./TFHeroSection";
import TFTrendingSkills from "./TFTrendingSkills";
import TFAICareerAssistant from "./TFAICareerAssistant";
import TFTrustedCompanies from "./TFTrustedCompanies";
import TFFeatures from "./TFFeatures";
import TFHowItWorks from "./TFHowItWorks";
import TFPlatformBenefits from "./TFPlatformBenefits";
import TFStatistics from "./TFStatistics";
import TFTestimonials from "./TFTestimonials";
import TFCTA from "./TFCTA";
import TFFooter from "./TFFooter";

const TalentForgeLandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white overflow-x-hidden"
    >
      {/* Navigation */}
      <TFNavbar />

      {/* Hero Section */}
      <TFHeroSection />

      {/* Trending Skills */}
      <TFTrendingSkills />

      {/* AI Career Assistant */}
      <TFAICareerAssistant />

      {/* Trusted Companies */}
      <TFTrustedCompanies />

      {/* Features */}
      <TFFeatures />

      {/* How It Works */}
      <TFHowItWorks />

      {/* Platform Benefits */}
      <TFPlatformBenefits />

      {/* Statistics */}
      <TFStatistics />

      {/* Testimonials */}
      <TFTestimonials />

      {/* CTA Section */}
      <TFCTA />

      {/* Footer */}
      <TFFooter />
    </motion.div>
  );
};

export default TalentForgeLandingPage;
