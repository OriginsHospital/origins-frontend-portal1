import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { BrandMark, LanguageSwitcher, PageLoader } from "@/components/ui";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.06 + i * 0.07, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function LoginPage() {
  const { user, loading, login } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (loading || !user) return;
    router.replace(user.accountType === "super_admin" ? "/admin" : "/patient");
  }, [user, loading, router]);

  if (loading) return <PageLoader />;
  if (user) return <PageLoader />;

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const account = await login(email.trim(), password);
      router.push(account.accountType === "super_admin" ? "/admin" : "/patient");
    } catch (err) {
      setError(err.message || t("unableSignIn"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-stage relative min-h-screen overflow-x-hidden">
      <div className="login-wash pointer-events-none absolute inset-0" aria-hidden />

      <motion.div
        className="login-orb login-orb-a pointer-events-none absolute"
        aria-hidden
        animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="login-orb login-orb-b pointer-events-none absolute"
        aria-hidden
        animate={{ y: [0, 22, 0], x: [0, -14, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="login-ring pointer-events-none absolute"
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />

      <div className="login-lang-wrap">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="login-lang"
        >
          <LanguageSwitcher compact />
        </motion.div>
      </div>

      <div className="login-grid">
        <div className="login-intro">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" className="login-brand">
            <BrandMark size="hero" showTagline={false} />
          </motion.div>
        </div>

        <motion.form
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          onSubmit={onSubmit}
          className="login-card relative"
        >
          <div className="login-card-accent" aria-hidden />

          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--tiffany-deep)] sm:text-[0.7rem] sm:tracking-[0.2em]">
            {t("patientPortal")}
          </p>
          <h1 className="display login-card-title">{t("signIn")}</h1>
          <p className="login-card-help">{t("loginHelp")}</p>

          <div className="mt-6 space-y-4 sm:mt-9 sm:space-y-5">
            <div>
              <label className="label" htmlFor="email">
                {t("email")}
              </label>
              <div className="login-field-wrap">
                <HiOutlineMail className="login-field-icon" aria-hidden />
                <input
                  id="email"
                  className="field login-field"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="label" htmlFor="password">
                {t("password")}
              </label>
              <div className="login-field-wrap">
                <HiOutlineLockClosed className="login-field-icon" aria-hidden />
                <input
                  id="password"
                  className="field login-field login-field-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="login-eye"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </button>
              </div>
            </div>
          </div>

          {error ? (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 break-words rounded-xl bg-[rgba(196,91,91,0.1)] px-3 py-3 text-sm leading-snug text-[var(--accent)] sm:px-4"
            >
              {error}
            </motion.p>
          ) : null}

          <button type="submit" className="btn-primary login-submit mt-6 w-full sm:mt-8" disabled={submitting}>
            {submitting ? t("signingIn") : t("continue")}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
