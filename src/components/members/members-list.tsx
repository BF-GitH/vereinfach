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
  Eye,
  Mail,
  Phone
} from 'lucide-react'
import { supabase } from '@/lib/supabase-client'
import { toast } from 'sonner'
import type { Member } from '@/types'

interface MembersListProps {
  members: Member[]
  clubId: string
}

export function MembersList({ members: initialMembers, clubId }: MembersListProps) {
  const [members, setMembers] = useState(initialMembers)
  const [searchTerm, setSearchTerm] = useState('')
  const [isPending, startTransition] = useTransition()

  const filteredMembers = members.filter((member) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      member.first_name.toLowerCase().includes(searchLower) ||
      member.last_name.toLowerCase().includes(searchLower) ||
      member.email.toLowerCase().includes(searchLower)
    )
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      aktiv: 'default',
      inaktiv: 'secondary',
      ausgetreten: 'destructive'
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'default'}>
        {status === 'aktiv' ? 'Aktiv' : status === 'inaktiv' ? 'Inaktiv' : 'Ausgetreten'}
      </Badge>
    )
  }

  const getRoleLabel = (role: string) => {
    const roles = {
      mitglied: 'Mitglied',
      vorstand: 'Vorstand',
      kassier: 'Kassier',
      schriftführer: 'Schriftführer',
      admin: 'Administrator'
    }
    return roles[role as keyof typeof roles] || role
  }

  const handleStatusChange = async (memberId: string, newStatus: string) => {
    try {
      startTransition(async () => {
        const supabase = await createClient()
        
        const { error } = await supabase
          .from('members')
          .update({ 
            status: newStatus,
            updated_at: new Date().toISOString()
          })
          .eq('id', memberId)

        if (error) {
          toast.error('Fehler beim Ändern des Status')
          return
        }

        // Update local state
        setMembers(prev => prev.map(member => 
          member.id === memberId 
            ? { ...member, status: newStatus as any }
            : member
        ))

        toast.success('Status erfolgreich geändert')
      })
    } catch (error) {
      console.error('Status change error:', error)
      toast.error('Ein Fehler ist aufgetreten')
    }
  }

  const handleDelete = async (member: Member) => {
    if (!confirm(`Sind Sie sicher, dass Sie ${member.first_name} ${member.last_name} löschen möchten?`)) {
      return
    }

    try {
      startTransition(async () => {
        const supabase = await createClient()
        
        const { error } = await supabase
          .from('members')
          .delete()
          .eq('id', member.id)

        if (error) {
          toast.error('Fehler beim Löschen des Mitglieds')
          return
        }

        // Update local state
        setMembers(prev => prev.filter(m => m.id !== member.id))

        toast.success('Mitglied erfolgreich gelöscht')
      })
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Ein Fehler ist aufgetreten')
    }
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('de-DE').format(new Date(dateString))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mitgliederverwaltung</h1>
          <p className="text-gray-600 mt-1">
            Verwalten Sie alle Mitglieder Ihres Vereins
          </p>
        </div>
        <Link href="/dashboard/members/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Neues Mitglied
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Mitglieder durchsuchen</CardTitle>
          <CardDescription>
            Durchsuchen Sie nach Namen oder E-Mail-Adressen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Name oder E-Mail eingeben..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-4 text-sm text-gray-600">
            <span>Gefunden: {filteredMembers.length} von {members.length} Mitgliedern</span>
            <span>•</span>
            <span>Aktiv: {members.filter(m => m.status === 'aktiv').length}</span>
            <span>•</span>
            <span>Inaktiv: {members.filter(m => m.status === 'inaktiv').length}</span>
          </div>
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Mitgliederliste</CardTitle>
          <CardDescription>
            Alle Mitglieder Ihres Vereins im Überblick
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredMembers.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Kontakt</TableHead>
                    <TableHead className="hidden lg:table-cell">Rolle</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Beitritt</TableHead>
                    <TableHead className="text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900">
                            {member.first_name} {member.last_name}
                          </div>
                          <div className="text-sm text-gray-500 md:hidden">
                            {member.email}
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell className="hidden md:table-cell">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="w-3 h-3 mr-2" />
                            {member.email}
                          </div>
                          {member.phone && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="w-3 h-3 mr-2" />
                              {member.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="hidden lg:table-cell">
                        {getRoleLabel(member.role)}
                      </TableCell>

                      <TableCell>
                        {getStatusBadge(member.status)}
                      </TableCell>

                      <TableCell className="hidden lg:table-cell text-sm text-gray-600">
                        {formatDate(member.join_date)}
                      </TableCell>

                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Link href={`/dashboard/members/${member.id}`}>
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                Anzeigen
                              </DropdownMenuItem>
                            </Link>
                            <Link href={`/dashboard/members/${member.id}/edit`}>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Bearbeiten
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(
                                member.id, 
                                member.status === 'aktiv' ? 'inaktiv' : 'aktiv'
                              )}
                              disabled={isPending}
                            >
                              Status: {member.status === 'aktiv' ? 'Deaktivieren' : 'Aktivieren'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(member)}
                              className="text-red-600 focus:text-red-600"
                              disabled={isPending}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Löschen
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
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Keine Mitglieder gefunden
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'Keine Mitglieder entsprechen Ihrem Suchbegriff.' : 'Sie haben noch keine Mitglieder hinzugefügt.'}
              </p>
              {!searchTerm && (
                <Link href="/dashboard/members/new">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Erstes Mitglied hinzufügen
                  </Button>
                </Link>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}