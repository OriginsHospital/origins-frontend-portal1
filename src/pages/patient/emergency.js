import { FiPhoneCall } from "react-icons/fi";
import { RequireAuth } from "@/components/RequireAuth";
import { Shell } from "@/components/ui";
import { useLanguage } from "@/context/LanguageContext";
import { usePatientNav } from "@/hooks/useNav";
import { usePortalQuery } from "@/hooks/usePortalQuery";

function Emergency() {
  const { t } = useLanguage();
  const nav = usePatientNav();
  const { data } = usePortalQuery("/patient/dashboard");
  const emergency = data?.today?.emergency || {
    phone: "18001234567",
    label: "Origins Emergency Helpline"
  };

  const tel = `tel:${String(emergency.phone || "").replace(/\s+/g, "")}`;

  return (
    <Shell title={t("emergencyTitle")} subtitle={t("emergencySubtitle")} navItems={nav}>
      <section className="panel mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[rgba(196,91,91,0.12)] text-3xl text-[var(--accent)]">
          <FiPhoneCall />
        </div>
        <h2 className="display mt-6 text-2xl sm:text-3xl">{emergency.label}</h2>
        <p className="mt-2 break-all text-xl font-semibold tracking-wide text-[var(--ink)] sm:text-2xl">
          {emergency.phone}
        </p>
        <p className="mt-3 text-sm text-[rgba(11,47,54,0.6)]">{t("emergencyNote")}</p>
        <a href={tel} className="btn-primary mt-8 inline-flex w-full !bg-[linear-gradient(135deg,#c45b5b,#a94444)] sm:w-auto">
          {t("callHelpline")}
        </a>
      </section>
    </Shell>
  );
}

export default function EmergencyPage() {
  return (
    <RequireAuth role="patient">
      <Emergency />
    </RequireAuth>
  );
}
