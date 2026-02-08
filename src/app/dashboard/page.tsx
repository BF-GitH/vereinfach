import { getUser, getClubProfile, createClient } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  Heart,
  Plus,
  Eye,
  Clock,
  Zap,
  Star,
  CheckCircle,
  AlertTriangle,
  Coffee
} from 'lucide-react'
import Link from 'next/link'
import type { DashboardStats, Activity } from '@/types'

async function getDashboardStats(clubId: string): Promise<DashboardStats> {
  const supabase = await createClient()

  // Get member statistics
  const { data: members } = await supabase
    .from('members')
    .select('status')
    .eq('club_id', clubId)

  const totalMembers = members?.length || 0
  const activeMembers = members?.filter(m => m.status === 'aktiv').length || 0
  const inactiveMembers = members?.filter(m => m.status === 'inaktiv').length || 0

  // Get outstanding contributions
  const { data: contributions } = await supabase
    .from('contributions')
    .select('amount, status')
    .eq('member_id', clubId)
    .in('status', ['offen', 'überfällig'])

  const totalOutstandingAmount = contributions?.reduce((sum, c) => sum + c.amount, 0) || 0
  const outstandingContributions = contributions?.length || 0

  // Get recent activities
  const { data: activities } = await supabase
    .from('activities')
    .select('*')
    .eq('club_id', clubId)
    .order('created_at', { ascending: false })
    .limit(5)

  return {
    totalMembers,
    activeMembers,
    inactiveMembers,
    outstandingContributions,
    totalOutstandingAmount,
    recentActivities: activities || []
  }
}

export default async function DashboardPage() {
  const user = await getUser()
  const clubProfile = await getClubProfile(user!.id)
  const stats = await getDashboardStats(clubProfile!.id)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold">Vereins-Cockpit</h1>
            </div>
            <p className="text-emerald-100 text-lg">
              Willkommen zurück! Hier ist alles Wichtige zu eurem Verein auf einen Blick.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <div className="text-2xl font-bold">{new Date().toLocaleDateString('de-DE', { weekday: 'long' })}</div>
              <div className="text-emerald-100">{new Date().toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-emerald-200 hover:shadow-lg transition-all hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Mitglieder gesamt
            </CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalMembers}</div>
            <p className="text-xs text-emerald-600 flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              {stats.activeMembers} aktiv • {stats.inactiveMembers} inaktiv
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 hover:shadow-lg transition-all hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Offene Beiträge
            </CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.outstandingContributions}</div>
            <p className="text-xs text-orange-600 flex items-center">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {formatCurrency(stats.totalOutstandingAmount)} ausstehend
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 hover:shadow-lg transition-all hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Wachstum
            </CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-1">+0</div>
            <p className="text-xs text-gray-500 flex items-center">
              <Star className="w-3 h-3 mr-1" />
              Neue Mitglieder diesen Monat
            </p>
          </CardContent>
        </Card>

        <Card className="border-cyan-200 hover:shadow-lg transition-all hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Vereins-Health
            </CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600 mb-1">💚</div>
            <p className="text-xs text-gray-500 flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              Alles läuft super
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-emerald-100">
          <CardHeader>
            <CardTitle className="flex items-center text-emerald-900">
              <Zap className="w-5 h-5 mr-2" />
              Schnell-Aktionen
            </CardTitle>
            <CardDescription>
              Die häufigsten Aufgaben für euren Verein
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/dashboard/members/new">
              <Button className="w-full justify-start bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg transform hover:scale-105 transition-all">
                <Plus className="mr-2 h-4 w-4" />
                ✨ Neues Mitglied hinzufügen
              </Button>
            </Link>
            <Link href="/dashboard/contributions/types/new">
              <Button className="w-full justify-start bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 shadow-lg transform hover:scale-105 transition-all">
                <CreditCard className="mr-2 h-4 w-4" />
                💰 Beitragsart erstellen
              </Button>
            </Link>
            <Link href="/dashboard/members">
              <Button variant="outline" className="w-full justify-start border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                <Eye className="mr-2 h-4 w-4" />
                👥 Alle Mitglieder anzeigen
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-gray-100">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <Clock className="w-5 h-5 mr-2" />
              Was ist passiert?
            </CardTitle>
            <CardDescription>
              Die neuesten Aktivitäten in eurem Verein
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats.recentActivities.length > 0 ? (
              <div className="space-y-4">
                {stats.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                        <Clock className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 font-medium">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(activity.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Noch sehr ruhig hier 😴
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Sobald ihr Mitglieder hinzufügt oder Beiträge verwaltet, 
                  seht ihr hier alle Aktivitäten.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Onboarding für neue Vereine */}
      {stats.totalMembers === 0 && (
        <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50">
          <CardHeader>
            <CardTitle className="text-emerald-900 flex items-center">
              <Heart className="w-6 h-6 mr-2" />
              Willkommen bei VereinFach! 🎉
            </CardTitle>
            <CardDescription className="text-emerald-700">
              Großartig, dass ihr VereinFach ausprobiert! Hier sind die ersten Schritte für euren Verein.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-xl border border-emerald-100">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Mitglieder hinzufügen</h4>
                <p className="text-sm text-gray-600">Startet mit euren ersten Mitgliedern</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-emerald-100">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Beiträge definieren</h4>
                <p className="text-sm text-gray-600">Legt eure Beitragsarten fest</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-emerald-100">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Durchstarten</h4>
                <p className="text-sm text-gray-600">Euren Verein einfach verwalten</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link href="/dashboard/members/new">
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg transform hover:scale-105 transition-all">
                  <Plus className="mr-2 h-5 w-5" />
                  🚀 Erstes Mitglied hinzufügen
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}