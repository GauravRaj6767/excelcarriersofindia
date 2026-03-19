import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { NAV_LINKS, COMPANY } from "../../lib/constants";
import { cn } from "../../lib/utils";

interface NavbarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    // Wait for menu to close animation, then scroll
    setTimeout(() => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  }, []);

  const isDark = theme === "dark";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? isDark
            ? "bg-bg/80 border-b border-white/[0.06] backdrop-blur-xl"
            : "bg-white/80 border-b border-black/[0.06] backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
          className="flex-shrink-0"
        >
          <img
            src={isDark ? "/test2.png" : "/test1.png"}
            alt={COMPANY.name}
            className="h-10 w-auto lg:h-14"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="text-sm font-medium text-text-muted transition-colors duration-200 hover:text-brand-primary"
            >
              {link.label}
            </a>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200",
              isDark
                ? "border-white/10 bg-white/5 text-text-muted hover:border-brand-primary/40 hover:text-brand-primary"
                : "border-black/10 bg-black/5 text-text-muted hover:border-brand-primary/40 hover:text-brand-primary"
            )}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href={`tel:${COMPANY.phone}`}
            className="rounded-xl bg-brand-primary px-5 py-2 text-sm font-semibold text-white shadow-[0_4px_15px_rgba(108,99,255,0.3)] transition-all duration-200 hover:translate-y-[-1px] hover:shadow-[0_6px_25px_rgba(108,99,255,0.5)]"
          >
            Call Now
          </a>
        </div>

        {/* Mobile right side */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Theme Toggle mobile */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200",
              isDark
                ? "border-white/10 bg-white/5 text-text-muted"
                : "border-black/10 bg-black/5 text-text-muted"
            )}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-text-main"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "overflow-hidden border-t backdrop-blur-xl md:hidden",
              isDark
                ? "border-white/[0.06] bg-bg/95"
                : "border-black/[0.06] bg-white/95"
            )}
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "rounded-lg px-4 py-3 text-left text-base font-medium text-text-muted transition-colors",
                    isDark ? "hover:bg-white/[0.04] hover:text-brand-primary" : "hover:bg-black/[0.04] hover:text-brand-primary"
                  )}
                >
                  {link.label}
                </button>
              ))}
              <a
                href={`tel:${COMPANY.phone}`}
                className="mt-2 rounded-xl bg-brand-primary px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
