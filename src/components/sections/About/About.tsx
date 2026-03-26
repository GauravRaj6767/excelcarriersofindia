import { motion } from "framer-motion";
import { STATS, COMPANY } from "../../../lib/constants";
import { GlassCard } from "../../ui/GlassCard";
import { AnimatedCounter } from "../../ui/AnimatedCounter";
import { FloatingOrb } from "../../ui/FloatingOrb";

// ── SVG Vehicles (facing right) ───────────────────────────────

function TruckLarge({ color = "#6C63FF" }: { color?: string }) {
  return (
    <svg viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ transform: 'scaleX(-1)' }}>
      {/* Cab (front, on the left for left→right direction) */}
      <rect x="13" y="14" width="30" height="24" rx="3" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.2" strokeOpacity="0.8" />
      {/* Windshield */}
      <rect x="15" y="17" width="12" height="10" rx="1.5" fill={color} fillOpacity="0.45" />
      {/* Trailer */}
      <rect x="43" y="10" width="75" height="28" rx="3" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.2" strokeOpacity="0.6" />
      {/* Trailer dividers */}
      <line x1="70" y1="10" x2="70" y2="38" stroke={color} strokeWidth="0.6" strokeOpacity="0.3" />
      <line x1="95" y1="10" x2="95" y2="38" stroke={color} strokeWidth="0.6" strokeOpacity="0.3" />
      {/* Wheels - cab */}
      <circle cx="24" cy="40" r="5.5" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2" />
      <circle cx="24" cy="40" r="2.5" fill={color} fillOpacity="0.6" />
      {/* Wheels - trailer */}
      <circle cx="68" cy="40" r="5.5" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2" />
      <circle cx="68" cy="40" r="2.5" fill={color} fillOpacity="0.6" />
      <circle cx="98" cy="40" r="5.5" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2" />
      <circle cx="98" cy="40" r="2.5" fill={color} fillOpacity="0.6" />
    </svg>
  );
}

function MediumTruck({ color = "#FF6B35" }: { color?: string }) {
  return (
    <svg viewBox="0 0 90 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ transform: 'scaleX(-1)' }}>
      {/* Cab */}
      <rect x="7" y="12" width="26" height="22" rx="3" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.2" strokeOpacity="0.8" />
      {/* Windshield */}
      <rect x="9" y="14" width="11" height="9" rx="1.5" fill={color} fillOpacity="0.45" />
      {/* Body */}
      <rect x="33" y="8" width="55" height="26" rx="3" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.2" strokeOpacity="0.6" />
      {/* Wheels */}
      <circle cx="18" cy="36" r="5" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2" />
      <circle cx="18" cy="36" r="2.2" fill={color} fillOpacity="0.6" />
      <circle cx="50" cy="36" r="5" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2" />
      <circle cx="50" cy="36" r="2.2" fill={color} fillOpacity="0.6" />
      <circle cx="74" cy="36" r="5" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2" />
      <circle cx="74" cy="36" r="2.2" fill={color} fillOpacity="0.6" />
    </svg>
  );
}

function SmallVan({ color = "#00D4AA" }: { color?: string }) {
  return (
    <svg viewBox="0 0 70 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ transform: 'scaleX(-1)' }}>
      {/* Body */}
      <rect x="6" y="8" width="58" height="22" rx="4" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.2" strokeOpacity="0.7" />
      {/* Cab curve */}
      <path d="M6 8 Q18 4 28 8" stroke={color} strokeWidth="1.2" strokeOpacity="0.5" fill="none" />
      {/* Windshield */}
      <rect x="8" y="10" width="14" height="9" rx="2" fill={color} fillOpacity="0.4" />
      {/* Side window */}
      <rect x="30" y="11" width="18" height="8" rx="1.5" fill={color} fillOpacity="0.25" />
      {/* Wheels */}
      <circle cx="18" cy="32" r="5" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2" />
      <circle cx="18" cy="32" r="2.2" fill={color} fillOpacity="0.6" />
      <circle cx="52" cy="32" r="5" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2" />
      <circle cx="52" cy="32" r="2.2" fill={color} fillOpacity="0.6" />
    </svg>
  );
}

function Bike({ color = "#F5C842" }: { color?: string }) {
  return (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ transform: 'scaleX(-1)' }}>
      {/* Body */}
      <rect x="8" y="10" width="30" height="14" rx="3" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.2" strokeOpacity="0.7" />
      {/* Rider */}
      <rect x="10" y="5" width="10" height="10" rx="2" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="0.8" strokeOpacity="0.5" />
      {/* Wheels */}
      <circle cx="12" cy="26" r="4.5" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2" />
      <circle cx="12" cy="26" r="2" fill={color} fillOpacity="0.6" />
      <circle cx="36" cy="26" r="4.5" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2" />
      <circle cx="36" cy="26" r="2" fill={color} fillOpacity="0.6" />
    </svg>
  );
}

// ── Vehicle Scene using CSS animations (no lag) ───────────────

// Each lane is a CSS-animated strip. We use style injection via a
// unique className per lane so durations can vary without Framer Motion.
const LANE_STYLES = `
.vehicle-scene { overflow: clip; }
.lane-1 { animation: lane1 14s linear infinite; }
.lane-2 { animation: lane2 11s linear 2s infinite; }
.lane-3 { animation: lane3  9s linear 0.5s infinite; }
.lane-4 { animation: lane4  6.5s linear 3s infinite; }
@keyframes lane1 { from { left: -220px; } to { left: 100%; } }
@keyframes lane2 { from { left: -175px; } to { left: 100%; } }
@keyframes lane3 { from { left: -135px; } to { left: 100%; } }
@keyframes lane4 { from { left: -90px;  } to { left: 100%; } }
`;

function VehicleScene() {
  return (
    <>
      <style>{LANE_STYLES}</style>
      <div className="vehicle-scene relative h-full w-full">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, var(--surface-1) 0%, var(--surface-2) 100%)' }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(var(--text-main) 1px, transparent 1px), linear-gradient(90deg, var(--text-main) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Lane 1 — large truck, bottom */}
        <div className="absolute left-0 right-0" style={{ bottom: '8%' }}>
          <div className="absolute left-0 right-0 h-px" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(108,99,255,0.25) 0px, rgba(108,99,255,0.25) 16px, transparent 16px, transparent 36px)' }} />
          <div className="lane-1 absolute" style={{ width: 210, bottom: 4 }}>
            <TruckLarge color="#6C63FF" />
          </div>
        </div>

        {/* Lane 2 — medium truck */}
        <div className="absolute left-0 right-0" style={{ bottom: '32%' }}>
          <div className="absolute left-0 right-0 h-px" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,107,53,0.2) 0px, rgba(255,107,53,0.2) 16px, transparent 16px, transparent 36px)' }} />
          <div className="lane-2 absolute" style={{ width: 165, bottom: 4 }}>
            <MediumTruck color="#FF6B35" />
          </div>
        </div>

        {/* Lane 3 — van */}
        <div className="absolute left-0 right-0" style={{ bottom: '56%' }}>
          <div className="absolute left-0 right-0 h-px" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,212,170,0.2) 0px, rgba(0,212,170,0.2) 16px, transparent 16px, transparent 36px)' }} />
          <div className="lane-3 absolute" style={{ width: 125, bottom: 4 }}>
            <SmallVan color="#00D4AA" />
          </div>
        </div>

        {/* Lane 4 — bike, top */}
        <div className="absolute left-0 right-0" style={{ bottom: '75%' }}>
          <div className="lane-4 absolute" style={{ width: 80, bottom: 4 }}>
            <Bike color="#F5C842" />
          </div>
        </div>

        {/* Label */}
        <div className="absolute bottom-3 right-4 z-10">
          <span className="font-heading text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
            Fleet in Motion
          </span>
        </div>
      </div>
    </>
  );
}

// ── Animation variants ────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

// ── Section ───────────────────────────────────────────────────

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-16 lg:py-20">
      <FloatingOrb color="rgba(108,99,255,0.08)" size={400} top="20%" right="-10%" delay={1} />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Top row: text (left) + fleet animation (right) */}
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-2">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
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
              regional carrier into a pan-India logistics powerhouse. We deliver
              seamless supply chain solutions across the subcontinent and beyond.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-text-muted">
              With routes spanning 28 states and cross-border operations into
              Nepal, Bhutan, and Bangladesh, we've earned the trust of over 30
              major corporations by consistently putting our clients' needs first.
            </p>
          </motion.div>

          {/* Right: animated fleet (desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden h-full min-h-[400px] overflow-hidden rounded-2xl lg:block"
            style={{ border: '1px solid var(--glass-border)' }}
          >
            <VehicleScene />
          </motion.div>
        </div>

        {/* Stats row — full width, 4 columns, below both */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <GlassCard hoverGlow className="text-center">
                <div className="font-heading text-4xl font-bold text-brand-primary sm:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm font-medium text-text-muted">{stat.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
