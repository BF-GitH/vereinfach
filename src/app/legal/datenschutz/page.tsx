import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, AlertTriangle } from 'lucide-react'

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Zur Startseite
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Datenschutzerklärung</h1>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
              <div>
                <p className="text-yellow-800 font-medium">
                  [VOR LAUNCH PRÜFEN]
                </p>
                <p className="text-yellow-700 text-sm mt-1">
                  Diese Datenschutzerklärung sollte vor dem Launch von einem Anwalt geprüft werden.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Verantwortlicher */}
          <Card>
            <CardHeader>
              <CardTitle>1. Verantwortlicher</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
              </p>
              <div className="bg-red-50 p-4 rounded border-l-4 border-red-400 text-gray-600">
                <p><strong>[AUSFÜLLEN]</strong> Firmenname / Name</p>
                <p><strong>[AUSFÜLLEN]</strong> Adresse</p>
                <p>E-Mail: <strong>[AUSFÜLLEN]</strong> datenschutz@[domain].de</p>
                <p>Telefon: <strong>[AUSFÜLLEN]</strong> +49 (0) XXX XXXXXXX</p>
              </div>
            </CardContent>
          </Card>

          {/* Erhobene Daten */}
          <Card>
            <CardHeader>
              <CardTitle>2. Welche Daten wir erheben</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">2.1 Mitgliederdaten</h4>
                <p className="text-gray-600 mb-2">
                  Zur Nutzung unserer Vereinsverwaltung erheben wir folgende personenbezogene Daten:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>Vor- und Nachname</li>
                  <li>E-Mail-Adresse</li>
                  <li>Telefonnummer</li>
                  <li>Postanschrift</li>
                  <li>Geburtsdatum</li>
                  <li>Vereinsrolle und -funktion</li>
                  <li>Beitragsstatus und Zahlungshistorie</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">2.2 Technische Daten</h4>
                <p className="text-gray-600 mb-2">
                  Bei der Nutzung unserer Website werden automatisch folgende Daten erhoben:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>IP-Adresse (anonymisiert)</li>
                  <li>Browsertyp und -version</li>
                  <li>Betriebssystem</li>
                  <li>Aufgerufene Seiten und Verweildauer</li>
                  <li>Datum und Uhrzeit des Zugriffs</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Rechtsgrundlagen */}
          <Card>
            <CardHeader>
              <CardTitle>3. Rechtsgrundlagen der Datenverarbeitung</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-900">Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</h4>
                  <p>Die Verarbeitung Ihrer Vereinsdaten erfolgt zur Erfüllung des Nutzungsvertrags und zur Bereitstellung unserer Dienste.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</h4>
                  <p>Für bestimmte Verarbeitungen (z.B. Newsletter) holen wir Ihre ausdrückliche Einwilligung ein.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Art. 6 Abs. 1 lit. f DSGVO (Berechtigte Interessen)</h4>
                  <p>Zur Gewährleistung der IT-Sicherheit und zur Verbesserung unseres Services.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Auftragsverarbeiter */}
          <Card>
            <CardHeader>
              <CardTitle>4. Auftragsverarbeiter</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Wir arbeiten mit folgenden Auftragsverarbeitern zusammen:
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Supabase Inc. (Datenbank)</h4>
                  <div className="text-gray-600 bg-blue-50 p-4 rounded border-l-4 border-blue-400">
                    <p>Sitz: USA (mit EU-Rechenzentrum verfügbar)</p>
                    <p>Zweck: Hosting der Vereinsdatenbank</p>
                    <p>Rechtsgrundlage: Standardvertragsklauseln (AVV abgeschlossen)</p>
                    <p>Datenschutz: <a href="https://supabase.com/privacy" target="_blank" className="text-blue-600 hover:underline">https://supabase.com/privacy</a></p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Vercel Inc. (Website-Hosting)</h4>
                  <div className="text-gray-600 bg-blue-50 p-4 rounded border-l-4 border-blue-400">
                    <p>Sitz: USA</p>
                    <p>Zweck: Hosting der Website und Anwendung</p>
                    <p>Rechtsgrundlage: Standardvertragsklauseln</p>
                    <p>Datenschutz: <a href="https://vercel.com/legal/privacy-policy" target="_blank" className="text-blue-600 hover:underline">https://vercel.com/legal/privacy-policy</a></p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Speicherdauer */}
          <Card>
            <CardHeader>
              <CardTitle>5. Speicherdauer und Löschkonzept</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-600">
                <p><strong>Mitgliederdaten:</strong> Solange die Mitgliedschaft besteht, plus 3 Jahre nach Vertragsende (für etwaige Nachfragen)</p>
                <p><strong>Zahlungsdaten:</strong> 10 Jahre (gesetzliche Aufbewahrungspflicht)</p>
                <p><strong>Protokolldaten:</strong> 7 Tage (IT-Sicherheit)</p>
                <p><strong>Einwilligungen:</strong> Bis zum Widerruf oder Vertragsende</p>
                <p className="text-sm bg-yellow-50 p-3 rounded border border-yellow-200">
                  <strong>Automatische Löschung:</strong> Nach Ablauf der Speicherdauer werden die Daten automatisch gelöscht.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Betroffenenrechte */}
          <Card>
            <CardHeader>
              <CardTitle>6. Ihre Rechte (Betroffenenrechte)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-start space-x-3">
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">Art. 15</span>
                  <div>
                    <strong>Auskunftsrecht:</strong> Sie können Auskunft über die zu Ihrer Person gespeicherten Daten verlangen.
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">Art. 16</span>
                  <div>
                    <strong>Berichtigungsrecht:</strong> Sie können die Berichtigung unrichtiger Daten verlangen.
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">Art. 17</span>
                  <div>
                    <strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">Art. 18</span>
                  <div>
                    <strong>Einschränkung der Verarbeitung:</strong> Sie können die Einschränkung der Verarbeitung verlangen.
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">Art. 20</span>
                  <div>
                    <strong>Datenübertragbarkeit:</strong> Sie können Ihre Daten in einem strukturierten, gängigen Format erhalten.
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">Art. 21</span>
                  <div>
                    <strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung Ihrer Daten widersprechen.
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mt-4">
                Zur Ausübung Ihrer Rechte kontaktieren Sie uns unter: <strong>[AUSFÜLLEN]</strong> datenschutz@[domain].de
              </p>
            </CardContent>
          </Card>

          {/* Beschwerderecht */}
          <Card>
            <CardHeader>
              <CardTitle>7. Beschwerderecht bei der Aufsichtsbehörde</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über unsere Verarbeitung personenbezogener Daten zu beschweren.
              </p>
              <div className="bg-gray-50 p-4 rounded border-l-4 border-gray-400">
                <p className="text-gray-600">
                  <strong>Für Deutschland:</strong><br />
                  Die Bundesbeauftragte für den Datenschutz und die Informationsfreiheit<br />
                  Graurheindorfer Str. 153, 53117 Bonn<br />
                  E-Mail: poststelle@bfdi.bund.de<br />
                  Tel: +49 (0)228-997799-0
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle>8. Cookies und Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>Aktueller Status:</strong> Wir verwenden derzeit <span className="underline">keine Tracking-Cookies oder Analytics-Tools</span>.
                </p>
                <div className="bg-green-50 p-4 rounded border-l-4 border-green-400">
                  <p><strong>Technisch notwendige Cookies:</strong></p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Session-Cookies für die Anmeldung</li>
                    <li>CSRF-Schutz-Cookies</li>
                    <li>Lokale Speicherung von Nutzereinstellungen</li>
                  </ul>
                  <p className="text-sm mt-3">Diese Cookies sind für die Funktionalität der Website erforderlich und benötigen keine Einwilligung.</p>
                </div>
                <p className="text-sm">
                  <strong>Hinweis:</strong> Sollten wir zukünftig Analytics-Tools einsetzen, werden wir Sie darüber informieren und Ihre Einwilligung einholen.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* SSL/TLS */}
          <Card>
            <CardHeader>
              <CardTitle>9. SSL/TLS-Verschlüsselung</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-600 space-y-3">
                <p>
                  Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL/TLS-Verschlüsselung.
                </p>
                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
                  <p><strong>Technische Sicherheitsmaßnahmen:</strong></p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>HTTPS-Verschlüsselung für alle Datenübertragungen</li>
                    <li>Sichere Authentifizierung und Session-Management</li>
                    <li>Regelmäßige Sicherheitsupdates</li>
                    <li>Zugriffskontrolle und Berechtigungsmanagement</li>
                  </ul>
                </div>
                <p>
                  Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Änderungen */}
          <Card>
            <CardHeader>
              <CardTitle>10. Änderungen dieser Datenschutzerklärung</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
              </p>
              <p className="text-gray-600 mt-3">
                <strong>Stand:</strong> Februar 2026
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}