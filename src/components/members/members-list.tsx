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
  Phone,
  Users
} from 'lucide-react'
import type { Member } from '@/types'

interface MembersListProps {
  members: Member[]
  clubId: string
}

export function MembersList({ members: initialMembers }: MembersListProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMembers = initialMembers.filter((member) => {
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

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('de-DE').format(new Date(dateString))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Mitglieder-Cockpit
          </h1>
          <p className="text-gray-600 mt-1">
            Alle Vereinsmitglieder im Überblick verwalten
          </p>
        </div>
        <Link href="/dashboard/members/new">
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg transform hover:scale-105 transition-all">
            <Plus className="w-4 h-4 mr-2" />
            ✨ Neues Mitglied
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card className="border-emerald-100">
        <CardHeader>
          <CardTitle className="text-lg text-emerald-900 flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Mitglieder durchsuchen
          </CardTitle>
          <CardDescription>
            Findet schnell das gesuchte Mitglied
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 w-4 h-4" />
            <Input
              placeholder="Name oder E-Mail eingeben..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-4 text-sm text-gray-600">
            <span>🔍 Gefunden: {filteredMembers.length} von {initialMembers.length} Mitgliedern</span>
            <span>•</span>
            <span>✅ Aktiv: {initialMembers.filter(m => m.status === 'aktiv').length}</span>
            <span>•</span>
            <span>⏸️ Inaktiv: {initialMembers.filter(m => m.status === 'inaktiv').length}</span>
          </div>
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card className="border-gray-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-900">Mitgliederliste</CardTitle>
          <CardDescription>
            Alle Vereinsmitglieder in der Übersicht
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
                    <TableRow key={member.id} className="hover:bg-emerald-50">
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
                            <Mail className="w-3 h-3 mr-2 text-emerald-500" />
                            {member.email}
                          </div>
                          {member.phone && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="w-3 h-3 mr-2 text-emerald-500" />
                              {member.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="hidden lg:table-cell">
                        <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                          {getRoleLabel(member.role)}
                        </Badge>
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
                            <Button variant="ghost" size="sm" className="hover:bg-emerald-50">
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
                            <DropdownMenuItem className="text-red-600 focus:text-red-600">
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
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                {searchTerm ? (
                  <Search className="w-10 h-10 text-emerald-500" />
                ) : (
                  <Users className="w-10 h-10 text-emerald-500" />
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {searchTerm ? 'Keine Mitglieder gefunden 🔍' : 'Noch keine Mitglieder da 👥'}
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm 
                  ? 'Versucht es mit einem anderen Suchbegriff.' 
                  : 'Fügt euer erstes Mitglied hinzu und startet durch!'
                }
              </p>
              {!searchTerm && (
                <Link href="/dashboard/members/new">
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg transform hover:scale-105 transition-all">
                    <Plus className="w-4 h-4 mr-2" />
                    ✨ Erstes Mitglied hinzufügen
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