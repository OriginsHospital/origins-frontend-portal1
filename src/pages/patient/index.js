import { useMemo } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiAlertTriangle,
  FiClipboard,
  FiCpu,
  FiMessageSquare,
  FiMic,
  FiPackage,
  FiPhoneCall
} from "react-icons/fi";
import { RequireAuth } from "@/components/RequireAuth";
import { Shell } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { usePatientNav } from "@/hooks/useNav";
import { usePortalQuery } from "@/hooks/usePortalQuery";

function HomeCard({ icon, title, hint, value, onClick, urgent, delay = 0 }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className={`home-card ${urgent ? "urgent" : ""}`}
      onClick={onClick}
    >
      <span className="home-card-icon">{icon}</span>
      <h2 className="home-card-title">{title}</h2>
      <p className="home-card-meta">{hint}</p>
      <span className="home-card-value">{value}</span>
    </motion.button>
  );
}

function PatientHome() {
  const router = useRouter();
  const { user } = useAuth();
  const { t, td, tDate, tDoctor, tMedicine } = useLanguage();
  const nav = usePatientNav();
  const { data, error } = usePortalQuery("/patient/dashboard");
  const firstName = user?.fullName?.split(" ")[0] || t("patientFallback");

  const today = data?.today || {};
  const medicineCount = today.medicines?.length || 0;
  const appointmentCount = today.appointments?.length || 0;
  const injectionCount = today.injections?.length || 0;
  const reportCount = data?.recentReports?.length || 0;

  const cards = useMemo(
    () => [
      {
        key: "meds",
        icon: <FiPackage />,
        title: t("cardTodayMedicines"),
        hint:
          medicineCount > 0
            ? today.medicines
                .slice(0, 2)
                .map(m => tMedicine(m.medicineName))
                .join(" · ")
            : t("cardTodayMedicinesHint"),
        value:
          medicineCount > 0
            ? t("itemsCount", { count: medicineCount })
            : t("noItemsToday"),
        href: "/patient/medicines"
      },
      {
        key: "appt",
        icon: <FiActivity />,
        title: t("cardTodayAppointment"),
        hint:
          appointmentCount > 0
            ? today.appointments
                .slice(0, 1)
                .map(
                  a =>
                    `${tDate(a.appointmentDate)} · ${td(a.type)} · ${tDoctor(
                      a.doctorName
                    )}`
                )
                .join("")
            : t("cardTodayAppointmentHint"),
        value:
          appointmentCount > 0
            ? t("appointmentsCount", { count: appointmentCount })
            : t("noItemsToday"),
        href: "/patient/treatments"
      },
      {
        key: "inj",
        icon: <FiActivity />,
        title: t("cardTodayInjection"),
        hint:
          injectionCount > 0
            ? today.injections
                .slice(0, 2)
                .map(m => tMedicine(m.medicineName))
                .join(" · ")
            : t("cardTodayInjectionHint"),
        value:
          injectionCount > 0
            ? t("itemsCount", { count: injectionCount })
            : t("noItemsToday"),
        href: "/patient/injections"
      },
      {
        key: "msg",
        icon: <FiMessageSquare />,
        title: t("cardDoctorMessage"),
        hint: today.doctorMessage?.title || t("cardDoctorMessageHint"),
        value: t("tapToOpen"),
        href: "/patient/messages"
      },
      {
        key: "emergency",
        icon: <FiPhoneCall />,
        title: t("cardEmergencyCall"),
        hint: t("cardEmergencyCallHint"),
        value: t("tapToCall"),
        href: "/patient/emergency",
        urgent: true
      },
      {
        key: "reports",
        icon: <FiClipboard />,
        title: t("cardReports"),
        hint: t("cardReportsHint"),
        value:
          reportCount > 0
            ? t("itemsCount", { count: reportCount })
            : t("tapToOpen"),
        href: "/patient/reports"
      },
      {
        key: "ai",
        icon: <FiCpu />,
        title: t("cardAiAssistant"),
        hint: t("cardAiAssistantHint"),
        value: t("tapToChat"),
        href: "/patient/ai"
      },
      {
        key: "voice",
        icon: <FiMic />,
        title: t("cardVoiceAssistant"),
        hint: t("cardVoiceAssistantHint"),
        value: t("tapToSpeak"),
        href: "/patient/voice"
      }
    ],
    [
      t,
      td,
      tDate,
      tDoctor,
      tMedicine,
      medicineCount,
      appointmentCount,
      injectionCount,
      reportCount,
      today
    ]
  );

  return (
    <Shell
      title={t("welcome", { name: firstName })}
      subtitle={t("homeToday")}
      navItems={nav}
    >
      {error ? (
        <p className="mb-4 rounded-xl bg-[rgba(184,90,58,0.1)] px-4 py-3 text-sm text-[var(--accent)]">
          {error}
        </p>
      ) : null}

      <div className="home-grid">
        {cards.map((card, idx) => (
          <HomeCard
            key={card.key}
            icon={card.icon}
            title={card.title}
            hint={card.hint}
            value={card.value}
            urgent={card.urgent}
            delay={idx * 0.04}
            onClick={() => router.push(card.href)}
          />
        ))}
      </div>

      {today.doctorMessage?.body ? (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="panel mt-6"
        >
          <div className="flex items-start gap-3">
            <span className="home-card-icon !mb-0">
              <FiAlertTriangle />
            </span>
            <div>
              <p className="label">{t("cardDoctorMessage")}</p>
              <p className="mt-1 text-sm leading-relaxed text-[rgba(11,47,54,0.72)]">
                {today.doctorMessage.body}
              </p>
            </div>
          </div>
        </motion.section>
      ) : null}
    </Shell>
  );
}

export default function PatientPage() {
  return (
    <RequireAuth role="patient">
      <PatientHome />
    </RequireAuth>
  );
}
