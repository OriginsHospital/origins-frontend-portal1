import { useState } from "react";
import { RequireAuth } from "@/components/RequireAuth";
import { RecordCard, Shell } from "@/components/ui";
import { portalApi } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";
import { useAdminNav } from "@/hooks/useNav";
import { usePortalQuery } from "@/hooks/usePortalQuery";
import { invalidatePortalCache } from "@/lib/portalCache";

function CreateStaff() {
  const { t } = useLanguage();
  const nav = useAdminNav();
  const {
    data: mastersRaw,
    error: mastersError,
    setError: setMastersError
  } = usePortalQuery("/admin/masters");
  const {
    data: staffRaw,
    error: staffError,
    mutate: mutateStaff,
    setError: setStaffError
  } = usePortalQuery("/admin/staff");
  const masters = mastersRaw || { roles: [], branches: [], modules: [] };
  const staff = staffRaw || [];
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    userName: "",
    password: "",
    roleId: "",
    aadhaarNo: "",
    branches: [],
    modules: []
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const loadError = mastersError || staffError;

  function update(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function toggleBranch(id) {
    setForm(prev => ({
      ...prev,
      branches: prev.branches.includes(id)
        ? prev.branches.filter(b => b !== id)
        : [...prev.branches, id]
    }));
  }

  function toggleModule(moduleId) {
    setForm(prev => {
      const exists = prev.modules.find(m => m.moduleId === moduleId);
      if (exists) {
        return { ...prev, modules: prev.modules.filter(m => m.moduleId !== moduleId) };
      }
      return {
        ...prev,
        modules: [...prev.modules, { moduleId, accessType: "W" }]
      };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMastersError("");
    setStaffError("");
    setMessage("");
    try {
      await portalApi("/admin/staff", {
        method: "POST",
        body: {
          ...form,
          roleId: Number(form.roleId),
          aadhaarNo: form.aadhaarNo || undefined,
          branches: form.branches.map(Number)
        }
      });
      setMessage(t("staffCreated"));
      setForm({
        fullName: "",
        email: "",
        userName: "",
        password: "",
        roleId: "",
        aadhaarNo: "",
        branches: [],
        modules: []
      });
      invalidatePortalCache("/admin/staff");
      const refreshed = await portalApi("/admin/staff");
      mutateStaff(refreshed || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Shell
      title={t("createStaffTitle")}
      subtitle={t("createStaffSubtitle")}
      navItems={nav}
    >
      <form onSubmit={onSubmit} className="panel grid gap-5 md:grid-cols-2">
        <div>
          <label className="label">{t("fullName")}</label>
          <input
            className="field"
            required
            value={form.fullName}
            onChange={e => update("fullName", e.target.value)}
          />
        </div>
        <div>
          <label className="label">{t("email")}</label>
          <input
            className="field"
            type="email"
            required
            value={form.email}
            onChange={e => update("email", e.target.value)}
          />
        </div>
        <div>
          <label className="label">{t("username")}</label>
          <input
            className="field"
            required
            value={form.userName}
            onChange={e => update("userName", e.target.value)}
          />
        </div>
        <div>
          <label className="label">{t("password")}</label>
          <input
            className="field"
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={e => update("password", e.target.value)}
          />
        </div>
        <div>
          <label className="label">{t("role")}</label>
          <select
            className="field"
            required
            value={form.roleId}
            onChange={e => update("roleId", e.target.value)}
          >
            <option value="">{t("selectRole")}</option>
            {(masters.roles || []).map(r => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">{t("aadhaarOptional")}</label>
          <input
            className="field"
            maxLength={12}
            value={form.aadhaarNo}
            onChange={e => update("aadhaarNo", e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="label">{t("branches")}</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {(masters.branches || []).map(b => {
              const active = form.branches.includes(b.id);
              return (
                <button
                  key={b.id}
                  type="button"
                  className={`chip ${active ? "chip-sea" : "chip-muted"}`}
                  onClick={() => toggleBranch(b.id)}
                >
                  {b.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="label">{t("modulesOptional")}</label>
          <div className="mt-2 flex max-h-40 flex-wrap gap-2 overflow-auto">
            {(masters.modules || []).map(m => {
              const active = form.modules.some(x => x.moduleId === m.id);
              return (
                <button
                  key={m.id}
                  type="button"
                  className={`chip ${active ? "chip-sea" : "chip-muted"}`}
                  onClick={() => toggleModule(m.id)}
                >
                  {m.name}
                </button>
              );
            })}
          </div>
        </div>

        {error || loadError ? (
          <p className="md:col-span-2 rounded-xl bg-[rgba(184,90,58,0.1)] px-4 py-3 text-sm text-[var(--accent)]">
            {error || loadError}
          </p>
        ) : null}
        {message ? (
          <p className="md:col-span-2 rounded-xl bg-[rgba(10,186,181,0.12)] px-4 py-3 text-sm text-[var(--tiffany-deep)]">
            {message}
          </p>
        ) : null}

        <div className="md:col-span-2">
          <button
            className="btn-primary w-full sm:w-auto"
            type="submit"
            disabled={saving || form.branches.length === 0}
          >
            {saving ? t("creating") : t("createStaffUser")}
          </button>
        </div>
      </form>

      <section className="mt-8">
        <h2 className="display mb-4 text-xl sm:text-2xl">{t("currentStaff")}</h2>
        <div className="record-stack">
          {staff.slice(0, 30).map(u => (
            <RecordCard
              key={u.id}
              title={u.fullName}
              badge={
                <span className="chip chip-muted shrink-0">
                  {u.isAdminVerified ? t("yes") : t("no")}
                </span>
              }
              rows={[
                { label: t("email"), value: u.email },
                { label: t("role"), value: u.roleDetails?.name },
                { label: t("verified"), value: u.isAdminVerified ? t("yes") : t("no") }
              ]}
            />
          ))}
        </div>
        <div className="desktop-only-table table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>{t("name")}</th>
                <th>{t("email")}</th>
                <th>{t("role")}</th>
                <th>{t("verified")}</th>
              </tr>
            </thead>
            <tbody>
              {staff.slice(0, 30).map(u => (
                <tr key={u.id}>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>{u.roleDetails?.name}</td>
                  <td>{u.isAdminVerified ? t("yes") : t("no")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Shell>
  );
}

export default function StaffPage() {
  return (
    <RequireAuth role="super_admin">
      <CreateStaff />
    </RequireAuth>
  );
}
