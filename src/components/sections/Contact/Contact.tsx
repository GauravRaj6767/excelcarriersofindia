import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, User } from "lucide-react";
import { COMPANY } from "../../../lib/constants";
import { GlassCard } from "../../ui/GlassCard";
import { FloatingOrb } from "../../ui/FloatingOrb";

const contactItems = [
  {
    icon: MapPin,
    label: "Address",
    value: COMPANY.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(COMPANY.address)}`,
    color: "#6C63FF",
  },
  {
    icon: Phone,
    label: "Phone",
    value: COMPANY.phone,
    href: `tel:${COMPANY.phone}`,
    color: "#00D4AA",
  },
  {
    icon: Mail,
    label: "Email",
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
    color: "#FF6B35",
  },
  {
    icon: User,
    label: "Proprietor",
    value: COMPANY.proprietor,
    href: undefined,
    color: "#F5C842",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon \u2013 Sat, 9:00 AM \u2013 7:00 PM",
    href: undefined,
    color: "#6C63FF",
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 lg:py-32">
      <FloatingOrb
        color="rgba(108,99,255,0.08)"
        size={500}
        bottom="-10%"
        left="-10%"
        delay={1}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="font-heading text-sm font-semibold tracking-widest text-brand-primary uppercase">
            Get in Touch
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-text-main sm:text-4xl lg:text-5xl">
            Let's move your business{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-teal bg-clip-text text-transparent">
              forward
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-muted">
            Ready to optimize your logistics? Reach out and let's discuss how we
            can deliver excellence for your business.
          </p>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-3xl"
        >
          <GlassCard className="p-8 sm:p-10">
            {/* Company name */}
            <div className="mb-8 text-center">
              <h3 className="font-heading text-2xl font-bold text-text-main">
                {COMPANY.name}
              </h3>
              <p className="mt-1 text-sm italic text-text-muted">
                "{COMPANY.slogan}"
              </p>
            </div>

            {/* Contact items */}
            <div className="space-y-6">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: `${item.color}15`,
                        border: `1px solid ${item.color}30`,
                      }}
                    >
                      <Icon size={22} style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-medium tracking-wider text-text-muted uppercase">
                        {item.label}
                      </p>
                      <p className="mt-1 text-base font-medium text-text-main break-all sm:break-normal">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="block rounded-xl p-3 transition-colors duration-200 hover:bg-white/[0.03]"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className="p-3">
                    {content}
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
