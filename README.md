# Origins Patient Portal

Separate frontend for **super admin** and **patient** access. The existing HMS staff app (`origins-frontend-hms` on port 3001) is unchanged.

## Run

```bash
# backend (existing)
cd origins-backend
npm run start:dev

# portal UI (port 3002)
cd origins-frontend-portal
npm run dev
```

Open [http://localhost:3002](http://localhost:3002)

## Super admin

- Email: `info@origins.ivf`
- Password: `ItOrigins@789`

Seeded automatically on first portal API call (`portal_accounts` table).

### Capabilities

1. **Create staff** — verified HMS users in the existing `users` table (staff can log into the old HMS immediately).
2. **Create patient login** — search/select a patient that **already exists** in HMS, then set portal email/password. Cannot create login for non-existent patients.

## Patient portal

After login, patients see:

- Overview / active treatment
- Prescribed medicines
- Lab reports
- Visits & appointments

## API (backend `/portal`)

| Method | Path | Who |
|--------|------|-----|
| POST | `/portal/auth/login` | Public |
| GET | `/portal/auth/me` | Any portal user |
| POST | `/portal/admin/staff` | Super admin |
| GET | `/portal/admin/staff` | Super admin |
| GET | `/portal/admin/patients/search?q=` | Super admin |
| POST | `/portal/admin/patient-logins` | Super admin |
| GET | `/portal/admin/patient-logins` | Super admin |
| GET | `/portal/patient/dashboard` | Patient |
| GET | `/portal/patient/medicines` | Patient |
| GET | `/portal/patient/reports` | Patient |
| GET | `/portal/patient/treatments` | Patient |

Portal auth uses a dedicated JWT issuer (`origins_portal`) and does **not** use staff Redis sessions, so the old HMS login flow stays intact.

## Android APK (Capacitor)

Same portal features are packaged as a native Android app with the Origins logo as the launcher icon.

### One-time requirements

- JDK 21+
- Android SDK (`%LOCALAPPDATA%\Android\Sdk`)

### Packaged build (works from anywhere — mobile data / any Wi‑Fi)

The APK bundles the portal UI and talks to production API `https://api.originshms.com`. No PC or same Wi‑Fi required.

```bash
# Edit .env.mobile if needed (default is production API), then:
npm run mobile:build
adb install -r Origins-IVF-Portal.apk
```

After portal UI changes, run `npm run mobile:build` again and reinstall so the APK picks them up.

### Optional: local live link (dev only, same network)

```bash
npm run dev
npm run mobile:live:apk
```

Requires phone ↔ PC reachability. Prefer packaged build for real use. Unlink with `npm run mobile:unlink` then `npm run mobile:build`.

Output: `Origins-IVF-Portal.apk` (also under `android/app/build/outputs/apk/debug/`).

Install on a device:

```bash
adb install -r Origins-IVF-Portal.apk
```

Regenerate icons from `assets/logo.png`:

```bash
npm run mobile:icons
```

Backend CORS must allow the Capacitor origin (`https://localhost`) or your configured API host.

## Config

Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local` (defaults to production API). CORS already allows `localhost:3002`.

For APK builds, copy `.env.mobile.example` → `.env.mobile` and set the backend URL.
