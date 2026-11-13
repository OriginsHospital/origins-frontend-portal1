import Link from "next/link";
import { RequireAuth } from "@/components/RequireAuth";
import { EmptyState, RecordCard, Shell, StatCard } from "@/components/ui";
import { useLanguage } from "@/context/LanguageContext";
import { useAdminNav } from "@/hooks/useNav";
import { usePortalQuery } from "@/hooks/usePortalQuery";

function AdminHome() {
  const { t } = useLanguage();
  const nav = useAdminNav();
  const { data: staff = [], error: staffError } = usePortalQuery("/admin/staff");
  const { data: patients = [], error: patientsError } = usePortalQuery(
    "/admin/patient-logins"
  );
  const error = staffError || patientsError;

  return (
    <Shell title={t("adminTitle")} subtitle={t("adminSubtitle")} navItems={nav}>
      {error ? (
        <p className="mb-4 rounded-xl bg-[rgba(184,90,58,0.1)] px-4 py-3 text-sm text-[var(--accent)]">
          {error}
        </p>
      ) : null}

      <div className="stats-grid">
        <StatCard
          label={t("staffUsers")}
          value={staff.length}
          hint={t("existingHmsUsers")}
        />
        <StatCard
          label={t("patientLogins")}
          value={patients.length}
          hint={t("portalAccountsLinked")}
        />
        <StatCard
          label={t("activePatientLogins")}
          value={patients.filter(p => p.isActive).length}
          hint={t("canCurrentlySignIn")}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="panel">
          <h2 className="display text-xl sm:text-2xl">{t("staffCreation")}</h2>
          <p className="mt-2 text-sm text-[rgba(11,46,43,0.65)]">{t("staffCreationHint")}</p>
          <Link href="/admin/staff" className="btn-primary mt-6 inline-flex w-full sm:w-auto">
            {t("createStaffUser")}
          </Link>
        </section>
        <section className="panel">
          <h2 className="display text-xl sm:text-2xl">{t("patientLogin")}</h2>
          <p className="mt-2 text-sm text-[rgba(11,46,43,0.65)]">{t("patientLoginHint")}</p>
          <Link href="/admin/patient-logins" className="btn-primary mt-6 inline-flex w-full sm:w-auto">
            {t("managePatientLogins")}
          </Link>
        </section>
      </div>

      <section className="mt-8">
        <h2 className="display mb-4 text-xl sm:text-2xl">{t("recentPatientLogins")}</h2>
        {patients.length === 0 ? (
          <EmptyState
            title={t("noPatientLoginsYet")}
            subtitle={t("noPatientLoginsHint")}
          />
        ) : (
          <>
            <div className="record-stack">
              {patients.slice(0, 8).map(p => (
                <RecordCard
                  key={p.id}
                  title={p.patientName || p.fullName}
                  badge={
                    <span className={`chip shrink-0 ${p.isActive ? "chip-sea" : "chip-muted"}`}>
                      {p.isActive ? t("active") : t("disabled")}
                    </span>
                  }
                  rows={[
                    { label: t("code"), value: p.patientCode },
                    { label: t("email"), value: p.email }
                  ]}
                />
              ))}
            </div>
            <div className="desktop-only-table table-wrap">
              <table className="data">
                <thead>
                  <tr>
                    <th>{t("patient")}</th>
                    <th>{t("code")}</th>
                    <th>{t("email")}</th>
                    <th>{t("status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.slice(0, 8).map(p => (
                    <tr key={p.id}>
                      <td>{p.patientName || p.fullName}</td>
                      <td>{p.patientCode}</td>
                      <td>{p.email}</td>
                      <td>
                        <span className={`chip ${p.isActive ? "chip-sea" : "chip-muted"}`}>
                          {p.isActive ? t("active") : t("disabled")}
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

export default function AdminPage() {
  return (
    <RequireAuth role="super_admin">
      <AdminHome />
    </RequireAuth>
  );
}
