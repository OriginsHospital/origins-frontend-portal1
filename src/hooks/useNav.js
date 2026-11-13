import {
  FiActivity,
  FiClipboard,
  FiHome,
  FiPackage,
  FiSettings,
  FiUserPlus,
  FiUsers
} from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

export function usePatientNav() {
  const { t } = useLanguage();
  return [
    { href: "/patient", label: t("navHome"), shortLabel: t("navHomeShort"), icon: <FiHome /> },
    {
      href: "/patient/medicines",
      label: t("navMedicines"),
      shortLabel: t("navMedicinesShort"),
      icon: <FiPackage />
    },
    {
      href: "/patient/reports",
      label: t("navReports"),
      shortLabel: t("navReportsShort"),
      icon: <FiClipboard />
    },
    {
      href: "/patient/treatments",
      label: t("navTreatments"),
      shortLabel: t("navTreatmentsShort"),
      icon: <FiActivity />
    },
    {
      href: "/patient/settings",
      label: t("navSettings"),
      shortLabel: t("navSettingsShort"),
      icon: <FiSettings />
    }
  ];
}

export function useAdminNav() {
  const { t } = useLanguage();
  return [
    {
      href: "/admin",
      label: t("navOverview"),
      shortLabel: t("navOverviewShort"),
      icon: <FiHome />
    },
    {
      href: "/admin/staff",
      label: t("navCreateStaff"),
      shortLabel: t("navCreateStaffShort"),
      icon: <FiUserPlus />
    },
    {
      href: "/admin/patient-logins",
      label: t("navPatientLogins"),
      shortLabel: t("navPatientLoginsShort"),
      icon: <FiUsers />
    },
    {
      href: "/admin/settings",
      label: t("navSettings"),
      shortLabel: t("navSettingsShort"),
      icon: <FiSettings />
    }
  ];
}
