import { RequireAuth } from "@/components/RequireAuth";
import { EmptyState, RecordCard, Shell } from "@/components/ui";
import { useLanguage } from "@/context/LanguageContext";
import { usePatientNav } from "@/hooks/useNav";
import { usePortalQuery } from "@/hooks/usePortalQuery";

function Medicines() {
  const { t, td, tDate, tDoctor, tMedicine, tInstructions } = useLanguage();
  const nav = usePatientNav();
  const { data: rows, error } = usePortalQuery("/patient/medicines");

  return (
    <Shell title={t("medicinesTitle")} subtitle={t("medicinesSubtitle")} navItems={nav}>
      {error ? (
        <p className="mb-4 rounded-xl bg-[rgba(184,90,58,0.1)] px-4 py-3 text-sm text-[var(--accent)]">
          {error}
        </p>
      ) : null}

      {!rows?.length ? (
        <EmptyState title={t("noMedicinesFound")} subtitle={t("noMedicinesHint")} />
      ) : (
        <>
          <div className="record-stack">
            {rows.map((m, idx) => (
              <RecordCard
                key={`${m.lineBillId || m.appointmentId}-${idx}`}
                title={tMedicine(m.medicineName)}
                badge={<span className="chip chip-muted shrink-0">{td(m.paymentStatus)}</span>}
                rows={[
                  {
                    label: t("instructions"),
                    value: tInstructions(m.prescriptionDetails, m.prescriptionDays)
                  },
                  {
                    label: t("appointment"),
                    value: `${tDate(m.appointmentDate)} · ${td(m.appointmentType)}`
                  },
                  { label: t("doctor"), value: tDoctor(m.doctorName) },
                  { label: t("prescribed"), value: m.prescribedQuantity ?? "—" },
                  { label: t("purchased"), value: m.purchasedQuantity ?? 0 }
                ]}
              />
            ))}
          </div>

          <div className="desktop-only-table table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>{t("medicine")}</th>
                  <th>{t("instructions")}</th>
                  <th>{t("appointment")}</th>
                  <th>{t("doctor")}</th>
                  <th>{t("prescribed")}</th>
                  <th>{t("purchased")}</th>
                  <th>{t("status")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((m, idx) => (
                  <tr key={`${m.lineBillId || m.appointmentId}-${idx}`}>
                    <td className="font-semibold">{tMedicine(m.medicineName)}</td>
                    <td>{tInstructions(m.prescriptionDetails, m.prescriptionDays)}</td>
                    <td>
                      {tDate(m.appointmentDate)}
                      <span className="block text-xs text-[rgba(11,46,43,0.55)]">
                        {td(m.appointmentType)}
                      </span>
                    </td>
                    <td>{tDoctor(m.doctorName)}</td>
                    <td>{m.prescribedQuantity ?? "—"}</td>
                    <td>{m.purchasedQuantity ?? 0}</td>
                    <td>
                      <span className="chip chip-muted">{td(m.paymentStatus)}</span>
                    </td>
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

export default function MedicinesPage() {
  return (
    <RequireAuth role="patient">
      <Medicines />
    </RequireAuth>
  );
}
