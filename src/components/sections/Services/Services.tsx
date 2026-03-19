import { motion } from "framer-motion";
import { SERVICES } from "../../../lib/constants";
import { FloatingOrb } from "../../ui/FloatingOrb";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-16 lg:py-20">
      <FloatingOrb
        color="rgba(255,107,53,0.06)"
        size={450}
        top="10%"
        left="-10%"
        delay={1.5}
      />
      <FloatingOrb
        color="rgba(0,212,170,0.05)"
        size={350}
        bottom="5%"
        right="-5%"
        delay={3}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <span className="font-heading text-sm font-semibold tracking-widest text-brand-teal uppercase">
            What We Do
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-text-main sm:text-4xl lg:text-5xl">
            Services built for the{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
              future of logistics
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
            From local deliveries to cross-border freight, our comprehensive
            suite of services covers every link in your supply chain.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative cursor-default overflow-hidden rounded-3xl p-8"
                style={{
                  background: `linear-gradient(135deg, ${service.color}15, ${service.color}05)`,
                  boxShadow: `0 20px 60px -10px ${service.color}30, 0 4px 20px rgba(0,0,0,0.3)`,
                }}
              >
                {/* Subtle top border glow */}
                <div
                  className="absolute inset-x-0 top-0 h-px opacity-50"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${service.color}20`,
                    boxShadow: `0 0 20px ${service.color}20`,
                  }}
                >
                  <Icon size={28} style={{ color: service.color }} />
                </div>

                {/* Content */}
                <h3 className="mb-3 font-heading text-xl font-bold text-text-main">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
