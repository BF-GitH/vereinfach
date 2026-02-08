import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, AlertTriangle, Scale } from 'lucide-react'

export default function AGBPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Allgemeine Geschäftsbedingungen (AGB)</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <Scale className="w-5 h-5 text-red-600 mt-0.5 mr-3" />
              <div>
                <p className="text-red-800 font-medium">
                  [MUSS VOR LAUNCH VON ANWALT GEPRÜFT WERDEN]
                </p>
                <p className="text-red-700 text-sm mt-1">
                  Diese AGB dienen als Basis und müssen vor dem produktiven Einsatz von einem Rechtsanwalt geprüft und angepasst werden.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* § 1 Geltungsbereich */}
          <Card>
            <CardHeader>
              <CardTitle>§ 1 Geltungsbereich</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-600">
              <p>(1) Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen <strong>[AUSFÜLLEN: Firmenname]</strong> (nachfolgend "Anbieter") und den Nutzern der VereinFach-Software (nachfolgend "Nutzer").</p>
              <p>(2) Abweichende, entgegenstehende oder ergänzende Allgemeine Geschäftsbedingungen des Nutzers werden nicht Vertragsbestandteil, es sei denn, ihrer Geltung wird ausdrücklich schriftlich zugestimmt.</p>
              <p>(3) Diese AGB gelten auch für künftige Geschäftsbeziehungen, ohne dass wir jeweils gesondert auf sie hinweisen müssten.</p>
            </CardContent>
          </Card>

          {/* § 2 Vertragsschluss */}
          <Card>
            <CardHeader>
              <CardTitle>§ 2 Vertragsschluss</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-600">
              <p>(1) Die Registrierung über die Website stellt einen Vertragsantrag des Nutzers dar.</p>
              <p>(2) Der Vertrag kommt durch die Bestätigung der Registrierung per E-Mail zustande.</p>
              <p>(3) Der Nutzer bestätigt mit der Registrierung, dass er berechtigt ist, für den entsprechenden Verein zu handeln.</p>
              <p>(4) Ein Anspruch auf Abschluss eines Nutzungsvertrags besteht nicht.</p>
            </CardContent>
          </Card>

          {/* § 3 Leistungsbeschreibung */}
          <Card>
            <CardHeader>
              <CardTitle>§ 3 Leistungsbeschreibung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-600">
              <p>(1) VereinFach ist eine webbasierte Software zur Verwaltung von Vereinen (SaaS - Software as a Service).</p>
              <p>(2) Die konkreten Funktionen richten sich nach dem gewählten Tarif und der aktuellen Version der Software.</p>
              <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
                <p><strong>Kernfunktionen:</strong></p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Mitgliederverwaltung</li>
                  <li>Beitragsverwaltung</li>
                  <li>Vereins-Dashboard</li>
                  <li>Grundlegende Statistiken</li>
                  <li>Datenimport und -export</li>
                </ul>
              </div>
              <p>(3) Der Anbieter behält sich vor, die Software zu aktualisieren und zu verbessern. Wesentliche Änderungen werden dem Nutzer mit angemessener Frist mitgeteilt.</p>
              <p>(4) Der Anbieter schuldet keine bestimmte Verfügbarkeit, bemüht sich jedoch um eine hohe Verfügbarkeit der Dienste.</p>
            </CardContent>
          </Card>

          {/* § 4 Preise und Zahlung */}
          <Card>
            <CardHeader>
              <CardTitle>§ 4 Preise und Zahlung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-600">
              <p>(1) Es gelten die zum Zeitpunkt der Bestellung auf der Website angegebenen Preise.</p>
              <p>(2) Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer.</p>
              <p>(3) Die Abrechnung erfolgt monatlich oder jährlich im Voraus, je nach gewähltem Tarif.</p>
              <p>(4) Bei Zahlungsverzug können wir nach Mahnung den Zugang sperren.</p>
              <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
                <p><strong>Zahlungsmethoden:</strong></p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>SEPA-Lastschrift (bevorzugt)</li>
                  <li>Überweisung</li>
                  <li>[AUSFÜLLEN: Weitere Zahlungsmethoden je nach Payment-Provider]</li>
                </ul>
              </div>
              <p>(5) Preisänderungen werden dem Nutzer mindestens 30 Tage vor Inkrafttreten mitgeteilt.</p>
            </CardContent>
          </Card>

          {/* § 5 Verfügbarkeit */}
          <Card>
            <CardHeader>
              <CardTitle>§ 5 Verfügbarkeit und technische Anforderungen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-600">
              <p>(1) Der Anbieter bemüht sich um eine möglichst hohe Verfügbarkeit der Software, kann jedoch keine 100%ige Verfügbarkeit garantieren.</p>
              <p>(2) Wartungsarbeiten werden nach Möglichkeit außerhalb der üblichen Geschäftszeiten durchgeführt.</p>
              <p>(3) Erforderlich sind ein aktueller Webbrowser und eine stabile Internetverbindung.</p>
              <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
                <p><strong>Unterstützte Browser:</strong></p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Chrome (aktuelle Version)</li>
                  <li>Firefox (aktuelle Version)</li>
                  <li>Safari (aktuelle Version)</li>
                  <li>Edge (aktuelle Version)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* § 6 Pflichten des Nutzers */}
          <Card>
            <CardHeader>
              <CardTitle>§ 6 Pflichten des Nutzers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-600">
              <p>(1) Der Nutzer ist verpflichtet, seine Zugangsdaten geheim zu halten und vor unbefugtem Zugriff zu schützen.</p>
              <p>(2) Bei Verdacht auf missbräuchliche Nutzung ist der Anbieter unverzüglich zu informieren.</p>
              <p>(3) Der Nutzer ist für die Rechtmäßigkeit der eingegebenen Daten selbst verantwortlich.</p>
              <p>(4) Die Nutzung für rechtswidrige Zwecke ist untersagt.</p>
              <div className="bg-red-50 p-4 rounded border-l-4 border-red-400">
                <p><strong>Verboten ist insbesondere:</strong></p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Die Eingabe rechtswidriger oder ehrverletzender Inhalte</li>
                  <li>Versuche, die Software zu manipulieren oder zu hacken</li>
                  <li>Die Weitergabe der Zugangsdaten an Dritte</li>
                  <li>Überlastung der Server durch exzessive Nutzung</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* § 7 Haftungsbeschränkung */}
          <Card>
            <CardHeader>
              <CardTitle>§ 7 Haftungsbeschränkung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-600">
              <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
                <p className="font-medium text-yellow-800">WICHTIGER HINWEIS:</p>
                <p className="text-yellow-700 text-sm">Haftungsklauseln sind besonders rechtssensibel und müssen von einem Anwalt geprüft werden!</p>
              </div>
              <p>(1) Der Anbieter haftet unbeschränkt für Schäden, die vorsätzlich oder grob fahrlässig verursacht wurden.</p>
              <p>(2) Bei einfacher Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) und ist auf den vorhersehbaren, vertragstypischen Schaden begrenzt.</p>
              <p>(3) Die Haftung für mittelbare und indirekte Schäden, entgangenen Gewinn und Datenverlust ist ausgeschlossen, soweit gesetzlich zulässig.</p>
              <p>(4) Die Haftung nach dem Produkthaftungsgesetz bleibt unberührt.</p>
              <p>(5) Der Nutzer ist verpflichtet, regelmäßig Datensicherungen durchzuführen.</p>
            </CardContent>
          </Card>

          {/* § 8 Datenschutz */}
          <Card>
            <CardHeader>
              <CardTitle>§ 8 Datenschutz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-600">
              <p>(1) Für den Datenschutz gelten unsere Datenschutzbestimmungen, die unter <Link href="/legal/datenschutz" className="text-blue-600 hover:underline">/legal/datenschutz</Link> einsehbar sind.</p>
              <p>(2) Der Nutzer versichert, dass er berechtigt ist, die eingegebenen Mitgliederdaten zu verarbeiten und an uns zu übertragen.</p>
              <p>(3) Bei der Eingabe personenbezogener Daten ist der Nutzer selbst für die Einhaltung datenschutzrechtlicher Bestimmungen verantwortlich.</p>
              <p>(4) Der Anbieter fungiert als Auftragsverarbeiter im Sinne der DSGVO. Ein entsprechender Auftragsverarbeitungsvertrag (AVV) kann auf Anfrage bereitgestellt werden.</p>
            </CardContent>
          </Card>

          {/* § 9 Kündigung */}
          <Card>
            <CardHeader>
              <CardTitle>§ 9 Kündigung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-600">
              <p>(1) Der Vertrag kann von beiden Seiten mit einer Frist von einem Monat zum Ende des jeweiligen Abrechnungszeitraums gekündigt werden.</p>
              <p>(2) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.</p>
              <p>(3) Die Kündigung muss schriftlich (auch per E-Mail) erfolgen.</p>
              <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
                <p><strong>Nach Vertragsbeendigung:</strong></p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Der Zugang wird gesperrt</li>
                  <li>Daten können 30 Tage lang exportiert werden</li>
                  <li>Danach werden alle Daten gelöscht</li>
                  <li>Bereits gezahlte Beträge werden nicht erstattet</li>
                </ul>
              </div>
              <p>(4) Ein wichtiger Grund liegt insbesondere vor bei:</p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Schwerwiegender Verletzung dieser AGB</li>
                <li>Zahlungsverzug trotz Mahnung</li>
                <li>Rechtswidrigem Verhalten des Nutzers</li>
              </ul>
            </CardContent>
          </Card>

          {/* § 10 Schlussbestimmungen */}
          <Card>
            <CardHeader>
              <CardTitle>§ 10 Schlussbestimmungen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-600">
              <p>(1) Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.</p>
              <p>(2) Gerichtsstand für alle Streitigkeiten ist <strong>[AUSFÜLLEN: Sitz des Anbieters]</strong>, sofern der Nutzer Vollkaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.</p>
              <p>(3) Sollten einzelne Bestimmungen unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</p>
              <p>(4) Änderungen dieser AGB werden dem Nutzer per E-Mail mitgeteilt und gelten als genehmigt, wenn nicht binnen eines Monats widersprochen wird.</p>
              <p>(5) Nebenabreden bestehen nicht. Änderungen und Ergänzungen bedürfen der Schriftform.</p>
              <p className="pt-4 border-t">
                <strong>Stand:</strong> Februar 2026<br />
                <strong>[AUSFÜLLEN]</strong> Firmenname<br />
                <strong>[AUSFÜLLEN]</strong> Adresse
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}