import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  CreditCard, 
  BarChart3, 
  Shield, 
  Clock, 
  Check,
  Star,
  ArrowRight,
  Mail,
  Phone,
  Zap,
  Heart,
  Coffee
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              VereinFach
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Funktionen
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Preise
            </a>
            <a href="#contact" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Kontakt
            </a>
            <Link href="/auth/login">
              <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                Anmelden
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg">
                Kostenlos starten
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">
            ✨ Neu: Das moderne Vereins-Cockpit
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
            Vereinsarbeit war noch nie so{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              einfach
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            VereinFach macht Vereinsverwaltung endlich simpel. Mitglieder verwalten, 
            Beiträge tracken und den Überblick behalten - alles in einem modernen Cockpit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-xl transform hover:scale-105 transition-all">
                <Zap className="ml-2 w-4 h-4" />
                Jetzt kostenlos loslegen
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-emerald-200 text-emerald-700 hover:bg-emerald-50">
              <Coffee className="mr-2 w-4 h-4" />
              Demo anschauen
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            ✓ 30 Tage kostenlos ✓ Keine Kreditkarte nötig ✓ Datenschutz mitgedacht
          </p>
        </div>
      </section>

      {/* Zahlen Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                825.000+
              </div>
              <p className="text-gray-600">Vereine in Deutschland</p>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                50M+
              </div>
              <p className="text-gray-600">Vereinsmitglieder bundesweit</p>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                2.4 Mrd€
              </div>
              <p className="text-gray-600">Jahresumsatz im Vereinswesen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Alles was euer Verein braucht
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Moderne Tools für effiziente Vereinsarbeit - einfach zu bedienen, 
              ohne Schnickschnack.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-emerald-100 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-emerald-900">Mitglieder-Cockpit</CardTitle>
                <CardDescription>
                  Alle Mitglieder im Blick - simpel und übersichtlich
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><Check className="w-4 h-4 text-emerald-500 mr-2" />Profile und Kontakte</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-emerald-500 mr-2" />Rollen und Rechte</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-emerald-500 mr-2" />Status-Übersicht</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-teal-100 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-teal-900">Beitrags-Tracker</CardTitle>
                <CardDescription>
                  Nie wieder den Überblick über Beiträge verlieren
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><Check className="w-4 h-4 text-teal-500 mr-2" />Flexible Beitragsarten</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-teal-500 mr-2" />Zahlungs-Status live</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-teal-500 mr-2" />Automatische Erinnerungen</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-cyan-100 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-cyan-900">Vereins-Cockpit</CardTitle>
                <CardDescription>
                  Euer Verein auf einen Blick - klar und verständlich
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><Check className="w-4 h-4 text-cyan-500 mr-2" />Live-Statistiken</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-cyan-500 mr-2" />Finanz-Überblick</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-cyan-500 mr-2" />Aktivitäten-Feed</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-purple-100 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-purple-900">Datenschutz mitgedacht</CardTitle>
                <CardDescription>
                  Datenschutz nach europäischem Standard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><Check className="w-4 h-4 text-purple-500 mr-2" />Server in der EU</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-purple-500 mr-2" />Verschlüsselte Datenübertragung (TLS)</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-purple-500 mr-2" />Technische Sicherheitsmaßnahmen</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-100 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-orange-900">Zeit sparen</CardTitle>
                <CardDescription>
                  Automatisiert alles Langweilige
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><Check className="w-4 h-4 text-orange-500 mr-2" />Auto-Rechnungen</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-orange-500 mr-2" />E-Mail Benachrichtigungen</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-orange-500 mr-2" />Bulk-Aktionen</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-pink-100 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-pink-900">Super einfach</CardTitle>
                <CardDescription>
                  Jeder kann es bedienen - von 16 bis 86
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><Check className="w-4 h-4 text-pink-500 mr-2" />Intuitive Bedienung</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-pink-500 mr-2" />Handy-optimiert</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-pink-500 mr-2" />Deutscher Support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Faire Preise, keine Überraschungen
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Startet kostenlos und zahlt nur, wenn ihr mehr braucht. 
              Keine versteckten Kosten.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <Card className="border-emerald-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  0€<span className="text-lg font-normal text-gray-600">/Monat</span>
                </div>
                <CardDescription>Für kleine Vereine</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center"><Check className="w-5 h-5 text-emerald-500 mr-3" />Bis zu 50 Mitglieder</li>
                  <li className="flex items-center"><Check className="w-5 h-5 text-emerald-500 mr-3" />Mitglieder-Cockpit</li>
                  <li className="flex items-center"><Check className="w-5 h-5 text-emerald-500 mr-3" />Einfache Beiträge</li>
                  <li className="flex items-center"><Check className="w-5 h-5 text-emerald-500 mr-3" />E-Mail Support</li>
                </ul>
                <Link href="/auth/register" className="block mt-6">
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                    Kostenlos starten
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Professional */}
            <Card className="border-teal-200 shadow-xl scale-105 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
                Am beliebtesten
              </Badge>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Professional</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  9€<span className="text-lg font-normal text-gray-600">/Monat</span>
                </div>
                <CardDescription>Für wachsende Vereine</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center"><Check className="w-5 h-5 text-teal-500 mr-3" />Bis zu 200 Mitglieder</li>
                  <li className="flex items-center"><Check className="w-5 h-5 text-teal-500 mr-3" />Erweiterte Statistiken</li>
                  <li className="flex items-center"><Check className="w-5 h-5 text-teal-500 mr-3" />Auto-Erinnerungen</li>
                  <li className="flex items-center"><Check className="w-5 h-5 text-teal-500 mr-3" />Export-Funktionen</li>
                  <li className="flex items-center"><Check className="w-5 h-5 text-teal-500 mr-3" />Telefon-Support</li>
                </ul>
                <Link href="/auth/register" className="block mt-6">
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700">
                    Jetzt upgraden
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise */}
            <Card className="border-cyan-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  19€<span className="text-lg font-normal text-gray-600">/Monat</span>
                </div>
                <CardDescription>Für große Vereine</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center"><Check className="w-5 h-5 text-cyan-500 mr-3" />Unbegrenzte Mitglieder</li>
                  <li className="flex items-center"><Check className="w-5 h-5 text-cyan-500 mr-3" />Alle Premium Features</li>
                  <li className="flex items-center"><Check className="w-5 h-5 text-cyan-500 mr-3" />API-Zugang</li>
                  <li className="flex items-center"><Check className="w-5 h-5 text-cyan-500 mr-3" />Custom Integrationen</li>
                  <li className="flex items-center"><Check className="w-5 h-5 text-cyan-500 mr-3" />Prioritäts-Support</li>
                </ul>
                <Link href="/auth/register" className="block mt-6">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                    Enterprise wählen
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fragen? Wir helfen gerne!
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unser deutschsprachiges Team steht euch zur Seite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kontakt aufnehmen</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mr-3">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-500">[VOR LAUNCH AUSFÜLLEN] kontakt@[domain].de</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mr-3">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-500">[VOR LAUNCH AUSFÜLLEN] +49 (0) XXX XXXXXXX</span>
                </div>
              </div>
              <p className="text-gray-600 mt-4">
                📞 Montag - Freitag: 9:00 - 17:00 Uhr
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Häufige Fragen</h3>
              <div className="space-y-3">
                <details className="group">
                  <summary className="cursor-pointer text-gray-700 group-open:text-emerald-600 font-medium">
                    🔒 Wie steht es um den Datenschutz?
                  </summary>
                  <p className="text-gray-600 mt-2 pl-6">
                    Wir setzen technische Maßnahmen nach Stand der Technik ein 
                    (Verschlüsselung, Zugriffskontrolle, Minimierung). Details in 
                    unserer Datenschutzerklärung.
                  </p>
                </details>
                <details className="group">
                  <summary className="cursor-pointer text-gray-700 group-open:text-emerald-600 font-medium">
                    📤 Kann ich meine Daten exportieren?
                  </summary>
                  <p className="text-gray-600 mt-2 pl-6">
                    Selbstverständlich! Eure Daten gehören euch - ihr könnt sie 
                    jederzeit in gängigen Formaten exportieren.
                  </p>
                </details>
                <details className="group">
                  <summary className="cursor-pointer text-gray-700 group-open:text-emerald-600 font-medium">
                    🚀 Wie schnell kann ich starten?
                  </summary>
                  <p className="text-gray-600 mt-2 pl-6">
                    In unter 2 Minuten! Registriert euch, gebt euren Vereinsnamen ein 
                    und legt sofort los.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  VereinFach
                </span>
              </div>
              <p className="text-gray-400">
                Vereinsarbeit einfach gemacht. 💚
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Produkt</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Funktionen</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Preise</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Unternehmen</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Über uns</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Kontakt</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/legal/impressum" className="hover:text-white transition-colors">Impressum</a></li>
                <li><a href="/legal/datenschutz" className="hover:text-white transition-colors">Datenschutz</a></li>
                <li><a href="/legal/agb" className="hover:text-white transition-colors">AGB</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 VereinFach. Mit ❤️ für deutsche Vereine gemacht.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}