export const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "hi", label: "Hindi", native: "हिन्दी" }
];

const en = {
  patientPortal: "Patient Portal",
  signedIn: "Signed in",
  signOut: "Sign out",
  language: "Language",
  settings: "Settings",
  settingsTitle: "Settings",
  settingsSubtitle: "Choose your preferred language for the portal.",
  languageHint: "All portal screens will switch to the selected language.",
  saveLanguage: "Language updated",

  navOverview: "Overview",
  navOverviewShort: "Home",
  navMedicines: "Medicines",
  navMedicinesShort: "Meds",
  navReports: "Reports",
  navReportsShort: "Reports",
  navTreatments: "Treatments",
  navTreatmentsShort: "Care",
  navCreateStaff: "Create staff",
  navCreateStaffShort: "Staff",
  navPatientLogins: "Patient logins",
  navPatientLoginsShort: "Logins",
  navSettings: "Settings",
  navSettingsShort: "Settings",

  loginHero:
    "Your care journey, medicines, reports, and treatment progress — in one calm place.",
  chipPatientAccess: "Patient access",
  chipSuperAdmin: "Super admin controls",
  chipSeparateHms: "Separate from staff HMS",
  signIn: "Sign in",
  loginHelp: "Use your portal credentials created by Origins administration.",
  email: "Email",
  password: "Password",
  continue: "Continue",
  signingIn: "Signing in…",
  unableSignIn: "Unable to sign in",

  welcome: "Welcome, {name}",
  patientFallback: "Patient",
  patientHomeSubtitle:
    "Track prescribed medicines, lab reports, and the treatment currently in progress.",
  activeVisits: "Active visits",
  openTreatmentCycles: "Open treatment cycles",
  medicines: "Medicines",
  prescribedItems: "Prescribed items",
  labReports: "Lab reports",
  orderedCompleted: "Ordered / completed",
  upcoming: "Upcoming",
  appointmentsAhead: "Appointments ahead",
  currentTreatment: "Current treatment",
  ongoing: "Ongoing",
  closed: "Closed",
  visit: "Visit",
  started: "Started",
  noActiveVisit:
    "No active visit right now. Your care team will update this when a cycle starts.",
  profile: "Profile",
  patientId: "Patient ID",
  mobile: "Mobile",
  branch: "Branch",
  bloodGroup: "Blood group",
  loadingProfile: "Loading profile…",
  recentMedicines: "Recent medicines",
  recentReports: "Recent reports",
  viewAll: "View all",
  noPrescribedMedicines: "No prescribed medicines yet",
  noLabReports: "No lab reports yet",
  medicine: "Medicine",
  date: "Date",
  doctor: "Doctor",
  qty: "Qty",
  days: "days",
  test: "Test",
  status: "Status",
  type: "Type",
  completed: "Completed",
  inProgress: "In Progress",
  pending: "Pending",
  scheduled: "Scheduled",

  medicinesTitle: "Prescribed medicines",
  medicinesSubtitle:
    "Medicines prescribed during your consultations and treatment cycles.",
  noMedicinesFound: "No medicines found",
  noMedicinesHint: "Prescriptions will appear here once your doctor adds them.",
  instructions: "Instructions",
  appointment: "Appointment",
  prescribed: "Prescribed",
  purchased: "Purchased",

  reportsTitle: "Lab reports",
  reportsSubtitle: "Tests ordered for you and their current status.",
  noReportsYet: "No reports yet",
  noReportsHint: "Lab tests will show here after they are ordered in HMS.",
  context: "Context",

  treatmentsTitle: "Treatments & visits",
  treatmentsSubtitle:
    "See which treatment is going on and your appointment timeline.",
  visits: "Visits",
  appointments: "Appointments",
  noVisitsYet: "No visits yet",
  noAppointmentsYet: "No appointments yet",
  package: "Package",
  activeVisit: "Active visit",

  adminTitle: "Super admin",
  adminSubtitle:
    "Create HMS staff accounts and patient portal logins without changing the existing Origins HMS flow.",
  staffUsers: "Staff users",
  existingHmsUsers: "Existing HMS users",
  patientLogins: "Patient logins",
  portalAccountsLinked: "Portal accounts linked to patients",
  activePatientLogins: "Active patient logins",
  canCurrentlySignIn: "Can currently sign in",
  staffCreation: "Staff creation",
  staffCreationHint:
    "Creates a verified user in the existing HMS users table so they can log into the staff app immediately.",
  createStaffUser: "Create staff user",
  patientLogin: "Patient login",
  patientLoginHint:
    "Search an already registered patient, select them, then create portal credentials. Logins cannot be created for patients who do not exist yet.",
  managePatientLogins: "Manage patient logins",
  recentPatientLogins: "Recent patient logins",
  noPatientLoginsYet: "No patient logins yet",
  noPatientLoginsHint:
    "Select an existing patient from HMS and create their portal access.",
  patient: "Patient",
  code: "Code",
  active: "Active",
  disabled: "Disabled",
  enable: "Enable",
  disable: "Disable",
  name: "Name",
  role: "Role",
  verified: "Verified",
  yes: "Yes",
  no: "No",

  createStaffTitle: "Create staff",
  createStaffSubtitle:
    "Staff accounts are created in the existing HMS users system (pre-verified). This is separate from patient portal logins.",
  fullName: "Full name",
  username: "Username",
  selectRole: "Select role",
  aadhaarOptional: "Aadhaar (optional)",
  branches: "Branches",
  modulesOptional: "Modules (optional)",
  creating: "Creating…",
  currentStaff: "Current staff",
  staffCreated: "Staff created",

  patientLoginsTitle: "Patient logins",
  patientLoginsSubtitle:
    "Only patients already registered in Origins HMS can receive portal credentials. Select the patient, then create email and password.",
  selectExistingPatient: "1. Select existing patient",
  searchPatientsPlaceholder: "Search by name, patient ID, mobile, email…",
  searching: "Searching…",
  eligiblePatients: "{count} eligible patients",
  noPatientsFound: "No patients found",
  noPatientsHint:
    "Patients must already exist in the old HMS before a portal login can be created.",
  loginExists: "Login exists",
  available: "Available",
  createLoginStep: "2. Create login",
  choosePatientHint:
    "Choose a patient without an existing portal login to continue.",
  selectedPatient: "Selected patient",
  portalEmail: "Portal email",
  portalPassword: "Portal password",
  createPatientLogin: "Create patient login",
  existingPatientLogins: "Existing patient logins",
  noLoginsCreated: "No logins created yet",
  patientAlreadyHasLogin: "This patient already has a portal login.",
  selectPatientFirst: "Select an existing patient first.",
  patientLoginCreated: "Patient login created",
  action: "Action",

  homeToday: "Today at Origins",
  cardTodayMedicines: "Today's Medicines",
  cardTodayMedicinesHint: "Medicines planned for today",
  cardTodayAppointment: "Today's Appointment",
  cardTodayAppointmentHint: "Your visit schedule today",
  cardTodayInjection: "Today's Injection",
  cardTodayInjectionHint: "Injection reminders for today",
  cardDoctorMessage: "Doctor Message",
  cardDoctorMessageHint: "Notes from your care team",
  cardEmergencyCall: "Emergency Call",
  cardEmergencyCallHint: "Call Origins helpline now",
  cardReports: "Reports",
  cardReportsHint: "Lab reports and results",
  cardAiAssistant: "AI Assistant",
  cardAiAssistantHint: "Ask care questions anytime",
  cardVoiceAssistant: "Voice Assistant",
  cardVoiceAssistantHint: "Talk to Origins assistant",
  itemsCount: "{count} items",
  appointmentsCount: "{count} today",
  noItemsToday: "None for today",
  tapToOpen: "Open",
  tapToCall: "Call now",
  tapToChat: "Chat",
  tapToSpeak: "Speak",
  viewDetails: "View details",
  emergencyTitle: "Emergency support",
  emergencySubtitle: "If this is urgent, call the Origins helpline immediately.",
  callHelpline: "Call helpline",
  emergencyNote: "Available 24×7 for registered patients.",
  doctorMessageTitle: "Doctor message",
  doctorMessageSubtitle: "Latest guidance from your care team.",
  noDoctorMessage: "No new messages right now.",
  aiTitle: "AI Assistant",
  aiSubtitle: "Ask about medicines, visits, reports, or your treatment journey.",
  aiPlaceholder: "Type your question…",
  aiSend: "Send",
  aiWelcome:
    "Hi, I am the Origins AI assistant. Ask me about today's medicines, appointments, injections, or reports.",
  voiceTitle: "Voice Assistant",
  voiceSubtitle: "Tap the mic and speak your question.",
  voiceListening: "Listening…",
  voiceTapToSpeak: "Tap to speak",
  voiceStop: "Stop",
  voiceUnsupported: "Voice input is not supported in this browser.",
  voiceHeard: "You said",
  navHome: "Home",
  navHomeShort: "Home"
};

const te = {
  patientPortal: "పేషెంట్ పోర్టల్",
  signedIn: "సైన్ ఇన్ అయ్యారు",
  signOut: "సైన్ అవుట్",
  language: "భాష",
  settings: "సెట్టింగ్స్",
  settingsTitle: "సెట్టింగ్స్",
  settingsSubtitle: "పోర్టల్ కోసం మీకు నచ్చిన భాషను ఎంచుకోండి.",
  languageHint: "ఎంచుకున్న భాషకు పోర్టల్ అన్ని స్క్రీన్లు మారతాయి.",
  saveLanguage: "భాష నవీకరించబడింది",

  navOverview: "అవలోకనం",
  navOverviewShort: "హోమ్",
  navMedicines: "మందులు",
  navMedicinesShort: "మందులు",
  navReports: "రిపోర్టులు",
  navReportsShort: "రిపోర్ట్",
  navTreatments: "చికిత్సలు",
  navTreatmentsShort: "చికిత్స",
  navCreateStaff: "స్టాఫ్ సృష్టించండి",
  navCreateStaffShort: "స్టాఫ్",
  navPatientLogins: "పేషెంట్ లాగిన్లు",
  navPatientLoginsShort: "లాగిన్",
  navSettings: "సెట్టింగ్స్",
  navSettingsShort: "సెట్",

  loginHero:
    "మీ సంరక్షణ ప్రయాణం, మందులు, రిపోర్టులు మరియు చికిత్స పురోగతి — ఒక ప్రశాంత స్థలంలో.",
  chipPatientAccess: "పేషెంట్ యాక్సెస్",
  chipSuperAdmin: "సూపర్ అడ్మిన్ నియంత్రణలు",
  chipSeparateHms: "స్టాఫ్ HMS నుండి వేరు",
  signIn: "సైన్ ఇన్",
  loginHelp: "Origins అడ్మినిస్ట్రేషన్ సృష్టించిన పోర్టల్ క్రెడెన్షియల్స్ ఉపయోగించండి.",
  email: "ఇమెయిల్",
  password: "పాస్‌వర్డ్",
  continue: "కొనసాగించండి",
  signingIn: "సైన్ ఇన్ అవుతోంది…",
  unableSignIn: "సైన్ ఇన్ చేయలేకపోయాము",

  welcome: "స్వాగతం, {name}",
  patientFallback: "పేషెంట్",
  patientHomeSubtitle:
    "సూచించిన మందులు, ల్యాబ్ రిపోర్టులు మరియు ప్రస్తుత చికిత్సను ట్రాక్ చేయండి.",
  activeVisits: "యాక్టివ్ విజిట్లు",
  openTreatmentCycles: "తెరిచి ఉన్న చికిత్స సైకిల్స్",
  medicines: "మందులు",
  prescribedItems: "సూచించిన అంశాలు",
  labReports: "ల్యాబ్ రిపోర్టులు",
  orderedCompleted: "ఆర్డర్ / పూర్తయినవి",
  upcoming: "రాబోయేవి",
  appointmentsAhead: "ముందున్న అపాయింట్‌మెంట్లు",
  currentTreatment: "ప్రస్తుత చికిత్స",
  ongoing: "కొనసాగుతోంది",
  closed: "మూసివేయబడింది",
  visit: "విజిట్",
  started: "ప్రారంభం",
  noActiveVisit:
    "ప్రస్తుతం యాక్టివ్ విజిట్ లేదు. సైకిల్ ప్రారంభమైనప్పుడు మీ కేర్ టీమ్ అప్‌డేట్ చేస్తుంది.",
  profile: "ప్రొఫైల్",
  patientId: "పేషెంట్ ID",
  mobile: "మొబైల్",
  branch: "బ్రాంచ్",
  bloodGroup: "బ్లడ్ గ్రూప్",
  loadingProfile: "ప్రొఫైల్ లోడ్ అవుతోంది…",
  recentMedicines: "ఇటీవలి మందులు",
  recentReports: "ఇటీవలి రిపోర్టులు",
  viewAll: "అన్నీ చూడండి",
  noPrescribedMedicines: "ఇంకా సూచించిన మందులు లేవు",
  noLabReports: "ఇంకా ల్యాబ్ రిపోర్టులు లేవు",
  medicine: "మందు",
  date: "తేదీ",
  doctor: "డాక్టర్",
  qty: "పరిమాణం",
  days: "రోజులు",
  test: "పరీక్ష",
  status: "స్థితి",
  type: "రకం",
  completed: "పూర్తయింది",
  inProgress: "ప్రగతిలో ఉంది",
  pending: "పెండింగ్",
  scheduled: "షెడ్యూల్ అయింది",

  medicinesTitle: "సూచించిన మందులు",
  medicinesSubtitle:
    "మీ కన్సల్టేషన్లు మరియు చికిత్స సైకిల్స్ సమయంలో సూచించిన మందులు.",
  noMedicinesFound: "మందులు కనుగొనబడలేదు",
  noMedicinesHint: "డాక్టర్ జోడించిన తర్వాత ప్రిస్క్రిప్షన్లు ఇక్కడ కనిపిస్తాయి.",
  instructions: "సూచనలు",
  appointment: "అపాయింట్‌మెంట్",
  prescribed: "సూచించినవి",
  purchased: "కొనుగోలు చేసినవి",

  reportsTitle: "ల్యాబ్ రిపోర్టులు",
  reportsSubtitle: "మీ కోసం ఆర్డర్ చేసిన పరీక్షలు మరియు వాటి ప్రస్తుత స్థితి.",
  noReportsYet: "ఇంకా రిపోర్టులు లేవు",
  noReportsHint: "HMSలో ఆర్డర్ చేసిన తర్వాత ల్యాబ్ పరీక్షలు ఇక్కడ కనిపిస్తాయి.",
  context: "సందర్భం",

  treatmentsTitle: "చికిత్సలు & విజిట్లు",
  treatmentsSubtitle: "ఏ చికిత్స జరుగుతోందో మరియు అపాయింట్‌మెంట్ టైమ్‌లైన్ చూడండి.",
  visits: "విజిట్లు",
  appointments: "అపాయింట్‌మెంట్లు",
  noVisitsYet: "ఇంకా విజిట్లు లేవు",
  noAppointmentsYet: "ఇంకా అపాయింట్‌మెంట్లు లేవు",
  package: "ప్యాకేజీ",
  activeVisit: "యాక్టివ్ విజిట్",

  adminTitle: "సూపర్ అడ్మిన్",
  adminSubtitle:
    "ఉన్న Origins HMS ఫ్లోను మార్చకుండా HMS స్టాఫ్ ఖాతాలు మరియు పేషెంట్ పోర్టల్ లాగిన్లు సృష్టించండి.",
  staffUsers: "స్టాఫ్ వినియోగదారులు",
  existingHmsUsers: "ఉన్న HMS వినియోగదారులు",
  patientLogins: "పేషెంట్ లాగిన్లు",
  portalAccountsLinked: "పేషెంట్లకు లింక్ అయిన పోర్టల్ ఖాతాలు",
  activePatientLogins: "యాక్టివ్ పేషెంట్ లాగిన్లు",
  canCurrentlySignIn: "ప్రస్తుతం సైన్ ఇన్ చేయవచ్చు",
  staffCreation: "స్టాఫ్ సృష్టి",
  staffCreationHint:
    "ఉన్న HMS users టేబుల్‌లో వెరిఫైడ్ యూజర్ సృష్టిస్తుంది, వెంటనే స్టాఫ్ యాప్‌లో లాగిన్ అవుతారు.",
  createStaffUser: "స్టాఫ్ యూజర్ సృష్టించండి",
  patientLogin: "పేషెంట్ లాగిన్",
  patientLoginHint:
    "ఇప్పటికే నమోదైన పేషెంట్‌ను వెతికి ఎంచుకుని పోర్టల్ క్రెడెన్షియల్స్ సృష్టించండి. లేని పేషెంట్‌కు లాగిన్ సృష్టించలేరు.",
  managePatientLogins: "పేషెంట్ లాగిన్లు నిర్వహించండి",
  recentPatientLogins: "ఇటీవలి పేషెంట్ లాగిన్లు",
  noPatientLoginsYet: "ఇంకా పేషెంట్ లాగిన్లు లేవు",
  noPatientLoginsHint:
    "HMS నుండి ఉన్న పేషెంట్‌ను ఎంచుకుని పోర్టల్ యాక్సెస్ సృష్టించండి.",
  patient: "పేషెంట్",
  code: "కోడ్",
  active: "యాక్టివ్",
  disabled: "డిసేబుల్",
  enable: "ఎనేబుల్",
  disable: "డిసేబుల్",
  name: "పేరు",
  role: "రోల్",
  verified: "వెరిఫైడ్",
  yes: "అవును",
  no: "కాదు",

  createStaffTitle: "స్టాఫ్ సృష్టించండి",
  createStaffSubtitle:
    "స్టాఫ్ ఖాతాలు ఉన్న HMS యూజర్స్ సిస్టమ్‌లో (ప్రీ-వెరిఫైడ్) సృష్టించబడతాయి. ఇది పేషెంట్ పోర్టల్ లాగిన్ల నుండి వేరు.",
  fullName: "పూర్తి పేరు",
  username: "యూజర్‌నేమ్",
  selectRole: "రోల్ ఎంచుకోండి",
  aadhaarOptional: "ఆధార్ (ఐచ్ఛికం)",
  branches: "బ్రాంచ్‌లు",
  modulesOptional: "మాడ్యూల్స్ (ఐచ్ఛికం)",
  creating: "సృష్టిస్తోంది…",
  currentStaff: "ప్రస్తుత స్టాఫ్",
  staffCreated: "స్టాఫ్ సృష్టించబడింది",

  patientLoginsTitle: "పేషెంట్ లాగిన్లు",
  patientLoginsSubtitle:
    "Origins HMSలో ఇప్పటికే నమోదైన పేషెంట్లకు మాత్రమే పోర్టల్ క్రెడెన్షియల్స్ ఇవ్వవచ్చు. పేషెంట్‌ను ఎంచుకుని ఇమెయిల్ మరియు పాస్‌వర్డ్ సృష్టించండి.",
  selectExistingPatient: "1. ఉన్న పేషెంట్‌ను ఎంచుకోండి",
  searchPatientsPlaceholder: "పేరు, పేషెంట్ ID, మొబైల్, ఇమెయిల్ ద్వారా వెతకండి…",
  searching: "వెతుకుతోంది…",
  eligiblePatients: "{count} అర్హత గల పేషెంట్లు",
  noPatientsFound: "పేషెంట్లు కనుగొనబడలేదు",
  noPatientsHint:
    "పోర్టల్ లాగిన్ సృష్టించడానికి ముందు పేషెంట్ పాత HMSలో ఉండాలి.",
  loginExists: "లాగిన్ ఉంది",
  available: "అందుబాటులో",
  createLoginStep: "2. లాగిన్ సృష్టించండి",
  choosePatientHint:
    "ఇప్పటికే పోర్టల్ లాగిన్ లేని పేషెంట్‌ను ఎంచుకోండి.",
  selectedPatient: "ఎంచుకున్న పేషెంట్",
  portalEmail: "పోర్టల్ ఇమెయిల్",
  portalPassword: "పోర్టల్ పాస్‌వర్డ్",
  createPatientLogin: "పేషెంట్ లాగిన్ సృష్టించండి",
  existingPatientLogins: "ఉన్న పేషెంట్ లాగిన్లు",
  noLoginsCreated: "ఇంకా లాగిన్లు సృష్టించలేదు",
  patientAlreadyHasLogin: "ఈ పేషెంట్‌కు ఇప్పటికే పోర్టల్ లాగిన్ ఉంది.",
  selectPatientFirst: "ముందుగా ఉన్న పేషెంట్‌ను ఎంచుకోండి.",
  patientLoginCreated: "పేషెంట్ లాగిన్ సృష్టించబడింది",
  action: "చర్య",

  homeToday: "ఈరోజు Origins వద్ద",
  cardTodayMedicines: "నేటి మందులు",
  cardTodayMedicinesHint: "ఈరోజు తీసుకోవాల్సిన మందులు",
  cardTodayAppointment: "నేటి అపాయింట్‌మెంట్",
  cardTodayAppointmentHint: "ఈరోజు మీ విజిట్ షెడ్యూల్",
  cardTodayInjection: "నేటి ఇంజెక్షన్",
  cardTodayInjectionHint: "ఈరోజు ఇంజెక్షన్ రిమైండర్లు",
  cardDoctorMessage: "డాక్టర్ సందేశం",
  cardDoctorMessageHint: "మీ కేర్ టీమ్ నుండి నోట్స్",
  cardEmergencyCall: "అత్యవసర కాల్",
  cardEmergencyCallHint: "Origins హెల్ప్‌లైన్‌కు కాల్ చేయండి",
  cardReports: "రిపోర్టులు",
  cardReportsHint: "ల్యాబ్ రిపోర్టులు మరియు ఫలితాలు",
  cardAiAssistant: "AI అసిస్టెంట్",
  cardAiAssistantHint: "ఎప్పుడైనా కేర్ ప్రశ్నలు అడగండి",
  cardVoiceAssistant: "వాయిస్ అసిస్టెంట్",
  cardVoiceAssistantHint: "Origins అసిస్టెంట్‌తో మాట్లాడండి",
  itemsCount: "{count} అంశాలు",
  appointmentsCount: "{count} ఈరోజు",
  noItemsToday: "ఈరోజు ఏవీ లేవు",
  tapToOpen: "తెరవండి",
  tapToCall: "ఇప్పుడే కాల్ చేయండి",
  tapToChat: "చాట్",
  tapToSpeak: "మాట్లాడండి",
  viewDetails: "వివరాలు చూడండి",
  emergencyTitle: "అత్యవసర సహాయం",
  emergencySubtitle: "అత్యవసరమైతే వెంటనే Origins హెల్ప్‌లైన్‌కు కాల్ చేయండి.",
  callHelpline: "హెల్ప్‌లైన్‌కు కాల్",
  emergencyNote: "నమోదైన పేషెంట్లకు 24×7 అందుబాటులో ఉంది.",
  doctorMessageTitle: "డాక్టర్ సందేశం",
  doctorMessageSubtitle: "మీ కేర్ టీమ్ నుండి తాజా మార్గదర్శకం.",
  noDoctorMessage: "ప్రస్తుతం కొత్త సందేశాలు లేవు.",
  aiTitle: "AI అసిస్టెంట్",
  aiSubtitle: "మందులు, విజిట్లు, రిపోర్టులు లేదా చికిత్స గురించి అడగండి.",
  aiPlaceholder: "మీ ప్రశ్న టైప్ చేయండి…",
  aiSend: "పంపండి",
  aiWelcome:
    "నమస్కారం, నేను Origins AI అసిస్టెంట్. నేటి మందులు, అపాయింట్‌మెంట్లు, ఇంజెక్షన్లు లేదా రిపోర్టుల గురించి అడగండి.",
  voiceTitle: "వాయిస్ అసిస్టెంట్",
  voiceSubtitle: "మైక్‌ను నొక్కి మీ ప్రశ్న చెప్పండి.",
  voiceListening: "వింటోంది…",
  voiceTapToSpeak: "మాట్లాడటానికి నొక్కండి",
  voiceStop: "ఆపండి",
  voiceUnsupported: "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ సపోర్ట్ లేదు.",
  voiceHeard: "మీరు చెప్పింది",
  navHome: "హోమ్",
  navHomeShort: "హోమ్"
};

const hi = {
  patientPortal: "पेशेंट पोर्टल",
  signedIn: "साइन इन",
  signOut: "साइन आउट",
  language: "भाषा",
  settings: "सेटिंग्स",
  settingsTitle: "सेटिंग्स",
  settingsSubtitle: "पोर्टल के लिए अपनी पसंदीदा भाषा चुनें।",
  languageHint: "चुनी गई भाषा में सभी पोर्टल स्क्रीन बदल जाएँगी।",
  saveLanguage: "भाषा अपडेट हो गई",

  navOverview: "अवलोकन",
  navOverviewShort: "होम",
  navMedicines: "दवाईयाँ",
  navMedicinesShort: "दवाई",
  navReports: "रिपोर्ट्स",
  navReportsShort: "रिपोर्ट",
  navTreatments: "उपचार",
  navTreatmentsShort: "उपचार",
  navCreateStaff: "स्टाफ बनाएँ",
  navCreateStaffShort: "स्टाफ",
  navPatientLogins: "पेशेंट लॉगिन",
  navPatientLoginsShort: "लॉगिन",
  navSettings: "सेटिंग्स",
  navSettingsShort: "सेटिंग",

  loginHero:
    "आपकी देखभाल यात्रा, दवाईयाँ, रिपोर्ट्स और उपचार प्रगति — एक शांत जगह पर।",
  chipPatientAccess: "पेशेंट एक्सेस",
  chipSuperAdmin: "सुपर एडमिन नियंत्रण",
  chipSeparateHms: "स्टाफ HMS से अलग",
  signIn: "साइन इन",
  loginHelp: "Origins प्रशासन द्वारा बनाए गए पोर्टल क्रेडेंशियल्स का उपयोग करें।",
  email: "ईमेल",
  password: "पासवर्ड",
  continue: "जारी रखें",
  signingIn: "साइन इन हो रहा है…",
  unableSignIn: "साइन इन नहीं हो सका",

  welcome: "स्वागत है, {name}",
  patientFallback: "पेशेंट",
  patientHomeSubtitle:
    "निर्धारित दवाईयाँ, लैब रिपोर्ट्स और चल रहे उपचार को ट्रैक करें।",
  activeVisits: "सक्रिय विज़िट",
  openTreatmentCycles: "खुले उपचार चक्र",
  medicines: "दवाईयाँ",
  prescribedItems: "निर्धारित आइटम",
  labReports: "लैब रिपोर्ट्स",
  orderedCompleted: "ऑर्डर / पूर्ण",
  upcoming: "आगामी",
  appointmentsAhead: "आने वाली अपॉइंटमेंट",
  currentTreatment: "वर्तमान उपचार",
  ongoing: "चल रहा है",
  closed: "बंद",
  visit: "विज़िट",
  started: "शुरू",
  noActiveVisit:
    "अभी कोई सक्रिय विज़िट नहीं है। चक्र शुरू होने पर आपकी केयर टीम अपडेट करेगी।",
  profile: "प्रोफ़ाइल",
  patientId: "पेशेंट ID",
  mobile: "मोबाइल",
  branch: "ब्रांच",
  bloodGroup: "ब्लड ग्रुप",
  loadingProfile: "प्रोफ़ाइल लोड हो रही है…",
  recentMedicines: "हाल की दवाईयाँ",
  recentReports: "हाल की रिपोर्ट्स",
  viewAll: "सभी देखें",
  noPrescribedMedicines: "अभी तक कोई निर्धारित दवाई नहीं",
  noLabReports: "अभी तक कोई लैब रिपोर्ट नहीं",
  medicine: "दवाई",
  date: "तारीख",
  doctor: "डॉक्टर",
  qty: "मात्रा",
  days: "दिन",
  test: "टेस्ट",
  status: "स्थिति",
  type: "प्रकार",
  completed: "पूर्ण",
  inProgress: "प्रगति में",
  pending: "लंबित",
  scheduled: "निर्धारित",

  medicinesTitle: "निर्धारित दवाईयाँ",
  medicinesSubtitle:
    "आपकी परामर्श और उपचार चक्रों के दौरान निर्धारित दवाईयाँ।",
  noMedicinesFound: "कोई दवाई नहीं मिली",
  noMedicinesHint: "डॉक्टर जोड़ने के बाद प्रिस्क्रिप्शन यहाँ दिखेंगे।",
  instructions: "निर्देश",
  appointment: "अपॉइंटमेंट",
  prescribed: "निर्धारित",
  purchased: "खरीदी गई",

  reportsTitle: "लैब रिपोर्ट्स",
  reportsSubtitle: "आपके लिए ऑर्डर किए गए टेस्ट और उनकी वर्तमान स्थिति।",
  noReportsYet: "अभी तक कोई रिपोर्ट नहीं",
  noReportsHint: "HMS में ऑर्डर होने के बाद लैब टेस्ट यहाँ दिखेंगे।",
  context: "संदर्भ",

  treatmentsTitle: "उपचार और विज़िट",
  treatmentsSubtitle: "देखें कौन सा उपचार चल रहा है और आपकी अपॉइंटमेंट टाइमलाइन।",
  visits: "विज़िट",
  appointments: "अपॉइंटमेंट",
  noVisitsYet: "अभी तक कोई विज़िट नहीं",
  noAppointmentsYet: "अभी तक कोई अपॉइंटमेंट नहीं",
  package: "पैकेज",
  activeVisit: "सक्रिय विज़िट",

  adminTitle: "सुपर एडमिन",
  adminSubtitle:
    "मौजूदा Origins HMS फ्लो बदले बिना HMS स्टाफ खाते और पेशेंट पोर्टल लॉगिन बनाएँ।",
  staffUsers: "स्टाफ उपयोगकर्ता",
  existingHmsUsers: "मौजूदा HMS उपयोगकर्ता",
  patientLogins: "पेशेंट लॉगिन",
  portalAccountsLinked: "पेशेंट से जुड़े पोर्टल खाते",
  activePatientLogins: "सक्रिय पेशेंट लॉगिन",
  canCurrentlySignIn: "अभी साइन इन कर सकते हैं",
  staffCreation: "स्टाफ निर्माण",
  staffCreationHint:
    "मौजूदा HMS users टेबल में वेरिफाइड यूज़र बनाता है ताकि वे तुरंत स्टाफ ऐप में लॉगिन कर सकें।",
  createStaffUser: "स्टाफ यूज़र बनाएँ",
  patientLogin: "पेशेंट लॉगिन",
  patientLoginHint:
    "पहले से पंजीकृत पेशेंट खोजें, चुनें, फिर पोर्टल क्रेडेंशियल बनाएँ। जो पेशेंट मौजूद नहीं है उसके लिए लॉगिन नहीं बन सकता।",
  managePatientLogins: "पेशेंट लॉगिन प्रबंधित करें",
  recentPatientLogins: "हाल के पेशेंट लॉगिन",
  noPatientLoginsYet: "अभी तक कोई पेशेंट लॉगिन नहीं",
  noPatientLoginsHint:
    "HMS से मौजूदा पेशेंट चुनें और उनका पोर्टल एक्सेस बनाएँ।",
  patient: "पेशेंट",
  code: "कोड",
  active: "सक्रिय",
  disabled: "अक्षम",
  enable: "सक्षम करें",
  disable: "अक्षम करें",
  name: "नाम",
  role: "रोल",
  verified: "वेरिफाइड",
  yes: "हाँ",
  no: "नहीं",

  createStaffTitle: "स्टाफ बनाएँ",
  createStaffSubtitle:
    "स्टाफ खाते मौजूदा HMS यूज़र्स सिस्टम में (प्री-वेरिफाइड) बनाए जाते हैं। यह पेशेंट पोर्टल लॉगिन से अलग है।",
  fullName: "पूरा नाम",
  username: "यूज़रनेम",
  selectRole: "रोल चुनें",
  aadhaarOptional: "आधार (वैकल्पिक)",
  branches: "ब्रांच",
  modulesOptional: "मॉड्यूल्स (वैकल्पिक)",
  creating: "बनाया जा रहा है…",
  currentStaff: "वर्तमान स्टाफ",
  staffCreated: "स्टाफ बनाया गया",

  patientLoginsTitle: "पेशेंट लॉगिन",
  patientLoginsSubtitle:
    "केवल Origins HMS में पहले से पंजीकृत पेशेंट को पोर्टल क्रेडेंशियल मिल सकते हैं। पेशेंट चुनें, फिर ईमेल और पासवर्ड बनाएँ।",
  selectExistingPatient: "1. मौजूदा पेशेंट चुनें",
  searchPatientsPlaceholder: "नाम, पेशेंट ID, मोबाइल, ईमेल से खोजें…",
  searching: "खोज रहा है…",
  eligiblePatients: "{count} योग्य पेशेंट",
  noPatientsFound: "कोई पेशेंट नहीं मिला",
  noPatientsHint:
    "पोर्टल लॉगिन बनाने से पहले पेशेंट पुराने HMS में मौजूद होना चाहिए।",
  loginExists: "लॉगिन मौजूद",
  available: "उपलब्ध",
  createLoginStep: "2. लॉगिन बनाएँ",
  choosePatientHint:
    "जारी रखने के लिए बिना मौजूदा पोर्टल लॉगिन वाले पेशेंट को चुनें।",
  selectedPatient: "चयनित पेशेंट",
  portalEmail: "पोर्टल ईमेल",
  portalPassword: "पोर्टल पासवर्ड",
  createPatientLogin: "पेशेंट लॉगिन बनाएँ",
  existingPatientLogins: "मौजूदा पेशेंट लॉगिन",
  noLoginsCreated: "अभी तक कोई लॉगिन नहीं बना",
  patientAlreadyHasLogin: "इस पेशेंट के पास पहले से पोर्टल लॉगिन है।",
  selectPatientFirst: "पहले मौजूदा पेशेंट चुनें।",
  patientLoginCreated: "पेशेंट लॉगिन बनाया गया",
  action: "कार्रवाई",

  homeToday: "आज Origins पर",
  cardTodayMedicines: "आज की दवाईयाँ",
  cardTodayMedicinesHint: "आज लेने वाली दवाईयाँ",
  cardTodayAppointment: "आज की अपॉइंटमेंट",
  cardTodayAppointmentHint: "आज की विज़िट शेड्यूल",
  cardTodayInjection: "आज का इंजेक्शन",
  cardTodayInjectionHint: "आज के इंजेक्शन रिमाइंडर",
  cardDoctorMessage: "डॉक्टर संदेश",
  cardDoctorMessageHint: "आपकी केयर टीम के नोट्स",
  cardEmergencyCall: "आपातकालीन कॉल",
  cardEmergencyCallHint: "Origins हेल्पलाइन पर कॉल करें",
  cardReports: "रिपोर्ट्स",
  cardReportsHint: "लैब रिपोर्ट्स और परिणाम",
  cardAiAssistant: "AI असिस्टेंट",
  cardAiAssistantHint: "कभी भी केयर प्रश्न पूछें",
  cardVoiceAssistant: "वॉइस असिस्टेंट",
  cardVoiceAssistantHint: "Origins असिस्टेंट से बात करें",
  itemsCount: "{count} आइटम",
  appointmentsCount: "{count} आज",
  noItemsToday: "आज कुछ नहीं",
  tapToOpen: "खोलें",
  tapToCall: "अभी कॉल करें",
  tapToChat: "चैट",
  tapToSpeak: "बोलें",
  viewDetails: "विवरण देखें",
  emergencyTitle: "आपातकालीन सहायता",
  emergencySubtitle: "जरूरी हो तो तुरंत Origins हेल्पलाइन पर कॉल करें।",
  callHelpline: "हेल्पलाइन कॉल करें",
  emergencyNote: "पंजीकृत पेशेंट के लिए 24×7 उपलब्ध।",
  doctorMessageTitle: "डॉक्टर संदेश",
  doctorMessageSubtitle: "आपकी केयर टीम से नवीनतम मार्गदर्शन।",
  noDoctorMessage: "अभी कोई नया संदेश नहीं।",
  aiTitle: "AI असिस्टेंट",
  aiSubtitle: "दवाईयाँ, विज़िट, रिपोर्ट्स या उपचार के बारे में पूछें।",
  aiPlaceholder: "अपना प्रश्न लिखें…",
  aiSend: "भेजें",
  aiWelcome:
    "नमस्ते, मैं Origins AI असिस्टेंट हूँ। आज की दवाईयाँ, अपॉइंटमेंट, इंजेक्शन या रिपोर्ट्स के बारे में पूछें।",
  voiceTitle: "वॉइस असिस्टेंट",
  voiceSubtitle: "माइक दबाएँ और अपना प्रश्न बोलें।",
  voiceListening: "सुन रहा है…",
  voiceTapToSpeak: "बोलने के लिए दबाएँ",
  voiceStop: "रोकें",
  voiceUnsupported: "इस ब्राउज़र में वॉइस इनपुट समर्थित नहीं है।",
  voiceHeard: "आपने कहा",
  navHome: "होम",
  navHomeShort: "होम"
};

export const dictionaries = { en, te, hi };

export function translate(lang, key, vars = {}) {
  const dict = dictionaries[lang] || dictionaries.en;
  let text = dict[key] ?? dictionaries.en[key] ?? key;
  Object.entries(vars).forEach(([k, v]) => {
    text = text.replaceAll(`{${k}}`, String(v ?? ""));
  });
  return text;
}

const DATA_VALUES = {
  en: {
    PAID: "PAID",
    UNPAID: "UNPAID",
    PENDING: "PENDING",
    PARTIAL: "PARTIAL",
    REFUNDED: "REFUNDED",
    Consultation: "Consultation",
    Treatment: "Treatment",
    CONSULTATION: "Consultation",
    TREATMENT: "Treatment",
    Completed: "Completed",
    "In Progress": "In Progress",
    "In progress": "In Progress",
    Pending: "Pending",
    Scheduled: "Scheduled",
    Ongoing: "Ongoing",
    Closed: "Closed",
    Active: "Active",
    Disabled: "Disabled",
    Fertility: "Fertility",
    Visit: "Visit",
    "Active visit": "Active visit",
    Dr: "Dr.",
    Doctor: "Doctor",
    Branch: "Branch",
    Medicine: "Medicine",
    day: "day",
    days: "days",
    HS: "at bedtime",
    BD: "twice daily",
    TID: "thrice daily",
    QID: "four times daily",
    OD: "once daily",
    SOS: "as needed",
    STAT: "immediately",
    AC: "before food",
    PC: "after food",
    "2HS": "twice at bedtime",
    "1HS": "once at bedtime",
    "1-0-1": "morning and night",
    "1-0-0": "morning only",
    "0-0-1": "night only",
    "1-1-1": "three times daily",
    DOLO: "Dolo",
    "DOLO 650": "Dolo 650"
  },
  te: {
    PAID: "చెల్లించబడింది",
    UNPAID: "చెల్లించలేదు",
    PENDING: "పెండింగ్",
    PARTIAL: "పాక్షికం",
    REFUNDED: "వాపసు",
    Consultation: "కన్సల్టేషన్",
    Treatment: "చికిత్స",
    CONSULTATION: "కన్సల్టేషన్",
    TREATMENT: "చికిత్స",
    Completed: "పూర్తయింది",
    "In Progress": "ప్రగతిలో ఉంది",
    "In progress": "ప్రగతిలో ఉంది",
    Pending: "పెండింగ్",
    Scheduled: "షెడ్యూల్ అయింది",
    Ongoing: "కొనసాగుతోంది",
    Closed: "మూసివేయబడింది",
    Active: "యాక్టివ్",
    Disabled: "డిసేబుల్",
    Fertility: "ఫర్టిలిటీ",
    Visit: "విజిట్",
    "Active visit": "యాక్టివ్ విజిట్",
    Dr: "డా.",
    Doctor: "డాక్టర్",
    Branch: "బ్రాంచ్",
    Medicine: "మందు",
    day: "రోజు",
    days: "రోజులు",
    HS: "రాత్రి నిద్రకు ముందు",
    BD: "రోజుకు రెండుసార్లు",
    TID: "రోజుకు మూడుసార్లు",
    QID: "రోజుకు నాలుగుసార్లు",
    OD: "రోజుకు ఒక్కసారి",
    SOS: "అవసరమైనప్పుడు",
    STAT: "వెంటనే",
    AC: "భోజనానికి ముందు",
    PC: "భోజనం తర్వాత",
    "2HS": "రాత్రి నిద్రకు ముందు రెండుసార్లు",
    "1HS": "రాత్రి నిద్రకు ముందు ఒక్కసారి",
    "1-0-1": "ఉదయం మరియు రాత్రి",
    "1-0-0": "ఉదయం మాత్రమే",
    "0-0-1": "రాత్రి మాత్రమే",
    "1-1-1": "రోజుకు మూడుసార్లు",
    DOLO: "డోలో",
    "DOLO 650": "డోలో 650"
  },
  hi: {
    PAID: "भुगतान हो गया",
    UNPAID: "भुगतान नहीं हुआ",
    PENDING: "लंबित",
    PARTIAL: "आंशिक",
    REFUNDED: "वापसी",
    Consultation: "परामर्श",
    Treatment: "उपचार",
    CONSULTATION: "परामर्श",
    TREATMENT: "उपचार",
    Completed: "पूर्ण",
    "In Progress": "प्रगति में",
    "In progress": "प्रगति में",
    Pending: "लंबित",
    Scheduled: "निर्धारित",
    Ongoing: "चल रहा है",
    Closed: "बंद",
    Active: "सक्रिय",
    Disabled: "अक्षम",
    Fertility: "फर्टिलिटी",
    Visit: "विज़िट",
    "Active visit": "सक्रिय विज़िट",
    Dr: "डॉ.",
    Doctor: "डॉक्टर",
    Branch: "ब्रांच",
    Medicine: "दवाई",
    day: "दिन",
    days: "दिन",
    HS: "सोने से पहले",
    BD: "दिन में दो बार",
    TID: "दिन में तीन बार",
    QID: "दिन में चार बार",
    OD: "दिन में एक बार",
    SOS: "जरूरत पड़ने पर",
    STAT: "तुरंत",
    AC: "खाने से पहले",
    PC: "खाने के बाद",
    "2HS": "सोने से पहले दो बार",
    "1HS": "सोने से पहले एक बार",
    "1-0-1": "सुबह और रात",
    "1-0-0": "केवल सुबह",
    "0-0-1": "केवल रात",
    "1-1-1": "दिन में तीन बार",
    DOLO: "डोलो",
    "DOLO 650": "डोलो 650"
  }
};

const MEDICINE_NAMES = {
  te: {
    "DOLO 650": "డోలో 650",
    DOLO: "డోలో",
    PARACETAMOL: "పారాసిటమాల్",
    FOLIC: "ఫోలిక్ యాసిడ్",
    ASPIRIN: "ఆస్పిరిన్"
  },
  hi: {
    "DOLO 650": "डोलो 650",
    DOLO: "डोलो",
    PARACETAMOL: "पैरासिटामोल",
    FOLIC: "फोलिक एसिड",
    ASPIRIN: "एस्पिरिन"
  }
};

export function statusLabel(lang, status) {
  if (status == null || status === "") return "—";
  return localizeData(lang, String(status));
}

export function localizeData(lang, value) {
  if (value == null || value === "") return "—";
  const raw = String(value).trim();
  if (lang === "en") return raw;

  const dict = DATA_VALUES[lang] || {};
  if (dict[raw] != null) return dict[raw];

  const upper = raw.toUpperCase();
  if (dict[upper] != null) return dict[upper];

  // Exact medicine name maps
  const meds = MEDICINE_NAMES[lang] || {};
  if (meds[raw] != null) return meds[raw];
  if (meds[upper] != null) return meds[upper];

  // Doctor name: Dr. Jhansi → డా. Jhansi
  const doctorMatch = raw.match(/^(Dr\.?|Doctor)\s+(.+)$/i);
  if (doctorMatch) {
    const title = dict.Dr || dict.Doctor || doctorMatch[1];
    return `${title} ${doctorMatch[2]}`;
  }

  // Prescription like "2HS", "1BD", "2 TID"
  const doseMatch = raw.match(/^(\d+)\s*([A-Za-z]+)$/);
  if (doseMatch) {
    const count = doseMatch[1];
    const code = doseMatch[2].toUpperCase();
    if (dict[`${count}${code}`]) return dict[`${count}${code}`];
    if (dict[code]) return `${count} × ${dict[code]}`;
  }

  // Token replace inside longer strings (e.g. "DOLO 650 tablet")
  let out = raw;
  const replacements = [
    ...Object.entries(meds),
    ...Object.entries(dict)
  ].sort((a, b) => b[0].length - a[0].length);

  replacements.forEach(([from, to]) => {
    if (!from || from.length < 2) return;
    const re = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    out = out.replace(re, to);
  });

  return out;
}

export function formatPortalDate(lang, dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return String(dateStr);
  const locale = lang === "te" ? "te-IN" : lang === "hi" ? "hi-IN" : "en-IN";
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(d);
}

export function localizeDoctor(lang, name) {
  if (!name) return "—";
  return localizeData(lang, name);
}

export function localizeMedicine(lang, name) {
  if (!name) return "—";
  return localizeData(lang, name);
}

export function localizeInstructions(lang, text, days) {
  const base = text ? localizeData(lang, text) : "";
  if (days == null || days === "") return base || "—";
  const dayWord = Number(days) === 1
    ? (DATA_VALUES[lang]?.day || "day")
    : (DATA_VALUES[lang]?.days || "days");
  if (!base || base === "—") return `${days} ${dayWord}`;
  return `${base} · ${days} ${dayWord}`;
}
