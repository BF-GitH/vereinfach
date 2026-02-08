import { getUser, getClubProfile, createClient } from '@/lib/supabase'
import { ContributionsOverview } from '@/components/contributions/contributions-overview'
import type { ContributionType, Contribution } from '@/types'

async function getContributionData(clubId: string) {
  const supabase = await createClient()
  
  // Get contribution types
  const { data: contributionTypes, error: typesError } = await supabase
    .from('contribution_types')
    .select('*')
    .eq('club_id', clubId)
    .order('created_at', { ascending: false })

  // Get contributions with member and type info
  const { data: contributions, error: contributionsError } = await supabase
    .from('contributions')
    .select(`
      *,
      member:members(first_name, last_name, email),
      contribution_type:contribution_types(name)
    `)
    .eq('member_id', clubId) // This needs to be fixed - should join through members table
    .order('created_at', { ascending: false })

  if (typesError) {
    console.error('Error fetching contribution types:', typesError)
  }

  if (contributionsError) {
    console.error('Error fetching contributions:', contributionsError)
  }

  return {
    contributionTypes: contributionTypes || [],
    contributions: contributions || []
  }
}

export default async function ContributionsPage() {
  const user = await getUser()
  const clubProfile = await getClubProfile(user!.id)
  const { contributionTypes, contributions } = await getContributionData(clubProfile!.id)

  return (
    <ContributionsOverview 
      contributionTypes={contributionTypes} 
      contributions={contributions}
      clubId={clubProfile!.id} 
    />
  )
}