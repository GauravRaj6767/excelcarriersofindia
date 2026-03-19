import { motion } from "framer-motion";
import { STATS, COMPANY } from "../../../lib/constants";
import { GlassCard } from "../../ui/GlassCard";
import { AnimatedCounter } from "../../ui/AnimatedCounter";
import { FloatingOrb } from "../../ui/FloatingOrb";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 lg:py-32">
      <FloatingOrb
        color="rgba(108,99,255,0.08)"
        size={400}
        top="20%"
        right="-10%"
        delay={1}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <span className="font-heading text-sm font-semibold tracking-widest text-brand-primary uppercase">
            About Us
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-text-main sm:text-4xl lg:text-5xl">
            Powering India's logistics{" "}
            <span className="bg-gradient-to-r from-brand-accent to-brand-gold bg-clip-text text-transparent">
              since 2007
            </span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-text-muted">
            Founded by {COMPANY.proprietor}, {COMPANY.name} has grown from a
            regional carrier into a pan-India logistics powerhouse. We combine
            deep industry expertise with cutting-edge technology to deliver
            seamless supply chain solutions across the subcontinent and beyond.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-text-muted">
            With routes spanning 28 states and cross-border operations into
            Nepal, Bhutan, and Bangladesh, we've earned the trust of over 30
            major corporations by consistently putting our clients' needs first.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <GlassCard
                hoverGlow
                className="text-center"
              >
                <div className="font-heading text-4xl font-bold text-brand-primary sm:text-5xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-text-muted">
                  {stat.label}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
