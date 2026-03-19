import { cn } from "../../lib/utils";

interface FloatingOrbProps {
  color?: string;
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
  className?: string;
}

export function FloatingOrb({
  color = "rgba(108,99,255,0.15)",
  size = 300,
  top,
  left,
  right,
  bottom,
  delay = 0,
  className,
}: FloatingOrbProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl animate-float",
        className
      )}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        top,
        left,
        right,
        bottom,
        animationDelay: `${delay}s`,
      }}
    />
  );
}
