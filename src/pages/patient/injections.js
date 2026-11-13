import { RequireAuth } from "@/components/RequireAuth";
import { EmptyState, Shell } from "@/components/ui";
import { useLanguage } from "@/context/LanguageContext";
import { usePatientNav } from "@/hooks/useNav";
import { usePortalQuery } from "@/hooks/usePortalQuery";

function Injections() {
  const { t, tMedicine, tInstructions, tDate, tDoctor } = useLanguage();
  const nav = usePatientNav();
  const { data, error } = usePortalQuery("/patient/dashboard");
  const rows = data?.today?.injections || [];

  return (
    <Shell
      title={t("cardTodayInjection")}
      subtitle={t("cardTodayInjectionHint")}
      navItems={nav}
    >
      {error ? (
        <p className="mb-4 rounded-xl bg-[rgba(184,90,58,0.1)] px-4 py-3 text-sm text-[var(--accent)]">
          {error}
        </p>
      ) : null}

      {!rows.length ? (
        <EmptyState title={t("noItemsToday")} subtitle={t("cardTodayInjectionHint")} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {rows.map((m, idx) => (
            <div key={`${m.appointmentId}-${idx}`} className="panel min-w-0">
              <p className="chip chip-sea">{t("cardTodayInjection")}</p>
              <h3 className="mt-3 break-words text-base font-semibold sm:text-lg">
                {tMedicine(m.medicineName)}
              </h3>
              <p className="mt-1 break-words text-sm text-[rgba(11,47,54,0.6)]">
                {tInstructions(m.prescriptionDetails, m.prescriptionDays)}
              </p>
              <p className="mt-3 break-words text-sm text-[rgba(11,47,54,0.55)]">
                {tDate(m.appointmentDate)} · {tDoctor(m.doctorName)}
              </p>
            </div>
          ))}
        </div>
      )}
    </Shell>
  );
}

export default function InjectionsPage() {
  return (
    <RequireAuth role="patient">
      <Injections />
    </RequireAuth>
  );
}
