import React from "react";
import { motion } from "framer-motion";
import { statistics } from "../../data/talentForgeData";
import { containerVariants, itemVariants } from "../../utils/animations";

const AnimatedCounter = ({ number, label }) => {
  const [displayNumber, setDisplayNumber] = React.useState(0);
  const [isInView, setIsInView] = React.useState(false);

  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isInView]);

  React.useEffect(() => {
    if (!isInView) return;

    let numericValue = 0;
    if (number === "500+") numericValue = 500;
    else if (number === "10,000+") numericValue = 10000;
    else if (number === "50,000+") numericValue = 50000;
    else if (number === "95%") numericValue = 95;

    let current = 0;
    const increment = numericValue / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
      }
      setDisplayNumber(Math.floor(current));
    }, 30);

    return () => clearInterval(timer);
  }, [isInView, number]);

  const formatDisplay = (num) => {
    if (number === "10,000+") {
      return num >= 10000
        ? "10,000+"
        : num >= 1000
        ? (num / 1000).toFixed(1) + "K+"
        : num + "+";
    } else if (number === "50,000+") {
      return num >= 50000
        ? "50,000+"
        : num >= 1000
        ? (num / 1000).toFixed(1) + "K+"
        : num + "+";
    } else if (number === "95%") {
      return num + "%";
    }
    return num + "+";
  };

  return (
    <div ref={ref}>
      <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        {formatDisplay(displayNumber)}
      </div>
      <p className="text-lg text-slate-600 font-semibold mt-3">{label}</p>
    </div>
  );
};

const TFStatistics = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-16"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Driving Real Results
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Join thousands of companies and job seekers transforming their
              hiring journey
            </p>
          </motion.div>

          {/* Statistics Grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-12"
          >
            {statistics.map((stat, index) => (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="inline-block"
                >
                  <AnimatedCounter
                    number={stat.number}
                    label={stat.label}
                  />
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="mt-6 h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto group-hover:w-20 transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TFStatistics;
