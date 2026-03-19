import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface ClayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "accent" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function ClayButton({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ClayButtonProps) {
  const variants = {
    primary:
      "bg-brand-primary text-white shadow-[0_6px_20px_rgba(108,99,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_8px_30px_rgba(108,99,255,0.6),inset_0_1px_0_rgba(255,255,255,0.25)] hover:translate-y-[-2px] active:translate-y-[1px] active:shadow-[0_2px_10px_rgba(108,99,255,0.3)]",
    accent:
      "bg-brand-accent text-white shadow-[0_6px_20px_rgba(255,107,53,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_8px_30px_rgba(255,107,53,0.6),inset_0_1px_0_rgba(255,255,255,0.25)] hover:translate-y-[-2px] active:translate-y-[1px]",
    ghost:
      "bg-transparent border border-white/20 text-text-main hover:bg-white/[0.06] hover:border-brand-primary/40",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-xl",
    md: "px-6 py-3 text-base rounded-2xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
  };

  return (
    <button
      className={cn(
        "font-heading font-semibold tracking-wide transition-all duration-200 cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
