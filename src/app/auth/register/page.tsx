import { AuthForm } from '@/components/auth/auth-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Registrieren',
  description: 'Erstellt euer kostenloses VereinFach-Konto und startet noch heute mit der einfachen Vereinsverwaltung.',
}

export default function RegisterPage() {
  return <AuthForm mode="register" />
}