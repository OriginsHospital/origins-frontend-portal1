import { RequireAuth } from "@/components/RequireAuth";
import { EmptyState, RecordCard, Shell } from "@/components/ui";
import { useLanguage } from "@/context/LanguageContext";
import { usePatientNav } from "@/hooks/useNav";
import { usePortalQuery } from "@/hooks/usePortalQuery";

function Reports() {
  const { t, ts, td, tDate, tDoctor } = useLanguage();
  const nav = usePatientNav();
  const { data: rows, error } = usePortalQuery("/patient/reports");

  function statusChip(status) {
    return (
      <span
        className={`chip shrink-0 ${
          status === "Completed"
            ? "chip-sea"
            : status === "In Progress"
              ? "chip-warm"
              : "chip-muted"
        }`}
      >
        {ts(status)}
      </span>
    );
  }

  return (
    <Shell title={t("reportsTitle")} subtitle={t("reportsSubtitle")} navItems={nav}>
      {error ? (
        <p className="mb-4 rounded-xl bg-[rgba(184,90,58,0.1)] px-4 py-3 text-sm text-[var(--accent)]">
          {error}
        </p>
      ) : null}

      {!rows?.length ? (
        <EmptyState title={t("noReportsYet")} subtitle={t("noReportsHint")} />
      ) : (
        <>
          <div className="record-stack">
            {rows.map((r, idx) => (
              <RecordCard
                key={`${r.appointmentId}-${idx}`}
                title={td(r.labTestName)}
                badge={statusChip(r.reportStatus)}
                rows={[
                  { label: t("date"), value: tDate(r.reportDate) },
                  { label: t("doctor"), value: tDoctor(r.doctorName) },
                  { label: t("context"), value: td(r.type) }
                ]}
              />
            ))}
          </div>

          <div className="desktop-only-table table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>{t("test")}</th>
                  <th>{t("date")}</th>
                  <th>{t("doctor")}</th>
                  <th>{t("context")}</th>
                  <th>{t("status")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => (
                  <tr key={`${r.appointmentId}-${idx}`}>
                    <td className="font-semibold">{td(r.labTestName)}</td>
                    <td>{tDate(r.reportDate)}</td>
                    <td>{tDoctor(r.doctorName)}</td>
                    <td>{td(r.type)}</td>
                    <td>{statusChip(r.reportStatus)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Shell>
  );
}

export default function ReportsPage() {
  return (
    <RequireAuth role="patient">
      <Reports />
    </RequireAuth>
  );
}
