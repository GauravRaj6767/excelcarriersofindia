import { motion } from "framer-motion";
import { WHY_US } from "../../../lib/constants";
import { FloatingOrb } from "../../ui/FloatingOrb";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

const ACCENT_COLORS = [
  "#6C63FF",
  "#00D4AA",
  "#FF6B35",
  "#F5C842",
  "#6C63FF",
];

export function WhyUs() {
  return (
    <section id="why-us" className="relative overflow-hidden py-24 lg:py-32">
      <FloatingOrb
        color="rgba(245,200,66,0.05)"
        size={500}
        top="20%"
        right="-10%"
        delay={2}
      />
      <FloatingOrb
        color="rgba(108,99,255,0.06)"
        size={350}
        bottom="10%"
        left="-8%"
        delay={4}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="font-heading text-sm font-semibold tracking-widest text-brand-gold uppercase">
            Why Choose Us
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-text-main sm:text-4xl lg:text-5xl">
            The ECI{" "}
            <span className="bg-gradient-to-r from-brand-gold to-brand-accent bg-clip-text text-transparent">
              advantage
            </span>
          </h2>
        </motion.div>

        {/* Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {WHY_US.map((item, index) => {
            const Icon = item.icon;
            const color = ACCENT_COLORS[index % ACCENT_COLORS.length];
            const num = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-2xl bg-surface-1 p-8 transition-all duration-300 hover:bg-surface-2"
                style={{
                  borderLeft: `3px solid ${color}`,
                  boxShadow: `0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -15px rgba(0,0,0,0.4)`,
                }}
              >
                {/* Background number */}
                <span
                  className="absolute -right-3 -top-4 select-none font-heading text-8xl font-bold leading-none opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.07]"
                  aria-hidden
                >
                  {num}
                </span>

                {/* Icon */}
                <div
                  className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                  style={{ background: `${color}18` }}
                >
                  <Icon size={22} style={{ color }} />
                </div>

                {/* Title */}
                <h3 className="mb-3 font-heading text-lg font-bold text-text-main">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-text-muted">
                  {item.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
