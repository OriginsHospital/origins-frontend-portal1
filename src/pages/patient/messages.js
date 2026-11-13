import { RequireAuth } from "@/components/RequireAuth";
import { EmptyState, Shell } from "@/components/ui";
import { useLanguage } from "@/context/LanguageContext";
import { usePatientNav } from "@/hooks/useNav";
import { usePortalQuery } from "@/hooks/usePortalQuery";

function Messages() {
  const { t, tDate } = useLanguage();
  const nav = usePatientNav();
  const { data, error } = usePortalQuery("/patient/dashboard");
  const message = data?.today?.doctorMessage || null;

  return (
    <Shell
      title={t("doctorMessageTitle")}
      subtitle={t("doctorMessageSubtitle")}
      navItems={nav}
    >
      {error ? (
        <p className="mb-4 rounded-xl bg-[rgba(184,90,58,0.1)] px-4 py-3 text-sm text-[var(--accent)]">
          {error}
        </p>
      ) : null}

      {!message ? (
        <EmptyState title={t("noDoctorMessage")} />
      ) : (
        <section className="panel max-w-3xl">
          <p className="chip chip-sea">{message.from}</p>
          <h2 className="display mt-4 text-2xl sm:text-3xl">{message.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-[rgba(11,47,54,0.75)]">
            {message.body}
          </p>
          <p className="mt-6 text-sm text-[rgba(11,47,54,0.5)]">{tDate(message.date)}</p>
        </section>
      )}
    </Shell>
  );
}

export default function MessagesPage() {
  return (
    <RequireAuth role="patient">
      <Messages />
    </RequireAuth>
  );
}
