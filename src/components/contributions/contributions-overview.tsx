'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2,
  CreditCard,
  Clock,
  CheckCircle,
  AlertTriangle,
  Euro,
  TrendingUp
} from 'lucide-react'
import type { ContributionType, Contribution } from '@/types'

interface ContributionsOverviewProps {
  contributionTypes: ContributionType[]
  contributions: (Contribution & { member?: any; contribution_type?: ContributionType })[]
  clubId: string
}

export function ContributionsOverview({ 
  contributionTypes,
  contributions
}: ContributionsOverviewProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredContributions = contributions.filter((contribution) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      contribution.member?.first_name.toLowerCase().includes(searchLower) ||
      contribution.member?.last_name.toLowerCase().includes(searchLower) ||
      contribution.contribution_type?.name.toLowerCase().includes(searchLower)
    )
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      offen: { variant: 'secondary', label: 'Offen', icon: Clock, color: 'text-orange-600' },
      bezahlt: { variant: 'default', label: 'Bezahlt', icon: CheckCircle, color: 'text-emerald-600' },
      überfällig: { variant: 'destructive', label: 'Überfällig', icon: AlertTriangle, color: 'text-red-600' },
      erlassen: { variant: 'outline', label: 'Erlassen', icon: CheckCircle, color: 'text-gray-600' }
    } as const

    const config = variants[status as keyof typeof variants] || variants.offen
    const Icon = config.icon

    return (
      <Badge variant={config.variant as any} className="flex items-center gap-1">
        <Icon className={`w-3 h-3 ${config.color}`} />
        {config.label}
      </Badge>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('de-DE').format(new Date(dateString))
  }

  const stats = {
    total: contributions.length,
    open: contributions.filter(c => c.status === 'offen').length,
    paid: contributions.filter(c => c.status === 'bezahlt').length,
    overdue: contributions.filter(c => c.status === 'überfällig').length,
    totalAmount: contributions.reduce((sum, c) => sum + c.amount, 0),
    openAmount: contributions.filter(c => c.status === 'offen').reduce((sum, c) => sum + c.amount, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Beitrags-Cockpit
          </h1>
          <p className="text-gray-600 mt-1">
            Beitragsarten verwalten und Zahlungen im Blick behalten
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/contributions/types/new">
            <Button variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
              <Plus className="w-4 h-4 mr-2" />
              Beitragsart
            </Button>
          </Link>
          <Button disabled className="bg-gradient-to-r from-teal-500 to-cyan-600 opacity-50">
            <Plus className="w-4 h-4 mr-2" />
            Beitrag zuweisen
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-orange-200 hover:shadow-lg transition-all hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Offene Beiträge
            </CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <Clock className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.open}</div>
            <p className="text-xs text-orange-600 mt-1 flex items-center">
              <Euro className="w-3 h-3 mr-1" />
              {formatCurrency(stats.openAmount)} ausstehend
            </p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 hover:shadow-lg transition-all hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Bezahlte Beiträge
            </CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.paid}</div>
            <p className="text-xs text-emerald-600 mt-1 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              {((stats.paid / stats.total) * 100 || 0).toFixed(1)}% Zahlungsrate
            </p>
          </CardContent>
        </Card>

        <Card className="border-red-200 hover:shadow-lg transition-all hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Überfällige Beiträge
            </CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.overdue}</div>
            <p className="text-xs text-red-600 mt-1">
              ⚠️ Benötigen Aufmerksamkeit
            </p>
          </CardContent>
        </Card>

        <Card className="border-cyan-200 hover:shadow-lg transition-all hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Beitragsarten
            </CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{contributionTypes.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              📋 Definierte Arten
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="contributions" className="space-y-6">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="contributions" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            💰 Beiträge
          </TabsTrigger>
          <TabsTrigger value="types" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            📋 Beitragsarten
          </TabsTrigger>
        </TabsList>

        {/* Contributions Tab */}
        <TabsContent value="contributions" className="space-y-6">
          <Card className="border-teal-100">
            <CardHeader>
              <CardTitle className="text-lg text-teal-900 flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Beiträge durchsuchen
              </CardTitle>
              <CardDescription>
                Nach Mitgliedernamen oder Beitragsarten suchen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-4 h-4" />
                <Input
                  placeholder="Name oder Beitragsart eingeben..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">Beitragsliste</CardTitle>
              <CardDescription>
                Alle Beiträge und deren Zahlungsstatus
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredContributions.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mitglied</TableHead>
                        <TableHead>Beitragsart</TableHead>
                        <TableHead>Betrag</TableHead>
                        <TableHead className="hidden md:table-cell">Fällig am</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContributions.map((contribution) => (
                        <TableRow key={contribution.id} className="hover:bg-teal-50">
                          <TableCell>
                            <div className="font-medium text-gray-900">
                              {contribution.member?.first_name} {contribution.member?.last_name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-teal-200 text-teal-700">
                              {contribution.contribution_type?.name}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium text-emerald-600">
                            {formatCurrency(contribution.amount)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-gray-600">
                            {formatDate(contribution.due_date)}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(contribution.status)}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="hover:bg-teal-50">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />
                                  Als bezahlt markieren
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Bearbeiten
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <CreditCard className="w-10 h-10 text-teal-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Keine Beiträge gefunden 💰
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm ? 'Versucht es mit einem anderen Suchbegriff.' : 'Noch keine Beiträge erstellt.'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contribution Types Tab */}
        <TabsContent value="types">
          <Card className="border-gray-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">Beitragsarten</CardTitle>
              <CardDescription>
                Verwaltet die verschiedenen Beitragsarten eures Vereins
              </CardDescription>
            </CardHeader>
            <CardContent>
              {contributionTypes.length > 0 ? (
                <div className="grid gap-4">
                  {contributionTypes.map((type) => (
                    <div key={type.id} className="border border-teal-100 rounded-xl p-6 flex justify-between items-start hover:shadow-lg transition-all hover:border-teal-200">
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold text-gray-900">{type.name}</h3>
                        {type.description && (
                          <p className="text-gray-600">{type.description}</p>
                        )}
                        <div className="flex items-center gap-6 text-sm">
                          <span className="font-bold text-emerald-600 text-xl">{formatCurrency(type.amount)}</span>
                          <Badge variant="outline" className="border-teal-200 text-teal-700">
                            {type.interval}
                          </Badge>
                          {type.due_day && (
                            <span className="text-gray-500">📅 Fällig: {type.due_day}. Tag</span>
                          )}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="hover:bg-teal-50">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link href={`/dashboard/contributions/types/${type.id}/edit`}>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Bearbeiten
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem className="text-red-600 focus:text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Löschen
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <CreditCard className="w-10 h-10 text-teal-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Noch keine Beitragsarten 📋
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Erstellt eure erste Beitragsart, um mit der Beitragsverwaltung zu starten.
                  </p>
                  <Link href="/dashboard/contributions/types/new">
                    <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 shadow-lg transform hover:scale-105 transition-all">
                      <Plus className="w-4 h-4 mr-2" />
                      ✨ Erste Beitragsart erstellen
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}