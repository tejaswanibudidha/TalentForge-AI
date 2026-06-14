import React from "react";
import { motion } from "framer-motion";
import { testimonials } from "../../data/talentForgeData";
import { containerVariants, itemVariants } from "../../utils/animations";
import { Star } from "lucide-react";

const TFTestimonials = () => {
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
              Loved by Users Worldwide
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See what recruiters and job seekers have to say about TalentForge
              AI
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-2xl border border-slate-200/50 p-8 hover:border-indigo-200/50 transition-all duration-300 shadow-md hover:shadow-xl"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

                {/* Quote Mark */}
                <div className="text-5xl text-indigo-200 font-serif mb-4">
                  "
                </div>

                {/* Review Text */}
                <p className="text-slate-700 leading-relaxed mb-6 h-24">
                  {testimonial.review}
                </p>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                    >
                      <Star
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-200/50">
                  <div className="text-3xl">{testimonial.image}</div>
                  <div>
                    <p className="font-bold text-slate-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-slate-600">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-indigo-600 font-semibold">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center pt-8"
          >
            <p className="text-slate-600 mb-6">
              Join thousands of satisfied users already using TalentForge AI
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-shadow"
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TFTestimonials;
