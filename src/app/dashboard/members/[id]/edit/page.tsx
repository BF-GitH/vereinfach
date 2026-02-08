import { notFound } from 'next/navigation'
import { getUser, getClubProfile, createClient } from '@/lib/supabase'
import { MemberForm } from '@/components/members/member-form'
import type { Member } from '@/types'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getMember(memberId: string, clubId: string): Promise<Member | null> {
  const supabase = await createClient()
  
  const { data: member, error } = await supabase
    .from('members')
    .select('*')
    .eq('id', memberId)
    .eq('club_id', clubId)
    .single()

  if (error) {
    return null
  }

  return member
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  return {
    title: 'Mitglied bearbeiten',
    description: `Bearbeiten Sie die Daten des Mitglieds.`,
  }
}

export default async function EditMemberPage({ params }: PageProps) {
  const { id } = await params
  const user = await getUser()
  const clubProfile = await getClubProfile(user!.id)
  const member = await getMember(id, clubProfile!.id)

  if (!member) {
    notFound()
  }

  return (
    <MemberForm 
      clubId={clubProfile!.id} 
      member={member}
      mode="edit"
    />
  )
}