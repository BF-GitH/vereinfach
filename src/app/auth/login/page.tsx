import { AuthForm } from '@/components/auth/auth-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Anmelden',
  description: 'Loggt euch in euer VereinFach-Konto ein und verwaltet euren Verein.',
}

export default function LoginPage() {
  return <AuthForm mode="login" />
}