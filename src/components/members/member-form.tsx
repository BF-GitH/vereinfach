'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase-client'
import { toast } from 'sonner'
import { Loader2, ArrowLeft } from 'lucide-react'
import type { Member, MemberRole, CreateMemberForm } from '@/types'

interface MemberFormProps {
  clubId: string
  member?: Member
  mode: 'create' | 'edit'
}

export function MemberForm({ clubId, member, mode }: MemberFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<CreateMemberForm>({
    first_name: member?.first_name || '',
    last_name: member?.last_name || '',
    email: member?.email || '',
    phone: member?.phone || '',
    address: member?.address || '',
    birth_date: member?.birth_date || '',
    role: member?.role || 'mitglied'
  })

  const roles: { value: MemberRole; label: string }[] = [
    { value: 'mitglied', label: 'Mitglied' },
    { value: 'vorstand', label: 'Vorstand' },
    { value: 'kassier', label: 'Kassier' },
    { value: 'schriftführer', label: 'Schriftführer' },
    { value: 'admin', label: 'Administrator' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Client-side supabase ist verfügbar

      if (mode === 'create') {
        const { data, error } = await supabase
          .from('members')
          .insert({
            club_id: clubId,
            ...formData,
            birth_date: formData.birth_date || null,
            phone: formData.phone || null,
            address: formData.address || null
          })
          .select()
          .single()

        if (error) {
          if (error.code === '23505') {
            toast.error('Ein Mitglied mit dieser E-Mail-Adresse existiert bereits')
          } else {
            toast.error('Fehler beim Erstellen des Mitglieds: ' + error.message)
          }
          return
        }

        // Log activity
        await supabase
          .from('activities')
          .insert({
            club_id: clubId,
            type: 'member_added',
            description: `Neues Mitglied hinzugefügt: ${formData.first_name} ${formData.last_name}`,
            member_id: data.id,
            member_name: `${formData.first_name} ${formData.last_name}`
          })

        toast.success('Mitglied erfolgreich hinzugefügt')
      } else {
        const { error } = await supabase
          .from('members')
          .update({
            ...formData,
            birth_date: formData.birth_date || null,
            phone: formData.phone || null,
            address: formData.address || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', member!.id)

        if (error) {
          toast.error('Fehler beim Aktualisieren des Mitglieds: ' + error.message)
          return
        }

        // Log activity
        await supabase
          .from('activities')
          .insert({
            club_id: clubId,
            type: 'member_updated',
            description: `Mitglied aktualisiert: ${formData.first_name} ${formData.last_name}`,
            member_id: member!.id,
            member_name: `${formData.first_name} ${formData.last_name}`
          })

        toast.success('Mitglied erfolgreich aktualisiert')
      }

      router.push('/dashboard/members')
    } catch (error) {
      console.error('Member form error:', error)
      toast.error('Ein Fehler ist aufgetreten')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Neues Mitglied hinzufügen' : 'Mitglied bearbeiten'}
          </h1>
          <p className="text-gray-600 mt-1">
            {mode === 'create' 
              ? 'Fügen Sie ein neues Mitglied zu Ihrem Verein hinzu'
              : 'Bearbeiten Sie die Mitgliedsdaten'
            }
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mitgliedsdaten</CardTitle>
          <CardDescription>
            Geben Sie die grundlegenden Informationen zum Mitglied ein.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">Vorname *</Label>
                <Input
                  id="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  required
                  disabled={isLoading}
                  placeholder="Max"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name">Nachname *</Label>
                <Input
                  id="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  required
                  disabled={isLoading}
                  placeholder="Mustermann"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-Mail-Adresse *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isLoading}
                placeholder="max.mustermann@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefonnummer</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={isLoading}
                placeholder="+49 123 456789"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={isLoading}
                placeholder="Musterstraße 123, 12345 Musterstadt"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birth_date">Geburtsdatum</Label>
                <Input
                  id="birth_date"
                  type="date"
                  value={formData.birth_date}
                  onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Rolle *</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value: MemberRole) => setFormData({ ...formData, role: value })}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Rolle auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Abbrechen
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === 'create' 
                  ? (isLoading ? 'Wird hinzugefügt...' : 'Mitglied hinzufügen')
                  : (isLoading ? 'Wird gespeichert...' : 'Änderungen speichern')
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}