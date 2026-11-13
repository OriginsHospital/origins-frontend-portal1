import { RequireAuth } from "@/components/RequireAuth";
import { EmptyState, RecordCard, Shell } from "@/components/ui";
import { useLanguage } from "@/context/LanguageContext";
import { usePatientNav } from "@/hooks/useNav";
import { usePortalQuery } from "@/hooks/usePortalQuery";

function Treatments() {
  const { t, ts, td, tDate, tDoctor } = useLanguage();
  const nav = usePatientNav();
  const { data: raw, error } = usePortalQuery("/patient/treatments");
  const data = raw || { visits: [], appointments: [] };

  return (
    <Shell title={t("treatmentsTitle")} subtitle={t("treatmentsSubtitle")} navItems={nav}>
      {error ? (
        <p className="mb-4 rounded-xl bg-[rgba(184,90,58,0.1)] px-4 py-3 text-sm text-[var(--accent)]">
          {error}
        </p>
      ) : null}

      <section className="mb-8">
        <h2 className="display mb-4 text-xl sm:text-2xl">{t("visits")}</h2>
        {!data.visits?.length ? (
          <EmptyState title={t("noVisitsYet")} />
        ) : (
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
            {data.visits.map(v => (
              <div key={v.visitId} className="panel">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold break-words">
                      {td(v.packageName || v.visitType) !== "—"
                        ? td(v.packageName || v.visitType)
                        : `${t("visit")} #${v.visitId}`}
                    </p>
                    <p className="mt-1 text-sm text-[rgba(11,46,43,0.6)]">
                      {tDate(v.visitDate)}
                      {v.visitType ? ` · ${td(v.visitType)}` : ""}
                    </p>
                  </div>
                  <span className={`chip shrink-0 ${v.isActive ? "chip-sea" : "chip-muted"}`}>
                    {v.isActive ? t("ongoing") : t("closed")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="display mb-4 text-xl sm:text-2xl">{t("appointments")}</h2>
        {!data.appointments?.length ? (
          <EmptyState title={t("noAppointmentsYet")} />
        ) : (
          <>
            <div className="record-stack">
              {data.appointments.map(a => (
                <RecordCard
                  key={`${a.type}-${a.appointmentId}`}
                  title={td(a.type)}
                  badge={
                    <span className="chip chip-muted shrink-0">
                      {a.appointmentStatus
                        ? ts(a.appointmentStatus)
                        : a.visitActive
                          ? t("activeVisit")
                          : "—"}
                    </span>
                  }
                  rows={[
                    { label: t("date"), value: tDate(a.appointmentDate) },
                    { label: t("doctor"), value: tDoctor(a.doctorName) },
                    { label: t("package"), value: td(a.packageName || a.visitType) }
                  ]}
                />
              ))}
            </div>

            <div className="desktop-only-table table-wrap">
              <table className="data">
                <thead>
                  <tr>
                    <th>{t("date")}</th>
                    <th>{t("type")}</th>
                    <th>{t("doctor")}</th>
                    <th>{t("package")}</th>
                    <th>{t("status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.appointments.map(a => (
                    <tr key={`${a.type}-${a.appointmentId}`}>
                      <td>{tDate(a.appointmentDate)}</td>
                      <td>{td(a.type)}</td>
                      <td>{tDoctor(a.doctorName)}</td>
                      <td>{td(a.packageName || a.visitType)}</td>
                      <td>
                        <span className="chip chip-muted">
                          {a.appointmentStatus
                            ? ts(a.appointmentStatus)
                            : a.visitActive
                              ? t("activeVisit")
                              : "—"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </Shell>
  );
}

export default function TreatmentsPage() {
  return (
    <RequireAuth role="patient">
      <Treatments />
    </RequireAuth>
  );
}
