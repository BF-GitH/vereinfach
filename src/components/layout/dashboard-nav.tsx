'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  CreditCard, 
  BarChart3, 
  LogOut,
  Settings,
  Menu,
  X,
  Heart
} from 'lucide-react'
import { supabase } from '@/lib/supabase-client'
import { toast } from 'sonner'
import { useState } from 'react'

interface DashboardNavProps {
  clubName: string
}

export function DashboardNav({ clubName }: DashboardNavProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    {
      name: 'Cockpit',
      href: '/dashboard',
      icon: BarChart3,
      current: pathname === '/dashboard',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      name: 'Mitglieder',
      href: '/dashboard/members',
      icon: Users,
      current: pathname.startsWith('/dashboard/members'),
      gradient: 'from-teal-500 to-cyan-600'
    },
    {
      name: 'Beiträge',
      href: '/dashboard/contributions',
      icon: CreditCard,
      current: pathname.startsWith('/dashboard/contributions'),
      gradient: 'from-cyan-500 to-blue-600'
    }
  ]

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        toast.error('Fehler beim Abmelden')
        return
      }
      toast.success('👋 Erfolgreich abgemeldet')
      router.push('/')
    } catch (error) {
      console.error('Abmelde-Fehler:', error)
      toast.error('Fehler beim Abmelden')
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Club Name */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  VereinFach
                </div>
                <div className="text-sm text-gray-500 truncate max-w-xs font-medium">{clubName}</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  item.current
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg transform scale-105`
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/dashboard/settings">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-emerald-600">
                <Settings className="w-4 h-4 mr-2" />
                Einstellungen
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSignOut}
              className="text-gray-600 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Abmelden
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-3">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-xl text-base font-medium transition-all ${
                    item.current
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                      : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="border-t border-gray-200 my-3"></div>
              <Link href="/dashboard/settings">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-600 hover:text-emerald-600 hover:bg-emerald-50" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Einstellungen
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleSignOut}
              >
                <LogOut className="w-5 h-5 mr-3" />
                Abmelden
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}