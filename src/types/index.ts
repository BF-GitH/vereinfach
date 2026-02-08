export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface ClubProfile {
  id: string
  user_id: string
  name: string
  description?: string
  address?: string
  phone?: string
  website?: string
  created_at: string
  updated_at: string
}

export interface Member {
  id: string
  club_id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  address?: string
  birth_date?: string
  join_date: string
  role: MemberRole
  status: MemberStatus
  created_at: string
  updated_at: string
}

export type MemberRole = 'mitglied' | 'vorstand' | 'kassier' | 'schriftführer' | 'admin'
export type MemberStatus = 'aktiv' | 'inaktiv' | 'ausgetreten'

export interface ContributionType {
  id: string
  club_id: string
  name: string
  description?: string
  amount: number
  interval: ContributionInterval
  due_day?: number // Day of month when due
  created_at: string
  updated_at: string
}

export type ContributionInterval = 'einmalig' | 'monatlich' | 'quartalsweise' | 'halbjährlich' | 'jährlich'

export interface Contribution {
  id: string
  member_id: string
  contribution_type_id: string
  amount: number
  due_date: string
  paid_date?: string
  status: ContributionStatus
  notes?: string
  created_at: string
  updated_at: string
  member?: Member
  contribution_type?: ContributionType
}

export type ContributionStatus = 'offen' | 'bezahlt' | 'überfällig' | 'erlassen'

// Dashboard Analytics
export interface DashboardStats {
  totalMembers: number
  activeMembers: number
  inactiveMembers: number
  outstandingContributions: number
  totalOutstandingAmount: number
  recentActivities: Activity[]
}

export interface Activity {
  id: string
  type: 'member_added' | 'member_updated' | 'contribution_paid' | 'contribution_added'
  description: string
  created_at: string
  member_id?: string
  member_name?: string
}

// Form types
export interface CreateMemberForm {
  first_name: string
  last_name: string
  email: string
  phone?: string
  address?: string
  birth_date?: string
  role: MemberRole
}

export interface CreateContributionTypeForm {
  name: string
  description?: string
  amount: number
  interval: ContributionInterval
  due_day?: number
}