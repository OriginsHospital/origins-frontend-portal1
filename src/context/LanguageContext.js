import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  LANGUAGES,
  formatPortalDate,
  localizeData,
  localizeDoctor,
  localizeInstructions,
  localizeMedicine,
  statusLabel,
  translate
} from "@/i18n/translations";

const LanguageContext = createContext(null);
const STORAGE_KEY = "origins_portal_lang";

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && LANGUAGES.some(l => l.code === saved)) {
      setLangState(saved);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang =
      lang === "te" ? "te" : lang === "hi" ? "hi" : "en";
  }, [lang, ready]);

  const setLang = useCallback(code => {
    if (LANGUAGES.some(l => l.code === code)) {
      setLangState(code);
    }
  }, []);

  const t = useCallback((key, vars) => translate(lang, key, vars), [lang]);
  const ts = useCallback(status => statusLabel(lang, status), [lang]);
  const td = useCallback(value => localizeData(lang, value), [lang]);
  const tDate = useCallback(value => formatPortalDate(lang, value), [lang]);
  const tDoctor = useCallback(value => localizeDoctor(lang, value), [lang]);
  const tMedicine = useCallback(value => localizeMedicine(lang, value), [lang]);
  const tInstructions = useCallback(
    (text, days) => localizeInstructions(lang, text, days),
    [lang]
  );

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
      ts,
      td,
      tDate,
      tDoctor,
      tMedicine,
      tInstructions,
      languages: LANGUAGES,
      ready
    }),
    [lang, setLang, t, ts, td, tDate, tDoctor, tMedicine, tInstructions, ready]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
