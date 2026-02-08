# VereinFach.de - Vereinsmanagement leicht gemacht

Eine moderne, cloud-basierte Vereinsverwaltung für deutsche Vereine. Entwickelt mit Next.js 14, Supabase und TypeScript.

## 🚀 Features

- **Mitgliederverwaltung**: Vollständige CRUD-Funktionen für Vereinsmitglieder
- **Beitragsverwaltung**: Flexible Beitragsarten und Zahlungsverfolgung  
- **Dashboard**: Übersichtliche Statistiken und Aktivitäten
- **DSGVO-konform**: Entwickelt nach deutschen Datenschutzstandards
- **Mobile-optimiert**: Responsive Design für alle Geräte
- **TypeScript**: Typisierte Entwicklung für bessere Code-Qualität

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui Components
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Deployment**: Vercel

## 📦 Installation

1. **Repository klonen**
   ```bash
   git clone https://github.com/BF-GitH/verein-online.git
   cd verein-online
   ```

2. **Dependencies installieren**
   ```bash
   npm install
   ```

3. **Umgebungsvariablen konfigurieren**
   ```bash
   cp .env.local.example .env.local
   # Bearbeiten Sie .env.local mit Ihren Supabase Credentials
   ```

4. **Supabase-Datenbank einrichten**
   - Erstellen Sie ein neues Projekt auf [supabase.com](https://supabase.com)
   - Führen Sie das SQL-Schema aus `supabase-schema.sql` in Ihrem Supabase SQL Editor aus
   - Kopieren Sie die URL und API Keys in Ihre `.env.local`

5. **Entwicklungsserver starten**
   ```bash
   npm run dev
   ```

Die Anwendung läuft nun auf [http://localhost:3000](http://localhost:3000)

## 🗃️ Datenbank Schema

Das vollständige Datenbankschema finden Sie in `supabase-schema.sql`. Es enthält:

- **club_profiles**: Vereinsprofile
- **members**: Mitgliederdaten
- **contribution_types**: Beitragsarten
- **contributions**: Einzelne Beiträge
- **activities**: Aktivitäts-Log für Dashboard

Alle Tabellen haben Row Level Security (RLS) aktiviert für mandantenfähige Datensicherheit.

## 🚀 Deployment

### Vercel Deployment

1. **Vercel CLI installieren**
   ```bash
   npm i -g vercel
   ```

2. **In Vercel deployen**
   ```bash
   vercel
   ```

3. **Umgebungsvariablen in Vercel setzen**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   vercel env add SUPABASE_SERVICE_ROLE_KEY
   vercel env add NEXTAUTH_SECRET
   ```

4. **Produktions-Deployment**
   ```bash
   vercel --prod
   ```

## 📁 Projektstruktur

```
src/
├── app/                    # Next.js App Router Seiten
│   ├── auth/              # Authentifizierung
│   ├── dashboard/         # Dashboard & Hauptfunktionen
│   └── layout.tsx         # Root Layout
├── components/            # React Komponenten
│   ├── auth/             # Auth Komponenten
│   ├── dashboard/        # Dashboard Komponenten
│   ├── members/          # Mitgliederverwaltung
│   ├── contributions/    # Beitragsverwaltung
│   ├── layout/           # Layout Komponenten
│   └── ui/               # UI Komponenten (shadcn/ui)
├── lib/                  # Utility Funktionen
│   └── supabase.ts       # Supabase Client
├── types/                # TypeScript Type Definitionen
└── hooks/               # Custom React Hooks
```

## 🔧 Entwicklung

### Scripts

```bash
npm run dev          # Entwicklungsserver
npm run build        # Produktions-Build
npm run start        # Produktionsserver
npm run lint         # ESLint
npm run type-check   # TypeScript Check
```

### Code-Standards

- **TypeScript** für alle Dateien
- **ESLint** + **Prettier** für Code-Formatting
- **Conventional Commits** für Commit-Messages
- **Tailwind CSS** für Styling

## 🎯 Roadmap

### Phase 1 (MVP) ✅
- [x] Landing Page
- [x] Authentifizierung
- [x] Mitgliederverwaltung
- [x] Beitragsverwaltung  
- [x] Dashboard

### Phase 2 (Geplant)
- [ ] E-Mail Benachrichtigungen
- [ ] PDF Export/Import
- [ ] Zahlungsintegration (SEPA)
- [ ] Multi-Mandant Support
- [ ] Mobile App

### Phase 3 (Vision)
- [ ] Vereinskalender
- [ ] Dokumentenverwaltung
- [ ] API für Drittanbieter
- [ ] Analytics & Reporting

## 🤝 Contributing

1. Fork das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit deine Änderungen (`git commit -m 'Add amazing feature'`)
4. Push zum Branch (`git push origin feature/amazing-feature`)
5. Öffne eine Pull Request

## 📄 Lizenz

Dieses Projekt steht unter der MIT Lizenz. Siehe [LICENSE](LICENSE) für Details.

## 📞 Support

- **E-Mail**: support@vereinonline.de
- **Dokumentation**: [docs.vereinonline.de](https://docs.vereinonline.de)
- **Issues**: [GitHub Issues](https://github.com/BF-GitH/verein-online/issues)

---

Entwickelt mit ❤️ für deutsche Vereine