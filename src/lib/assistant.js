export function buildAssistantReply(question, data, t) {
  const q = String(question || "").toLowerCase();
  const today = data?.today || {};
  const medicines = today.medicines || [];
  const appointments = today.appointments || [];
  const injections = today.injections || [];
  const reports = data?.recentReports || [];

  if (/emergency|urgent|help|అత్యవసర|आपातकाल/.test(q)) {
    const phone = today.emergency?.phone || "18001234567";
    return `${t("cardEmergencyCall")}: ${phone}. ${t("emergencyNote")}`;
  }

  if (/inject|injection|ఇంజెక|इंजेक्शन/.test(q)) {
    if (!injections.length) return t("noItemsToday");
    return injections
      .slice(0, 4)
      .map(m => `${m.medicineName || t("medicine")}${m.prescriptionDetails ? ` (${m.prescriptionDetails})` : ""}`)
      .join("; ");
  }

  if (/medicine|tablet|pill|మందు|दवाई/.test(q)) {
    if (!medicines.length) return t("noItemsToday");
    return medicines
      .slice(0, 5)
      .map(m => `${m.medicineName || t("medicine")}${m.prescriptionDetails ? ` — ${m.prescriptionDetails}` : ""}`)
      .join("; ");
  }

  if (/appoint|visit|doctor|అపాయింట|अपॉइंट|డాక్టర|डॉक्टर/.test(q)) {
    if (!appointments.length) return t("noItemsToday");
    return appointments
      .slice(0, 4)
      .map(
        a =>
          `${a.appointmentDate || ""} ${a.type || ""} ${a.doctorName || ""}`.trim()
      )
      .join("; ");
  }

  if (/report|lab|రిపోర్ట|रिपोर्ट|lab/.test(q)) {
    if (!reports.length) return t("noLabReports");
    return reports
      .slice(0, 4)
      .map(r => `${r.labTestName || ""} (${r.reportStatus || ""})`.trim())
      .join("; ");
  }

  if (/message|doctor message|సందేశ|संदेश/.test(q)) {
    return today.doctorMessage?.body || t("noDoctorMessage");
  }

  return t("aiWelcome");
}
