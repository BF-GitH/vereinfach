'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase-client'
import { toast } from 'sonner'
import { Heart, Loader2 } from 'lucide-react'

interface AuthFormProps {
  mode: 'login' | 'register'
}

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [clubName, setClubName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (mode === 'register') {
        if (password !== confirmPassword) {
          toast.error('Die Passwörter stimmen nicht überein')
          return
        }

        if (password.length < 6) {
          toast.error('Das Passwort muss mindestens 6 Zeichen lang sein')
          return
        }

        if (!clubName.trim()) {
          toast.error('Bitte gebt den Vereinsnamen ein')
          return
        }

        if (!privacyAccepted) {
          toast.error('Bitte stimmt der Datenschutzerklärung zu')
          return
        }

        if (!termsAccepted) {
          toast.error('Bitte akzeptiert die AGB')
          return
        }

        // Save consent timestamp
        const consentTimestamp = new Date().toISOString()
        localStorage.setItem('consent-timestamp', consentTimestamp)

        // Register user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              club_name: clubName,
              privacy_consent_timestamp: consentTimestamp,
              terms_consent_timestamp: consentTimestamp,
            }
          }
        })

        if (authError) {
          toast.error('Registrierung fehlgeschlagen: ' + authError.message)
          return
        }

        if (authData.user) {
          // Create club profile
          const { error: profileError } = await supabase
            .from('club_profiles')
            .insert({
              user_id: authData.user.id,
              name: clubName,
            })

          if (profileError) {
            console.error('Fehler beim Erstellen des Vereinsprofils:', profileError)
          }

          toast.success('🎉 Registrierung erfolgreich! Bitte bestätigt eure E-Mail-Adresse.')
          router.push('/auth/login')
        }
      } else {
        // Login user
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('❌ E-Mail oder Passwort falsch')
          } else {
            toast.error('Anmeldung fehlgeschlagen: ' + error.message)
          }
          return
        }

        if (data.user) {
          toast.success('🚀 Erfolgreich angemeldet!')
          router.push('/dashboard')
        }
      }
    } catch (error) {
      console.error('Auth Fehler:', error)
      toast.error('Ein unerwarteter Fehler ist aufgetreten')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              VereinFach
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {mode === 'login' ? 'Willkommen zurück!' : 'Vereinsarbeit einfach machen'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {mode === 'login' 
              ? 'Loggt euch in euer Cockpit ein und legt los.' 
              : 'Erstellt euer kostenloses VereinFach-Konto in unter 2 Minuten.'
            }
          </p>
        </div>

        {/* Form */}
        <Card className="border-emerald-100 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-emerald-900">
              {mode === 'login' ? 'Anmelden' : 'Kostenlos registrieren'}
            </CardTitle>
            <CardDescription>
              {mode === 'login' 
                ? 'Gebt eure Anmeldedaten ein' 
                : 'Startet jetzt durch mit VereinFach'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="clubName" className="text-gray-700">
                    Vereinsname *
                  </Label>
                  <Input
                    id="clubName"
                    type="text"
                    placeholder="z.B. FC Musterstadt, Turnverein Beispielheim e.V."
                    value={clubName}
                    onChange={(e) => setClubName(e.target.value)}
                    required
                    disabled={isLoading}
                    className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  E-Mail-Adresse *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="eure.email@verein.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Passwort *
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mindestens 6 Zeichen"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                  className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              {mode === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700">
                    Passwort bestätigen *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Passwort wiederholen"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    minLength={6}
                    className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              )}

              {mode === 'register' && (
                <div className="space-y-4 pt-2 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-700">
                    Zustimmung erforderlich:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="privacy-consent"
                        checked={privacyAccepted}
                        onChange={(e) => setPrivacyAccepted(e.target.checked)}
                        disabled={isLoading}
                        className="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        required
                      />
                      <label htmlFor="privacy-consent" className="text-sm text-gray-600 leading-5">
                        Ich habe die{' '}
                        <Link href="/legal/datenschutz" target="_blank" className="text-emerald-600 hover:underline font-medium">
                          Datenschutzerklärung
                        </Link>{' '}
                        gelesen und stimme der Verarbeitung meiner Daten zu. *
                      </label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="terms-consent"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        disabled={isLoading}
                        className="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        required
                      />
                      <label htmlFor="terms-consent" className="text-sm text-gray-600 leading-5">
                        Ich akzeptiere die{' '}
                        <Link href="/legal/agb" target="_blank" className="text-emerald-600 hover:underline font-medium">
                          Allgemeinen Geschäftsbedingungen
                        </Link>. *
                      </label>
                    </div>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg transform hover:scale-105 transition-all" 
                disabled={isLoading}
                size="lg"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === 'login' 
                  ? (isLoading ? 'Wird angemeldet...' : '🚀 Ins Cockpit')
                  : (isLoading ? 'Wird erstellt...' : '✨ Konto erstellen')
                }
              </Button>

              {mode === 'register' && (
                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  Mit der Registrierung stimmt ihr unseren{' '}
                  <Link href="/legal/agb" className="text-emerald-600 hover:underline font-medium">
                    Nutzungsbedingungen
                  </Link>{' '}
                  und der{' '}
                  <Link href="/legal/datenschutz" className="text-emerald-600 hover:underline font-medium">
                    Datenschutzerklärung
                  </Link>{' '}
                  zu.
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Switch between login/register */}
        <div className="text-center">
          {mode === 'login' ? (
            <p className="text-sm text-gray-600">
              Noch kein Konto?{' '}
              <Link href="/auth/register" className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors">
                Jetzt kostenlos registrieren 🎉
              </Link>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Bereits ein Konto?{' '}
              <Link href="/auth/login" className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors">
                Hier anmelden 👋
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}