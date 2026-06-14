import React from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../utils/animations";
import { Sparkles, Linkedin, Github, Twitter } from "lucide-react";

const TFFooter = () => {
  const footerSections = [
    {
      title: "Product",
      links: ["Features", "ATS Analyzer", "Candidate Ranking", "Pricing"],
    },
    {
      title: "Company",
      links: ["About", "Careers", "Contact", "Blog"],
    },
    {
      title: "Resources",
      links: ["Documentation", "Support", "Community", "Status"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms & Conditions", "Cookie Policy"],
    },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-5 gap-12"
          >
            {/* Brand */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles size={18} className="text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  TalentForge AI
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                AI-powered recruitment platform connecting job seekers with
                their ideal opportunities.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-colors group"
                      aria-label={social.label}
                    >
                      <Icon size={18} className="group-hover:text-white" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <motion.div key={section.title} variants={itemVariants} className="space-y-4">
                <h4 className="text-white font-bold text-sm uppercase tracking-wider">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <motion.a
                        href="#"
                        whileHover={{ x: 4 }}
                        className="text-slate-400 hover:text-indigo-400 transition-colors text-sm"
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="my-12 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent origin-left"
          />

          {/* Bottom Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <motion.p variants={itemVariants} className="text-slate-400 text-sm">
              © 2026 TalentForge AI. All rights reserved.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex gap-6 text-sm text-slate-400"
            >
              <a href="#" className="hover:text-indigo-400 transition-colors">
                Privacy Policy
              </a>
              <span className="text-slate-600">•</span>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                Terms of Service
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default TFFooter;
