import { useEffect, useRef, useState } from "react";
import { RequireAuth } from "@/components/RequireAuth";
import { Shell } from "@/components/ui";
import { buildAssistantReply } from "@/lib/assistant";
import { useLanguage } from "@/context/LanguageContext";
import { usePatientNav } from "@/hooks/useNav";
import { usePortalQuery } from "@/hooks/usePortalQuery";

function AiAssistant() {
  const { t } = useLanguage();
  const nav = usePatientNav();
  const { data: dashboard } = usePortalQuery("/patient/dashboard");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => [
    { role: "bot", text: t("aiWelcome") }
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    setMessages(prev => {
      if (prev.length <= 1 && (!prev[0] || prev[0].role === "bot")) {
        return [{ role: "bot", text: t("aiWelcome") }];
      }
      return prev;
    });
  }, [t]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send(e) {
    e?.preventDefault?.();
    const q = input.trim();
    if (!q) return;
    const reply = buildAssistantReply(q, dashboard, t);
    setMessages(prev => [...prev, { role: "user", text: q }, { role: "bot", text: reply }]);
    setInput("");
  }

  return (
    <Shell title={t("aiTitle")} subtitle={t("aiSubtitle")} navItems={nav}>
      <section className="panel flex min-h-[55vh] flex-col sm:min-h-[60vh]">
        <div className="flex-1 space-y-3 overflow-auto pr-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`assistant-bubble ${m.role === "user" ? "user" : "bot"}`}
            >
              {m.text}
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <form onSubmit={send} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            className="field"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t("aiPlaceholder")}
          />
          <button type="submit" className="btn-primary w-full shrink-0 sm:w-auto">
            {t("aiSend")}
          </button>
        </form>
      </section>
    </Shell>
  );
}

export default function AiPage() {
  return (
    <RequireAuth role="patient">
      <AiAssistant />
    </RequireAuth>
  );
}
