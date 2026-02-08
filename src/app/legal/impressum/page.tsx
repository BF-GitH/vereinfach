import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, AlertTriangle } from 'lucide-react'

export default function ImpressumPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Impressum</h1>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
              <div>
                <p className="text-yellow-800 font-medium">
                  [VOR LAUNCH AUSFÜLLEN]
                </p>
                <p className="text-yellow-700 text-sm mt-1">
                  Diese Angaben müssen vor dem Launch durch echte Daten ersetzt werden.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Angaben gemäß § 5 TMG / § 25 MedienG (AT)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Verantwortlich für den Inhalt:</h3>
              <div className="text-gray-600 bg-red-50 p-4 rounded border-l-4 border-red-400">
                <p><strong>[AUSFÜLLEN]</strong> Firmenname / Vollständiger Name</p>
                <p><strong>[AUSFÜLLEN]</strong> Straße und Hausnummer</p>
                <p><strong>[AUSFÜLLEN]</strong> PLZ Ort</p>
                <p><strong>[AUSFÜLLEN]</strong> Land</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Kontakt:</h3>
              <div className="text-gray-600 bg-red-50 p-4 rounded border-l-4 border-red-400">
                <p>Telefon: <strong>[AUSFÜLLEN]</strong> +49 (0) XXX XXXXXXX</p>
                <p>E-Mail: <strong>[AUSFÜLLEN]</strong> kontakt@[domain].de</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Handelsregister:</h3>
              <div className="text-gray-600 bg-red-50 p-4 rounded border-l-4 border-red-400">
                <p>Registergericht: <strong>[NACH GEWERBEANMELDUNG]</strong></p>
                <p>Registernummer: <strong>[NACH GEWERBEANMELDUNG]</strong></p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Umsatzsteuer-ID:</h3>
              <div className="text-gray-600 bg-red-50 p-4 rounded border-l-4 border-red-400">
                <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
                <p><strong>[NACH GEWERBEANMELDUNG]</strong> DE XXX XXX XXX</p>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h3 className="font-semibold text-gray-900 mb-2">Haftungsausschluss (Disclaimer)</h3>
              
              <div className="space-y-4 text-gray-600">
                <div>
                  <h4 className="font-medium text-gray-700">Haftung für Inhalte</h4>
                  <p className="text-sm">
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Haftung für Links</h4>
                  <p className="text-sm">
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Urheberrecht</h4>
                  <p className="text-sm">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}