import { useEffect, useMemo, useState } from "react";
import { RequireAuth } from "@/components/RequireAuth";
import { EmptyState, RecordCard, Shell } from "@/components/ui";
import { portalApi } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";
import { useAdminNav } from "@/hooks/useNav";
import { usePortalQuery } from "@/hooks/usePortalQuery";
import { invalidatePortalCache } from "@/lib/portalCache";

function PatientLogins() {
  const { t } = useLanguage();
  const nav = useAdminNav();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    data: logins = [],
    error: loginsError,
    mutate: mutateLogins,
    setError: setLoginsError
  } = usePortalQuery("/admin/patient-logins");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [searching, setSearching] = useState(false);
  const [saving, setSaving] = useState(false);

  async function loadLogins() {
    invalidatePortalCache("/admin/patient-logins");
    const data = await portalApi("/admin/patient-logins");
    mutateLogins(data || []);
  }

  useEffect(() => {
    const handle = setTimeout(async () => {
      setSearching(true);
      setError("");
      try {
        const data = await portalApi(
          `/admin/patients/search?q=${encodeURIComponent(query.trim())}`
        );
        setResults(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setSearching(false);
      }
    }, 350);
    return () => clearTimeout(handle);
  }, [query]);

  const selectable = useMemo(
    () => (results || []).filter(r => !r.hasPortalLogin),
    [results]
  );

  function choosePatient(patient) {
    if (patient.hasPortalLogin) {
      setError(t("patientAlreadyHasLogin"));
      return;
    }
    setSelected(patient);
    setEmail(patient.email || "");
    setPassword("");
    setMessage("");
    setError("");
  }

  async function createLogin(e) {
    e.preventDefault();
    if (!selected) {
      setError(t("selectPatientFirst"));
      return;
    }
    setSaving(true);
    setError("");
    setLoginsError("");
    setMessage("");
    try {
      await portalApi("/admin/patient-logins", {
        method: "POST",
        body: {
          patientMasterId: selected.patientMasterId,
          email: email.trim(),
          password
        }
      });
      setMessage(t("patientLoginCreated"));
      setSelected(null);
      setEmail("");
      setPassword("");
      await loadLogins();
      const refreshed = await portalApi(
        `/admin/patients/search?q=${encodeURIComponent(query.trim())}`
      );
      setResults(refreshed || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(login) {
    try {
      setError("");
      setLoginsError("");
      await portalApi(`/admin/patient-logins/${login.id}/status`, {
        method: "PUT",
        body: { isActive: !login.isActive }
      });
      await loadLogins();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Shell
      title={t("patientLoginsTitle")}
      subtitle={t("patientLoginsSubtitle")}
      navItems={nav}
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="panel">
          <h2 className="display text-xl sm:text-2xl">{t("selectExistingPatient")}</h2>
          <input
            className="field mt-4"
            placeholder={t("searchPatientsPlaceholder")}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <p className="mt-2 text-xs text-[rgba(11,46,43,0.55)]">
            {searching
              ? t("searching")
              : t("eligiblePatients", { count: selectable.length })}
          </p>

          <div className="mt-4 max-h-[420px] space-y-2 overflow-auto">
            {results.length === 0 ? (
              <EmptyState
                title={t("noPatientsFound")}
                subtitle={t("noPatientsHint")}
              />
            ) : (
              results.map(p => (
                <button
                  key={p.patientMasterId}
                  type="button"
                  onClick={() => choosePatient(p)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    selected?.patientMasterId === p.patientMasterId
                      ? "border-[var(--sea)] bg-[var(--foam)]"
                      : "border-[var(--line)] bg-white/70 hover:bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 sm:gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold break-words">{p.fullName}</p>
                      <p className="mt-0.5 break-words text-xs text-[rgba(11,46,43,0.55)]">
                        {p.patientCode} · {p.mobileNo} · {p.branchName || t("branch")}
                      </p>
                    </div>
                    <span className={`chip shrink-0 ${p.hasPortalLogin ? "chip-muted" : "chip-sea"}`}>
                      {p.hasPortalLogin ? t("loginExists") : t("available")}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </section>

        <section className="panel h-fit">
          <h2 className="display text-xl sm:text-2xl">{t("createLoginStep")}</h2>
          {!selected ? (
            <p className="mt-4 text-sm text-[rgba(11,46,43,0.6)]">{t("choosePatientHint")}</p>
          ) : (
            <form onSubmit={createLogin} className="mt-4 space-y-4">
              <div className="rounded-2xl bg-[var(--foam)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[rgba(11,46,43,0.5)]">
                  {t("selectedPatient")}
                </p>
                <p className="mt-1 font-semibold">{selected.fullName}</p>
                <p className="text-sm text-[rgba(11,46,43,0.6)]">
                  {selected.patientCode} · {selected.mobileNo}
                </p>
              </div>
              <div>
                <label className="label">{t("portalEmail")}</label>
                <input
                  className="field"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="label">{t("portalPassword")}</label>
                <input
                  className="field"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <button className="btn-primary w-full" type="submit" disabled={saving}>
                {saving ? t("creating") : t("createPatientLogin")}
              </button>
            </form>
          )}

          {error || loginsError ? (
            <p className="mt-4 rounded-xl bg-[rgba(184,90,58,0.1)] px-4 py-3 text-sm text-[var(--accent)]">
              {error || loginsError}
            </p>
          ) : null}
          {message ? (
            <p className="mt-4 rounded-xl bg-[rgba(10,186,181,0.12)] px-4 py-3 text-sm text-[var(--tiffany-deep)]">
              {message}
            </p>
          ) : null}
        </section>
      </div>

      <section className="mt-8">
        <h2 className="display mb-4 text-xl sm:text-2xl">{t("existingPatientLogins")}</h2>
        {logins.length === 0 ? (
          <EmptyState title={t("noLoginsCreated")} />
        ) : (
          <>
            <div className="record-stack">
              {logins.map(l => (
                <RecordCard
                  key={l.id}
                  title={l.patientName || l.fullName}
                  badge={
                    <span className={`chip shrink-0 ${l.isActive ? "chip-sea" : "chip-muted"}`}>
                      {l.isActive ? t("active") : t("disabled")}
                    </span>
                  }
                  rows={[
                    { label: t("code"), value: l.patientCode },
                    { label: t("email"), value: l.email }
                  ]}
                  footer={
                    <button
                      type="button"
                      className="btn-ghost w-full"
                      onClick={() => toggleStatus(l)}
                    >
                      {l.isActive ? t("disable") : t("enable")}
                    </button>
                  }
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
                    <th>{t("action")}</th>
                  </tr>
                </thead>
                <tbody>
                  {logins.map(l => (
                    <tr key={l.id}>
                      <td>{l.patientName || l.fullName}</td>
                      <td>{l.patientCode}</td>
                      <td>{l.email}</td>
                      <td>
                        <span className={`chip ${l.isActive ? "chip-sea" : "chip-muted"}`}>
                          {l.isActive ? t("active") : t("disabled")}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn-ghost"
                          onClick={() => toggleStatus(l)}
                        >
                          {l.isActive ? t("disable") : t("enable")}
                        </button>
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

export default function PatientLoginsPage() {
  return (
    <RequireAuth role="super_admin">
      <PatientLogins />
    </RequireAuth>
  );
}
