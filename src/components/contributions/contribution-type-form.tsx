'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'
import { Loader2, ArrowLeft, Euro } from 'lucide-react'
import type { ContributionType, ContributionInterval, CreateContributionTypeForm } from '@/types'

interface ContributionTypeFormProps {
  clubId: string
  contributionType?: ContributionType
  mode: 'create' | 'edit'
}

export function ContributionTypeForm({ clubId, contributionType, mode }: ContributionTypeFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<CreateContributionTypeForm>({
    name: contributionType?.name || '',
    description: contributionType?.description || '',
    amount: contributionType?.amount || 0,
    interval: contributionType?.interval || 'monatlich',
    due_day: contributionType?.due_day || undefined
  })

  const intervals: { value: ContributionInterval; label: string }[] = [
    { value: 'einmalig', label: 'Einmalig' },
    { value: 'monatlich', label: 'Monatlich' },
    { value: 'quartalsweise', label: 'Quartalsweise' },
    { value: 'halbjährlich', label: 'Halbjährlich' },
    { value: 'jährlich', label: 'Jährlich' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = await createClient()

      // Validate amount
      if (formData.amount <= 0) {
        toast.error('Der Betrag muss größer als 0 sein')
        return
      }

      // Validate due day for recurring contributions
      if (formData.interval !== 'einmalig' && formData.due_day) {
        if (formData.due_day < 1 || formData.due_day > 31) {
          toast.error('Der Fälligkeitstag muss zwischen 1 und 31 liegen')
          return
        }
      }

      const dataToInsert = {
        club_id: clubId,
        name: formData.name,
        description: formData.description || null,
        amount: formData.amount,
        interval: formData.interval,
        due_day: formData.interval !== 'einmalig' ? formData.due_day : null
      }

      if (mode === 'create') {
        const { error } = await supabase
          .from('contribution_types')
          .insert(dataToInsert)

        if (error) {
          if (error.code === '23505') {
            toast.error('Eine Beitragsart mit diesem Namen existiert bereits')
          } else {
            toast.error('Fehler beim Erstellen der Beitragsart: ' + error.message)
          }
          return
        }

        toast.success('Beitragsart erfolgreich erstellt')
      } else {
        const { error } = await supabase
          .from('contribution_types')
          .update({
            ...dataToInsert,
            updated_at: new Date().toISOString()
          })
          .eq('id', contributionType!.id)

        if (error) {
          toast.error('Fehler beim Aktualisieren der Beitragsart: ' + error.message)
          return
        }

        toast.success('Beitragsart erfolgreich aktualisiert')
      }

      router.push('/dashboard/contributions')
    } catch (error) {
      console.error('Contribution type form error:', error)
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
            {mode === 'create' ? 'Neue Beitragsart erstellen' : 'Beitragsart bearbeiten'}
          </h1>
          <p className="text-gray-600 mt-1">
            {mode === 'create' 
              ? 'Definieren Sie eine neue Beitragsart für Ihren Verein'
              : 'Bearbeiten Sie die Beitragsart'
            }
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Beitragsart-Details</CardTitle>
          <CardDescription>
            Geben Sie die grundlegenden Informationen zur Beitragsart ein.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name der Beitragsart *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isLoading}
                placeholder="z.B. Mitgliedsbeitrag, Aufnahmegebühr"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Beschreibung</Label>
              <Input
                id="description"
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={isLoading}
                placeholder="Optionale Beschreibung der Beitragsart"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Betrag (€) *</Label>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                    required
                    disabled={isLoading}
                    placeholder="0.00"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interval">Zahlungsintervall *</Label>
                <Select 
                  value={formData.interval} 
                  onValueChange={(value: ContributionInterval) => setFormData({ ...formData, interval: value })}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Intervall auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {intervals.map((interval) => (
                      <SelectItem key={interval.value} value={interval.value}>
                        {interval.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.interval !== 'einmalig' && (
              <div className="space-y-2">
                <Label htmlFor="due_day">Fälligkeitstag (optional)</Label>
                <Input
                  id="due_day"
                  type="number"
                  min="1"
                  max="31"
                  value={formData.due_day || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    due_day: e.target.value ? parseInt(e.target.value) : undefined 
                  })}
                  disabled={isLoading}
                  placeholder="z.B. 1 für den ersten Tag des Monats"
                />
                <p className="text-sm text-gray-500">
                  Tag im Monat, an dem der Beitrag fällig wird (1-31). 
                  Lassen Sie das Feld leer für flexible Fälligkeit.
                </p>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Vorschau</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Name:</strong> {formData.name || 'Noch nicht eingegeben'}</p>
                <p><strong>Betrag:</strong> {formData.amount.toFixed(2)} €</p>
                <p><strong>Intervall:</strong> {intervals.find(i => i.value === formData.interval)?.label}</p>
                {formData.interval !== 'einmalig' && formData.due_day && (
                  <p><strong>Fällig am:</strong> {formData.due_day}. Tag des Monats</p>
                )}
                {formData.description && (
                  <p><strong>Beschreibung:</strong> {formData.description}</p>
                )}
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
                  ? (isLoading ? 'Wird erstellt...' : 'Beitragsart erstellen')
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