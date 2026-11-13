import { RequireAuth } from "@/components/RequireAuth";
import { LanguageSwitcher, Shell } from "@/components/ui";
import { useLanguage } from "@/context/LanguageContext";
import { usePatientNav } from "@/hooks/useNav";

function PatientSettings() {
  const { t, languages, lang } = useLanguage();
  const nav = usePatientNav();
  const current = languages.find(l => l.code === lang);

  return (
    <Shell title={t("settingsTitle")} subtitle={t("settingsSubtitle")} navItems={nav}>
      <section className="panel max-w-xl">
        <h2 className="display text-xl sm:text-2xl">{t("language")}</h2>
        <p className="mt-2 text-sm text-[rgba(11,47,54,0.6)]">{t("languageHint")}</p>
        <div className="mt-6">
          <LanguageSwitcher />
        </div>
        <p className="mt-4 text-sm font-semibold text-[var(--tiffany-deep)]">
          {t("saveLanguage")}: {current?.native}
        </p>
      </section>
    </Shell>
  );
}

export default function PatientSettingsPage() {
  return (
    <RequireAuth role="patient">
      <PatientSettings />
    </RequireAuth>
  );
}
