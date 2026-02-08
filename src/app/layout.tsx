import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import CookieBanner from '@/components/legal/cookie-banner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | VereinFach',
    default: 'VereinFach - Vereinsarbeit einfach gemacht'
  },
  description: 'VereinFach macht Vereinsarbeit endlich einfach. Moderne Vereinsverwaltung für deutsche Vereine - intuitiv, sicher und datenschutzfreundlich.',
  keywords: ['Vereinsverwaltung', 'Vereinssoftware', 'Mitgliederverwaltung', 'Deutschland', 'datenschutzfreundlich', 'einfach', 'modern'],
  authors: [{ name: 'VereinFach' }],
  creator: 'VereinFach',
  publisher: 'VereinFach',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vereinfach.de'),
  openGraph: {
    title: 'VereinFach - Vereinsarbeit einfach gemacht',
    description: 'VereinFach macht Vereinsarbeit endlich einfach. Moderne Vereinsverwaltung für deutsche Vereine - intuitiv, sicher und datenschutzfreundlich.',
    url: 'https://vereinfach.de',
    siteName: 'VereinFach',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VereinFach - Vereinsarbeit einfach gemacht',
    description: 'VereinFach macht Vereinsarbeit endlich einfach. Moderne Vereinsverwaltung für deutsche Vereine - intuitiv, sicher und datenschutzfreundlich.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster />
        <CookieBanner />
      </body>
    </html>
  )
}