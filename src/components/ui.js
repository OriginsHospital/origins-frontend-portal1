import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

const logoSizes = {
  sm: { className: "brand-logo brand-logo-sm", width: 400, height: 400 },
  md: { className: "brand-logo brand-logo-md", width: 560, height: 560 },
  lg: { className: "brand-logo brand-logo-lg", width: 800, height: 800 },
  hero: { className: "brand-logo brand-logo-hero", width: 960, height: 960 }
};

export function BrandMark({ size = "md", showTagline = true }) {
  const { t } = useLanguage();
  const cfg = logoSizes[size] || logoSizes.md;
  return (
    <div className="flex flex-col items-start gap-2 sm:gap-3">
      <Image
        src="/logo.png"
        alt="Origins IVF"
        width={cfg.width}
        height={cfg.height}
        className={cfg.className}
        priority
        sizes="(max-width: 768px) 70vw, 640px"
      />
      {showTagline ? (
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[rgba(11,47,54,0.5)] sm:text-[0.72rem] sm:tracking-[0.22em]">
          {t("patientPortal")}
        </p>
      ) : null}
    </div>
  );
}

export function LanguageSwitcher({ compact = false }) {
  const { lang, setLang, languages, t } = useLanguage();

  return (
    <div className={compact ? "" : "rounded-2xl bg-[var(--foam)] p-3 sm:p-4"}>
      {!compact ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[rgba(11,47,54,0.48)]">
          {t("language")}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {languages.map(item => {
          const active = lang === item.code;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => setLang(item.code)}
              className={`chip transition ${active ? "chip-sea" : "chip-muted"}`}
              aria-pressed={active}
            >
              {item.native}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="portal-shell flex min-h-screen items-center justify-center px-6">
      <motion.div
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <Image
          src="/logo.png"
          alt="Origins IVF"
          width={560}
          height={560}
          className="brand-logo brand-logo-md"
          priority
        />
      </motion.div>
    </div>
  );
}

export function EmptyState({ title, subtitle }) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--line)] bg-white/60 px-4 py-10 text-center sm:rounded-3xl sm:px-6 sm:py-14">
      <p className="display text-xl text-[var(--ink)] sm:text-2xl">{title}</p>
      {subtitle ? (
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[rgba(11,47,54,0.58)]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function StatCard({ label, value, hint }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="panel"
    >
      <p className="label">{label}</p>
      <p className="display mt-2 text-3xl text-[var(--tiffany-deep)] sm:text-4xl">{value}</p>
      {hint ? <p className="mt-2 text-sm text-[rgba(11,47,54,0.52)]">{hint}</p> : null}
    </motion.div>
  );
}

/** Mobile-friendly record card (replaces wide tables on small screens). */
export function RecordCard({ title, badge, rows = [], footer }) {
  return (
    <article className="record-card">
      <div className="flex items-start justify-between gap-3">
        <h3 className="record-card-title">{title}</h3>
        {badge || null}
      </div>
      {rows.length ? (
        <dl className="record-card-grid">
          {rows.map(row => (
            <div key={row.label} className="record-card-row">
              <dt>{row.label}</dt>
              <dd>{row.value ?? "—"}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {footer ? <div className="record-card-footer">{footer}</div> : null}
    </article>
  );
}

export function Shell({ title, subtitle, navItems, children }) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  function isActive(href) {
    if (href === "/patient" || href === "/admin") {
      return router.pathname === href;
    }
    return router.pathname === href || router.pathname.startsWith(`${href}/`);
  }

  return (
    <div className="portal-shell shell-layout">
      <div className="shell-frame">
        <aside className="shell-sidebar panel">
          <BrandMark size="sm" />
          <div className="mt-6 space-y-1 lg:mt-8">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive(item.href) ? "active" : ""}`}
              >
                <span className="text-lg text-[var(--tiffany-deep)]">{item.icon}</span>
                <span className="min-w-0 truncate">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-6 lg:mt-8">
            <LanguageSwitcher />
          </div>

          <div className="mt-4 rounded-2xl bg-[var(--foam)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[rgba(11,47,54,0.48)]">
              {t("signedIn")}
            </p>
            <p className="mt-1 break-words text-sm font-semibold text-[var(--ink)]">
              {user?.fullName}
            </p>
            <p className="break-all text-xs text-[rgba(11,47,54,0.52)]">{user?.email}</p>
            <button type="button" className="btn-ghost mt-4 w-full" onClick={logout}>
              {t("signOut")}
            </button>
          </div>
        </aside>

        <div className="shell-main">
          <header className="shell-topbar">
            <div className="shell-topbar-brand">
              <Image
                src="/logo.png"
                alt="Origins IVF"
                width={280}
                height={280}
                className="brand-logo brand-logo-topbar"
                priority
              />
            </div>
            <div className="shell-topbar-user min-w-0">
              <p className="truncate text-xs font-semibold text-[var(--ink)]">{user?.fullName}</p>
              <button type="button" className="shell-signout" onClick={logout}>
                {t("signOut")}
              </button>
            </div>
          </header>

          <main className="shell-content">
            <header className="shell-page-header">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="display shell-page-title"
              >
                {title}
              </motion.h1>
              {subtitle ? <p className="shell-page-subtitle">{subtitle}</p> : null}
            </header>
            <div className="shell-page-body">{children}</div>
          </main>
        </div>
      </div>

      <nav className="shell-bottom-nav" aria-label="Primary">
        {navItems.map(item => {
          const active = isActive(item.href);
          const tabLabel = item.shortLabel || item.label;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`shell-tab ${active ? "active" : ""}`}
              aria-label={item.label}
              title={item.label}
            >
              <span className="shell-tab-icon" aria-hidden>
                {item.icon}
              </span>
              <span className="shell-tab-label">{tabLabel}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
