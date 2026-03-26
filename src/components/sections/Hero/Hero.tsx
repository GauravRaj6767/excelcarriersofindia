import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { COMPANY } from "../../../lib/constants";
import { ClayButton } from "../../ui/ClayButton";
import { FloatingOrb } from "../../ui/FloatingOrb";
import { useTheme } from "../../../lib/ThemeContext";

const LOOP_AT = 0.9;      // seek back at this fraction of video duration
const FADE_OUT_START = 0.85; // start fading out at this fraction (must be < LOOP_AT)
const FADE_DURATION = 0.4;   // seconds for fade out + fade in

function SeamlessGlobe({ isDark }: { isDark: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const opacityRef = useRef(1);
  const fadingRef = useRef(false);
  const animFrameRef = useRef<number>(0);

  const baseFilter = isDark ? "invert(1) hue-rotate(180deg) brightness(0.85)" : "brightness(0.972)";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!video.duration || fadingRef.current) return;
      const fadeOutTime = video.duration * FADE_OUT_START;

      if (video.currentTime >= fadeOutTime) {
        fadingRef.current = true;

        const startTime = performance.now();
        const halfDuration = FADE_DURATION * 500; // ms for each half

        const animate = (now: number) => {
          const elapsed = now - startTime;

          if (elapsed < halfDuration) {
            // Fading out
            const t = elapsed / halfDuration;
            opacityRef.current = 1 - t;
            if (video) video.style.opacity = String(opacityRef.current);
            animFrameRef.current = requestAnimationFrame(animate);
          } else if (elapsed < halfDuration * 2) {
            // Seek to start at midpoint (while invisible)
            if (video.currentTime > video.duration * LOOP_AT) {
              video.currentTime = 0;
            }
            // Fading in
            const t = (elapsed - halfDuration) / halfDuration;
            opacityRef.current = t;
            if (video) video.style.opacity = String(opacityRef.current);
            animFrameRef.current = requestAnimationFrame(animate);
          } else {
            // Done
            if (video) video.style.opacity = "1";
            opacityRef.current = 1;
            fadingRef.current = false;
          }
        };

        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[440px] xl:max-w-[480px]" style={{ aspectRatio: "1 / 1" }}>
      <video
        ref={videoRef}
        src="/eci_globe-cropped.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          filter: baseFilter,
          // Tighter mask — cuts bottom corners harder, center stays sharp
          maskImage: "radial-gradient(ellipse 80% 82% at 50% 46%, black 52%, transparent 74%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 82% at 50% 46%, black 52%, transparent 74%)",
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
}

// On mobile devices use tel:, on desktop use mailto:
const isMobile = () =>
  typeof window !== "undefined" &&
  /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

const headlineWords = ["Delivering", "Tomorrow's", "Logistics,", "Today."];

export function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] items-center overflow-hidden"
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

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-24 pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
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
            {COMPANY.name} - {COMPANY.slogan}. Pan-India transportation,
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
            <a href={isMobile() ? `tel:${COMPANY.phone}` : `mailto:${COMPANY.email}`}>
              <ClayButton variant="ghost" size="lg">
                <span className="flex items-center gap-2">
                  {isMobile() ? <Phone size={18} /> : <Mail size={18} />}
                  Get a Quote
                </span>
              </ClayButton>
            </a>
          </motion.div>
        </div>

        {/* Right: Globe Video */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="hidden items-center justify-center lg:flex"
        >
          <SeamlessGlobe isDark={isDark} />
        </motion.div>
      </div>

    </section>
  );
}
