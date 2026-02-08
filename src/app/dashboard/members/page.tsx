import { getUser, getClubProfile, createClient } from '@/lib/supabase'
import { MembersList } from '@/components/members/members-list'
import type { Member } from '@/types'

async function getMembers(clubId: string): Promise<Member[]> {
  const supabase = await createClient()
  
  const { data: members, error } = await supabase
    .from('members')
    .select('*')
    .eq('club_id', clubId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching members:', error)
    return []
  }

  return members || []
}

export default async function MembersPage() {
  const user = await getUser()
  const clubProfile = await getClubProfile(user!.id)
  const members = await getMembers(clubProfile!.id)

  return (
    <MembersList members={members} clubId={clubProfile!.id} />
  )
}