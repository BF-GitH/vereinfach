# VereinFach - Vereinsarbeit einfach gemacht 💚

Endlich eine Vereinsverwaltung, die jeder versteht! Moderne, cloud-basierte Lösung für deutsche Vereine mit Fokus auf Einfachheit und schönes Design.

## 🌟 Warum VereinFach anders ist

- **🎨 Modernes Design:** Frische Emerald/Teal Farben statt langweiliges Blau-Grau
- **💚 Vereins-Cockpit:** Echtes Dashboard statt steriles Admin-Panel  
- **🇩🇪 100% Deutsch:** Alle Texte, Buttons und Fehlermeldungen auf Deutsch
- **😊 Einfach zu bedienen:** Von 16 bis 86 - jeder kann es nutzen
- **📱 Handy-optimiert:** Funktioniert perfekt auf allen Geräten

## ✨ Features

### 👥 Mitglieder-Cockpit
- Alle Vereinsmitglieder übersichtlich verwalten
- Rollen und Status auf einen Blick
- Schnellsuche und Filter
- Profile und Kontaktdaten

### 💰 Beitrags-Cockpit  
- Flexible Beitragsarten definieren
- Zahlungsstatus live verfolgen
- Automatische Erinnerungen
- Finanz-Übersicht

### 🎛️ Vereins-Cockpit
- Live-Statistiken zu eurem Verein
- Aktivitäten-Feed
- Schnell-Aktionen
- Health-Check

## 🚀 Tech Stack

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui Components, Lucide Icons
- **Backend:** Supabase (PostgreSQL, Auth, Real-time)
- **Deployment:** Vercel
- **Design:** Moderne Gradients, Hover-Effekte, Animationen

## 📦 Installation & Setup

### 1. Repository klonen
```bash
git clone https://github.com/BF-GitH/verein-online.git
cd verein-online
```

### 2. Dependencies installieren
```bash
npm install
```

### 3. Umgebungsvariablen konfigurieren
```bash
cp .env.local.example .env.local
# Bearbeitet .env.local mit euren Supabase Credentials
```

### 4. Supabase-Datenbank einrichten
1. Erstellt ein Projekt auf [supabase.com](https://supabase.com)
2. Führt das Schema aus `supabase-schema.sql` im SQL Editor aus
3. Kopiert URL und API Keys in eure `.env.local`

### 5. Entwicklungsserver starten
```bash
npm run dev
```

🎉 VereinFach läuft auf [http://localhost:3000](http://localhost:3000)

## 🗃️ Datenbank Schema

Das vollständige Schema in `supabase-schema.sql` enthält:

- **club_profiles** - Vereinsprofile mit Namen und Kontaktdaten
- **members** - Mitgliederdaten mit Rollen und Status
- **contribution_types** - Beitragsarten (monatlich, jährlich, etc.)
- **contributions** - Einzelne Beiträge mit Zahlungsstatus
- **activities** - Aktivitäts-Log für das Dashboard

Alle Tabellen haben **Row Level Security (RLS)** für mandantenfähige Sicherheit.

## 🌐 Deployment auf Vercel

### Quick Deploy
```bash
npm i -g vercel
vercel
```

### Umgebungsvariablen setzen
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add NEXTAUTH_SECRET
```

### Produktions-Deploy
```bash
vercel --prod
```

## 📁 Projektstruktur

```
src/
├── app/                     # Next.js App Router
│   ├── (marketing)/         # Landing Page
│   ├── auth/               # Login & Registrierung  
│   └── dashboard/          # Hauptanwendung
├── components/             # React Komponenten
│   ├── auth/              # Auth-Formulare
│   ├── layout/            # Navigation & Layout
│   ├── members/           # Mitgliederverwaltung
│   ├── contributions/     # Beitragsverwaltung
│   └── ui/                # UI-Komponenten
├── lib/                   # Utilities
└── types/                 # TypeScript Definitionen
```

## 🎨 Design-Prinzipien

### Farbpalette
- **Primär:** Emerald (emerald-500) zu Teal (teal-600)
- **Sekundär:** Cyan, Orange, Purple für Akzente  
- **Status:** Rot (überfällig), Grün (bezahlt), Orange (offen)

### UI-Philosophie
- **Gradients** statt flache Farben
- **Hover-Effekte** für Interaktivität
- **Emojis** für Freundlichkeit  
- **Deutsche Begriffe** statt Englisch
- **Schatten und Rundungen** für Modernität

## 🛣️ Roadmap

### ✅ Phase 1: MVP (Aktuell)
- [x] Landing Page mit modernem Design
- [x] Authentifizierung auf Deutsch
- [x] Vereins-Cockpit Dashboard
- [x] Mitglieder-Cockpit
- [x] Beitrags-Cockpit

### 🔄 Phase 2: Features (Q2 2026)
- [ ] E-Mail Benachrichtigungen
- [ ] PDF-Export für Mitgliederlisten
- [ ] SEPA-Integration für Beiträge
- [ ] Vereinskalender
- [ ] Mobile App (PWA)

### 🌟 Phase 3: Enterprise (Q3 2026)
- [ ] Multi-Mandant Support
- [ ] API für Drittanbieter
- [ ] Advanced Analytics
- [ ] Dokumentenverwaltung
- [ ] Vereins-Website Builder

## 💼 Preise

- **Starter:** 0€/Monat für bis zu 50 Mitglieder
- **Professional:** 9€/Monat für bis zu 200 Mitglieder  
- **Enterprise:** 19€/Monat für unbegrenzte Mitglieder

## 🤝 Contributing

1. Fork das Repository
2. Feature Branch erstellen (`git checkout -b feature/neues-feature`)
3. Änderungen committen (`git commit -m 'Fügt neues Feature hinzu'`)
4. Branch pushen (`git push origin feature/neues-feature`)
5. Pull Request öffnen

### Code-Standards
- **TypeScript** für alle Dateien
- **Deutsche Kommentare und Variablennamen**
- **Tailwind CSS** für Styling
- **shadcn/ui** für Komponenten
- **Conventional Commits** für Commit-Messages

## 📞 Support & Kontakt

- **E-Mail:** hallo@vereinfach.de
- **GitHub Issues:** [Issues](https://github.com/BF-GitH/verein-online/issues)
- **Dokumentation:** Coming soon

## 📄 Lizenz

MIT Lizenz - siehe [LICENSE](LICENSE) Datei für Details.

---

**Mit ❤️ für deutsche Vereine entwickelt**

_VereinFach macht Vereinsarbeit endlich einfach!_ 🚀