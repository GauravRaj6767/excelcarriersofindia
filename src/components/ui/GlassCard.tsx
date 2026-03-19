import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hoverGlow?: boolean;
}

export function GlassCard({
  children,
  className,
  hoverGlow = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl p-6 backdrop-blur-xl",
        "transition-all duration-300",
        hoverGlow &&
          "hover:border-brand-primary/30 hover:shadow-[0_0_40px_rgba(108,99,255,0.15)]",
        className
      )}
      style={{
        background: "var(--glass-bg)",
        border: "1px solid var(--glass-border)",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
