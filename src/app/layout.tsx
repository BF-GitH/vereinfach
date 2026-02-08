import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | VereinFach',
    default: 'VereinFach - Vereinsarbeit einfach gemacht'
  },
  description: 'VereinFach macht Vereinsarbeit endlich einfach. Moderne Vereinsverwaltung für deutsche Vereine - intuitiv, sicher und DSGVO-konform.',
  keywords: ['Vereinsverwaltung', 'Vereinssoftware', 'Mitgliederverwaltung', 'Deutschland', 'DSGVO', 'einfach', 'modern'],
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
    description: 'VereinFach macht Vereinsarbeit endlich einfach. Moderne Vereinsverwaltung für deutsche Vereine - intuitiv, sicher und DSGVO-konform.',
    url: 'https://vereinfach.de',
    siteName: 'VereinFach',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VereinFach - Vereinsarbeit einfach gemacht',
    description: 'VereinFach macht Vereinsarbeit endlich einfach. Moderne Vereinsverwaltung für deutsche Vereine - intuitiv, sicher und DSGVO-konform.',
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
      </body>
    </html>
  )
}