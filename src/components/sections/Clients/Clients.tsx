import { motion } from "framer-motion";
import { CLIENTS } from "../../../lib/constants";

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-3">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24" style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24" style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }} />

      <div
        className={reverse ? "animate-marquee-reverse" : "animate-marquee"}
        style={{ display: "flex", width: "fit-content" }}
      >
        {doubled.map((client, i) => (
          <div
            key={`${client}-${i}`}
            className="mx-3 flex-shrink-0 whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-medium text-text-muted transition-colors duration-300 hover:text-brand-primary"
            style={{ border: '1px solid var(--glass-border)', background: 'var(--glass-bg)' }}
          >
            {client}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Clients() {
  const firstHalf = CLIENTS.slice(0, Math.ceil(CLIENTS.length / 2));
  const secondHalf = CLIENTS.slice(Math.ceil(CLIENTS.length / 2));

  return (
    <section id="clients" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="font-heading text-sm font-semibold tracking-widest text-brand-accent uppercase">
            Our Clients
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-text-main sm:text-4xl lg:text-5xl">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-brand-accent to-brand-gold bg-clip-text text-transparent">
              industry leaders
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-muted">
            30+ major corporations rely on us for their critical logistics needs.
          </p>
        </motion.div>
      </div>

      {/* Marquee - full width */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-2"
      >
        <MarqueeRow items={firstHalf} />
        <MarqueeRow items={secondHalf} reverse />
      </motion.div>
    </section>
  );
}
