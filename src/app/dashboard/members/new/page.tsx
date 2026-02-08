import { getUser, getClubProfile } from '@/lib/supabase'
import { MemberForm } from '@/components/members/member-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Neues Mitglied',
  description: 'Fügen Sie ein neues Mitglied zu Ihrem Verein hinzu.',
}

export default async function NewMemberPage() {
  const user = await getUser()
  const clubProfile = await getClubProfile(user!.id)

  return (
    <MemberForm 
      clubId={clubProfile!.id} 
      mode="create"
    />
  )
}