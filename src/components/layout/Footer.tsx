import { COMPANY, NAV_LINKS } from "../../lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-1" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-lg font-bold text-text-main">
              <span className="text-brand-primary">Excel</span> Carriers
            </h3>
            <p className="mt-1 text-sm text-text-muted">{COMPANY.slogan}</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted transition-colors hover:text-brand-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px" style={{ backgroundColor: 'var(--border-subtle)' }} />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-text-muted">
            &copy; {year} {COMPANY.name}. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Proprietor: {COMPANY.proprietor}
          </p>
        </div>
      </div>
    </footer>
  );
}
