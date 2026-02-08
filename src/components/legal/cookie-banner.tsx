'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { X, Cookie } from 'lucide-react'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieAccepted = localStorage.getItem('cookie-consent-accepted')
    if (!cookieAccepted) {
      setIsVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent-accepted', 'true')
    localStorage.setItem('cookie-consent-timestamp', new Date().toISOString())
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="max-w-4xl mx-auto border-emerald-200 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Cookie className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Cookies und Datenschutz
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Diese Website verwendet nur <strong>technisch notwendige Cookies</strong> für 
                die Anmeldung und den Betrieb der Anwendung. Wir setzen keine Tracking-Cookies 
                oder Analytics-Tools ein. Details finden Sie in unserer{' '}
                <a 
                  href="/legal/datenschutz" 
                  className="text-emerald-600 hover:underline"
                >
                  Datenschutzerklärung
                </a>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={acceptCookies}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                >
                  Verstanden
                </Button>
                <Button 
                  variant="outline" 
                  asChild
                  className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                >
                  <a href="/legal/datenschutz">Mehr erfahren</a>
                </Button>
              </div>
            </div>

            <button
              onClick={acceptCookies}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Banner schließen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CookieBanner