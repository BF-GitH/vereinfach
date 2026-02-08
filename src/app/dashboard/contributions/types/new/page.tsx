import { getUser, getClubProfile } from '@/lib/supabase'
import { ContributionTypeForm } from '@/components/contributions/contribution-type-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Neue Beitragsart',
  description: 'Erstellen Sie eine neue Beitragsart für Ihren Verein.',
}

export default async function NewContributionTypePage() {
  const user = await getUser()
  const clubProfile = await getClubProfile(user!.id)

  return (
    <ContributionTypeForm 
      clubId={clubProfile!.id} 
      mode="create"
    />
  )
}