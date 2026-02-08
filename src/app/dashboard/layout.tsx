import { redirect } from 'next/navigation'
import { getUser, getClubProfile } from '@/lib/supabase'
import { DashboardNav } from '@/components/layout/dashboard-nav'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  const clubProfile = await getClubProfile(user.id)
  
  if (!clubProfile) {
    // If no club profile exists, create one or redirect to setup
    redirect('/auth/register')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav clubName={clubProfile.name} />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}