import { useEffect, useRef, useState } from "react";
import { FiMic } from "react-icons/fi";
import { RequireAuth } from "@/components/RequireAuth";
import { Shell } from "@/components/ui";
import { buildAssistantReply } from "@/lib/assistant";
import { useLanguage } from "@/context/LanguageContext";
import { usePatientNav } from "@/hooks/useNav";
import { usePortalQuery } from "@/hooks/usePortalQuery";

function VoiceAssistant() {
  const { t, lang } = useLanguage();
  const nav = usePatientNav();
  const { data: dashboard } = usePortalQuery("/patient/dashboard");
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.stop?.();
      } catch (_) {}
    };
  }, []);

  function speak(text) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang === "te" ? "te-IN" : lang === "hi" ? "hi-IN" : "en-IN";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  function toggleListen() {
    setError("");
    const SpeechRecognition =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognition) {
      setError(t("voiceUnsupported"));
      return;
    }

    if (listening) {
      recognitionRef.current?.stop?.();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === "te" ? "te-IN" : lang === "hi" ? "hi-IN" : "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => {
      setListening(false);
      setError(t("voiceUnsupported"));
    };
    recognition.onresult = event => {
      const text = event.results?.[0]?.[0]?.transcript || "";
      setHeard(text);
      const answer = buildAssistantReply(text, dashboard, t);
      setReply(answer);
      speak(answer);
    };

    recognition.start();
  }

  return (
    <Shell title={t("voiceTitle")} subtitle={t("voiceSubtitle")} navItems={nav}>
      <section className="panel mx-auto max-w-xl text-center">
        <button
          type="button"
          className={`voice-orb ${listening ? "listening" : ""}`}
          onClick={toggleListen}
          aria-label={listening ? t("voiceStop") : t("voiceTapToSpeak")}
        >
          <FiMic />
        </button>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--tiffany-deep)]">
          {listening ? t("voiceListening") : t("voiceTapToSpeak")}
        </p>

        {error ? (
          <p className="mt-4 rounded-xl bg-[rgba(196,91,91,0.1)] px-4 py-3 text-sm text-[var(--accent)]">
            {error}
          </p>
        ) : null}

        {heard ? (
          <div className="mt-6 rounded-2xl bg-[var(--foam)] p-4 text-left">
            <p className="label">{t("voiceHeard")}</p>
            <p className="mt-1 text-sm font-medium">{heard}</p>
          </div>
        ) : null}

        {reply ? (
          <div className="mt-4 rounded-2xl border border-[var(--line)] bg-white p-4 text-left">
            <p className="label">{t("cardAiAssistant")}</p>
            <p className="mt-1 text-sm leading-relaxed">{reply}</p>
          </div>
        ) : null}

        <button type="button" className="btn-ghost mt-6" onClick={toggleListen}>
          {listening ? t("voiceStop") : t("voiceTapToSpeak")}
        </button>
      </section>
    </Shell>
  );
}

export default function VoicePage() {
  return (
    <RequireAuth role="patient">
      <VoiceAssistant />
    </RequireAuth>
  );
}
