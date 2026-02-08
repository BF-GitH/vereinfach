'use client'

import { useState, useTransition } from 'react'
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
  AlertTriangle
} from 'lucide-react'
import { supabase } from '@/lib/supabase-client'
import { toast } from 'sonner'
import type { ContributionType, Contribution } from '@/types'

interface ContributionsOverviewProps {
  contributionTypes: ContributionType[]
  contributions: (Contribution & { member?: any; contribution_type?: ContributionType })[]
  clubId: string
}

export function ContributionsOverview({ 
  contributionTypes: initialTypes, 
  contributions: initialContributions,
  clubId 
}: ContributionsOverviewProps) {
  const [contributionTypes, setContributionTypes] = useState(initialTypes)
  const [contributions, setContributions] = useState(initialContributions)
  const [searchTerm, setSearchTerm] = useState('')
  const [isPending, startTransition] = useTransition()

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
      offen: { variant: 'secondary', label: 'Offen', icon: Clock },
      bezahlt: { variant: 'default', label: 'Bezahlt', icon: CheckCircle },
      überfällig: { variant: 'destructive', label: 'Überfällig', icon: AlertTriangle },
      erlassen: { variant: 'outline', label: 'Erlassen', icon: CheckCircle }
    } as const

    const config = variants[status as keyof typeof variants] || variants.offen
    const Icon = config.icon

    return (
      <Badge variant={config.variant as any} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
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

  const handleMarkAsPaid = async (contributionId: string) => {
    try {
      startTransition(async () => {
        const supabase = await createClient()
        
        const { error } = await supabase
          .from('contributions')
          .update({ 
            status: 'bezahlt',
            paid_date: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', contributionId)

        if (error) {
          toast.error('Fehler beim Markieren als bezahlt')
          return
        }

        // Update local state
        setContributions(prev => prev.map(contribution => 
          contribution.id === contributionId 
            ? { ...contribution, status: 'bezahlt' as any, paid_date: new Date().toISOString() }
            : contribution
        ))

        toast.success('Beitrag als bezahlt markiert')
      })
    } catch (error) {
      console.error('Payment mark error:', error)
      toast.error('Ein Fehler ist aufgetreten')
    }
  }

  const handleDeleteContributionType = async (typeId: string) => {
    if (!confirm('Sind Sie sicher, dass Sie diese Beitragsart löschen möchten?')) {
      return
    }

    try {
      startTransition(async () => {
        const supabase = await createClient()
        
        const { error } = await supabase
          .from('contribution_types')
          .delete()
          .eq('id', typeId)

        if (error) {
          toast.error('Fehler beim Löschen der Beitragsart')
          return
        }

        // Update local state
        setContributionTypes(prev => prev.filter(type => type.id !== typeId))

        toast.success('Beitragsart erfolgreich gelöscht')
      })
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Ein Fehler ist aufgetreten')
    }
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
          <h1 className="text-2xl font-bold text-gray-900">Beitragsverwaltung</h1>
          <p className="text-gray-600 mt-1">
            Verwalten Sie Beitragsarten und verfolgen Sie Zahlungen
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/contributions/types/new">
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Beitragsart
            </Button>
          </Link>
          <Button disabled>
            <Plus className="w-4 h-4 mr-2" />
            Beitrag zuweisen
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Offene Beiträge
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.open}</div>
            <p className="text-xs text-orange-600 mt-1">
              {formatCurrency(stats.openAmount)} ausstehend
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Bezahlte Beiträge
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.paid}</div>
            <p className="text-xs text-green-600 mt-1">
              {((stats.paid / stats.total) * 100 || 0).toFixed(1)}% Zahlungsrate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Überfällige Beiträge
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.overdue}</div>
            <p className="text-xs text-red-600 mt-1">
              Benötigen Aufmerksamkeit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Beitragsarten
            </CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{contributionTypes.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              Definierte Beitragsarten
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="contributions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="contributions">Beiträge</TabsTrigger>
          <TabsTrigger value="types">Beitragsarten</TabsTrigger>
        </TabsList>

        {/* Contributions Tab */}
        <TabsContent value="contributions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Beiträge durchsuchen</CardTitle>
              <CardDescription>
                Durchsuchen Sie nach Mitgliedernamen oder Beitragsarten
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Name oder Beitragsart eingeben..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Beitragsliste</CardTitle>
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
                        <TableRow key={contribution.id}>
                          <TableCell>
                            <div className="font-medium text-gray-900">
                              {contribution.member?.first_name} {contribution.member?.last_name}
                            </div>
                          </TableCell>
                          <TableCell>{contribution.contribution_type?.name}</TableCell>
                          <TableCell className="font-medium">
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
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {contribution.status !== 'bezahlt' && (
                                  <DropdownMenuItem
                                    onClick={() => handleMarkAsPaid(contribution.id)}
                                    disabled={isPending}
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Als bezahlt markieren
                                  </DropdownMenuItem>
                                )}
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
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Keine Beiträge gefunden
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm ? 'Keine Beiträge entsprechen Ihrem Suchbegriff.' : 'Sie haben noch keine Beiträge erstellt.'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contribution Types Tab */}
        <TabsContent value="types">
          <Card>
            <CardHeader>
              <CardTitle>Beitragsarten</CardTitle>
              <CardDescription>
                Verwalten Sie die verschiedenen Beitragsarten Ihres Vereins
              </CardDescription>
            </CardHeader>
            <CardContent>
              {contributionTypes.length > 0 ? (
                <div className="grid gap-4">
                  {contributionTypes.map((type) => (
                    <div key={type.id} className="border rounded-lg p-4 flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-medium text-gray-900">{type.name}</h3>
                        {type.description && (
                          <p className="text-sm text-gray-600">{type.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="font-medium text-gray-900">{formatCurrency(type.amount)}</span>
                          <span>{type.interval}</span>
                          {type.due_day && (
                            <span>Fällig: {type.due_day}. Tag</span>
                          )}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
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
                          <DropdownMenuItem
                            onClick={() => handleDeleteContributionType(type.id)}
                            className="text-red-600 focus:text-red-600"
                            disabled={isPending}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Löschen
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Keine Beitragsarten vorhanden
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Erstellen Sie Ihre erste Beitragsart, um mit der Beitragsverwaltung zu beginnen.
                  </p>
                  <Link href="/dashboard/contributions/types/new">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Erste Beitragsart erstellen
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