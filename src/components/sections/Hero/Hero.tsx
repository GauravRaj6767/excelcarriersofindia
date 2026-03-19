import { Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { COMPANY } from "../../../lib/constants";
import { ClayButton } from "../../ui/ClayButton";
import { FloatingOrb } from "../../ui/FloatingOrb";
import { GlobeCanvas } from "./GlobeCanvas";

const headlineWords = ["Delivering", "Tomorrow's", "Logistics,", "Today."];

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background orbs */}
      <FloatingOrb
        color="rgba(108,99,255,0.12)"
        size={500}
        top="-10%"
        left="-10%"
        delay={0}
      />
      <FloatingOrb
        color="rgba(0,212,170,0.08)"
        size={400}
        bottom="10%"
        right="-5%"
        delay={2}
      />
      <FloatingOrb
        color="rgba(255,107,53,0.06)"
        size={300}
        top="40%"
        left="30%"
        delay={4}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-24 lg:grid-cols-2">
        {/* Left content */}
        <div>
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 px-4 py-1.5"
          >
            <span className="h-2 w-2 animate-pulse-glow rounded-full bg-brand-primary" />
            <span className="font-body text-xs font-medium tracking-wider text-brand-primary uppercase">
              Since {COMPANY.founded}
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-heading text-4xl leading-tight font-bold tracking-tight text-text-main sm:text-5xl lg:text-6xl xl:text-7xl">
            {headlineWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                className="mr-3 inline-block"
              >
                {i === 1 ? (
                  <span className="bg-gradient-to-r from-brand-primary to-brand-teal bg-clip-text text-transparent">
                    {word}
                  </span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-text-muted"
          >
            {COMPANY.name} &mdash; {COMPANY.slogan}. Pan-India transportation,
            warehousing, and cross-border logistics engineered for the modern
            era.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a href="#services">
              <ClayButton variant="primary" size="lg">
                <span className="flex items-center gap-2">
                  Explore Services
                  <ArrowRight size={18} />
                </span>
              </ClayButton>
            </a>
            <a href={`tel:${COMPANY.phone}`}>
              <ClayButton variant="ghost" size="lg">
                <span className="flex items-center gap-2">
                  <Phone size={18} />
                  Get a Quote
                </span>
              </ClayButton>
            </a>
          </motion.div>
        </div>

        {/* Right: Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="hidden h-[500px] lg:block xl:h-[600px]"
        >
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                <div className="h-16 w-16 animate-spin rounded-full border-2 border-brand-primary border-t-transparent" />
              </div>
            }
          >
            <GlobeCanvas />
          </Suspense>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest text-text-muted uppercase">
            Scroll
          </span>
          <div className="h-8 w-5 rounded-full" style={{ border: '1px solid var(--glass-border)' }}>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mx-auto mt-1 h-2 w-1 rounded-full bg-brand-primary"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
