'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { supabase } from '@/lib/supabase-client'
import { toast } from 'sonner'
import { Download, Trash2, Shield, AlertTriangle, Database } from 'lucide-react'

export default function SettingsPage() {
  const [isExporting, setIsExporting] = useState(false)
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const router = useRouter()

  const exportUserData = async () => {
    setIsExporting(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.error('Nicht angemeldet')
        return
      }

      // Collect all user data
      const userData: any = {
        export_info: {
          timestamp: new Date().toISOString(),
          user_id: user.id,
          email: user.email,
          note: 'Vollständiger Datenexport gemäß Art. 15 und 20 DSGVO'
        },
        user_profile: {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
          last_sign_in: user.last_sign_in_at,
          metadata: user.user_metadata
        }
      }

      // Get club data
      const { data: clubs, error: clubsError } = await supabase
        .from('club_profiles')
        .select('*')
        .eq('user_id', user.id)

      if (clubsError) {
        console.error('Error fetching clubs:', clubsError)
      } else {
        userData.clubs = clubs
      }

      // Get members data
      const { data: members, error: membersError } = await supabase
        .from('members')
        .select('*')
        .in('club_id', clubs?.map(c => c.id) || [])

      if (membersError) {
        console.error('Error fetching members:', membersError)
      } else {
        userData.members = members
      }

      // Get contributions data  
      const { data: contributions, error: contributionsError } = await supabase
        .from('contributions')
        .select('*')
        .in('member_id', members?.map(m => m.id) || [])

      if (contributionsError) {
        console.error('Error fetching contributions:', contributionsError)
      } else {
        userData.contributions = contributions
      }

      // Get contribution types
      const { data: contributionTypes, error: typesError } = await supabase
        .from('contribution_types')
        .select('*')
        .in('club_id', clubs?.map(c => c.id) || [])

      if (typesError) {
        console.error('Error fetching contribution types:', typesError)
      } else {
        userData.contribution_types = contributionTypes
      }

      // Create and download JSON file
      const dataStr = JSON.stringify(userData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      
      const downloadLink = document.createElement('a')
      downloadLink.href = URL.createObjectURL(dataBlob)
      downloadLink.download = `vereinfach-datenexport-${new Date().toISOString().split('T')[0]}.json`
      downloadLink.click()
      
      URL.revokeObjectURL(downloadLink.href)
      
      toast.success('✅ Datenexport erfolgreich! Datei wurde heruntergeladen.')
      
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Fehler beim Datenexport')
    } finally {
      setIsExporting(false)
    }
  }

  const deleteAccount = async () => {
    setIsDeletingAccount(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.error('Nicht angemeldet')
        return
      }

      // Get all club IDs to delete related data
      const { data: clubs } = await supabase
        .from('club_profiles')
        .select('id')
        .eq('user_id', user.id)

      const clubIds = clubs?.map(c => c.id) || []

      if (clubIds.length > 0) {
        // Get all member IDs
        const { data: members } = await supabase
          .from('members')
          .select('id')
          .in('club_id', clubIds)

        const memberIds = members?.map(m => m.id) || []

        // Delete contributions first (foreign key constraint)
        if (memberIds.length > 0) {
          const { error: contributionsError } = await supabase
            .from('contributions')
            .delete()
            .in('member_id', memberIds)

          if (contributionsError) {
            console.error('Error deleting contributions:', contributionsError)
          }
        }

        // Delete members
        const { error: membersError } = await supabase
          .from('members')
          .delete()
          .in('club_id', clubIds)

        if (membersError) {
          console.error('Error deleting members:', membersError)
        }

        // Delete contribution types
        const { error: typesError } = await supabase
          .from('contribution_types')
          .delete()
          .in('club_id', clubIds)

        if (typesError) {
          console.error('Error deleting contribution types:', typesError)
        }
      }

      // Delete club profiles
      const { error: clubError } = await supabase
        .from('club_profiles')
        .delete()
        .eq('user_id', user.id)

      if (clubError) {
        console.error('Error deleting clubs:', clubError)
      }

      // Delete user account (this will sign them out)
      const { error: authError } = await supabase.auth.admin.deleteUser(user.id)
      
      if (authError) {
        // If admin delete fails, sign out user manually
        console.error('Error deleting user account:', authError)
        await supabase.auth.signOut()
        toast.success('✅ Account-Daten gelöscht. Sie wurden abgemeldet.')
      } else {
        toast.success('✅ Account vollständig gelöscht.')
      }

      // Clear local storage
      localStorage.clear()
      
      // Redirect to homepage
      router.push('/')
      
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Fehler beim Löschen des Accounts')
    } finally {
      setIsDeletingAccount(false)
      setDeleteConfirmOpen(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Einstellungen</h1>
        <p className="text-gray-600 mt-2">
          Verwaltet eure Daten und Account-Einstellungen
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Data Export */}
        <Card className="border-blue-200">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-blue-900">Datenexport</CardTitle>
                <CardDescription>
                  Eure Daten exportieren (Art. 15 + 20 DSGVO)
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-blue-800 font-medium mb-2">Was wird exportiert:</p>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Vereinsdaten und Profil</li>
                <li>• Alle Mitgliederdaten</li>
                <li>• Beitragsdaten und -historie</li>
                <li>• Account-Informationen</li>
                <li>• Metadaten (Erstellungsdatum, etc.)</li>
              </ul>
            </div>
            <p className="text-gray-600 text-sm">
              Export-Format: JSON-Datei mit allen euren Daten in strukturierter Form. 
              Dies ist euer Recht nach Art. 15 (Auskunft) und Art. 20 (Datenübertragbarkeit) der DSGVO.
            </p>
            <Button 
              onClick={exportUserData}
              disabled={isExporting}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
            >
              {isExporting && <Database className="mr-2 w-4 h-4 animate-pulse" />}
              {isExporting ? 'Exportiere Daten...' : '📥 Alle Daten exportieren'}
            </Button>
          </CardContent>
        </Card>

        {/* Account Deletion */}
        <Card className="border-red-200">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-red-900">Account löschen</CardTitle>
                <CardDescription>
                  Account und alle Daten permanent löschen (Art. 17 DSGVO)
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-red-800 font-medium">Achtung: Unwiderrufliche Löschung!</p>
                  <p className="text-red-700 text-sm mt-1">
                    Diese Aktion kann nicht rückgängig gemacht werden.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Was wird gelöscht:</strong></p>
              <ul className="space-y-1">
                <li>• Euer Account und Login-Daten</li>
                <li>• Alle Vereinsdaten</li>
                <li>• Alle Mitgliederdaten</li>
                <li>• Komplette Beitragshistorie</li>
                <li>• Alle gespeicherten Einstellungen</li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">
                Dies ist euer Recht nach Art. 17 DSGVO (Recht auf Löschung/"Recht auf Vergessenwerden").
              </p>
            </div>

            <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="mr-2 w-4 h-4" />
                  Account und alle Daten löschen
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span>Account wirklich löschen?</span>
                  </DialogTitle>
                  <DialogDescription className="space-y-3">
                    <p>
                      Ihr seid dabei, euren VereinFach-Account <strong>permanent zu löschen</strong>. 
                      Dies kann <strong>nicht rückgängig</strong> gemacht werden.
                    </p>
                    <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                      <p className="text-red-800 text-sm font-medium">Es werden gelöscht:</p>
                      <ul className="text-red-700 text-sm mt-1 space-y-1">
                        <li>• Euer Account und alle Login-Daten</li>
                        <li>• Alle Vereinsdaten</li>
                        <li>• Alle Mitgliederdaten</li>
                        <li>• Komplette Beitragshistorie</li>
                        <li>• Alle Einstellungen</li>
                      </ul>
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>Tipp:</strong> Falls ihr die Daten noch benötigt, exportiert sie zuerst 
                      mit dem "Datenexport"-Button oben.
                    </p>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setDeleteConfirmOpen(false)}
                    disabled={isDeletingAccount}
                  >
                    Abbrechen
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={deleteAccount}
                    disabled={isDeletingAccount}
                  >
                    {isDeletingAccount && <Trash2 className="mr-2 w-4 h-4 animate-pulse" />}
                    {isDeletingAccount ? 'Wird gelöscht...' : 'Ja, endgültig löschen'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* GDPR Info */}
      <Card className="border-emerald-200 bg-emerald-50/50">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-emerald-600" />
            <CardTitle className="text-emerald-900">Eure Rechte (DSGVO)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-emerald-800">
            <div>
              <p className="font-medium mb-2">Betroffenenrechte nach DSGVO:</p>
              <ul className="space-y-1">
                <li><strong>Art. 15:</strong> Recht auf Auskunft</li>
                <li><strong>Art. 16:</strong> Recht auf Berichtigung</li>
                <li><strong>Art. 17:</strong> Recht auf Löschung</li>
                <li><strong>Art. 20:</strong> Recht auf Datenübertragbarkeit</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Kontakt für weitere Fragen:</p>
              <p className="text-emerald-700">
                [AUSFÜLLEN] datenschutz@[domain].de<br />
                Detaillierte Informationen in unserer{' '}
                <a href="/legal/datenschutz" className="underline hover:text-emerald-900">
                  Datenschutzerklärung
                </a>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}