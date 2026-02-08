-- Enable RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Club Profiles Table
CREATE TABLE public.club_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT,
  phone TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Members Table
CREATE TABLE public.members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  club_id UUID REFERENCES public.club_profiles(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  birth_date DATE,
  join_date DATE NOT NULL DEFAULT CURRENT_DATE,
  role TEXT NOT NULL DEFAULT 'mitglied' CHECK (role IN ('mitglied', 'vorstand', 'kassier', 'schriftführer', 'admin')),
  status TEXT NOT NULL DEFAULT 'aktiv' CHECK (status IN ('aktiv', 'inaktiv', 'ausgetreten')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(club_id, email)
);

-- Contribution Types Table
CREATE TABLE public.contribution_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  club_id UUID REFERENCES public.club_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  amount DECIMAL(10,2) NOT NULL,
  interval TEXT NOT NULL DEFAULT 'monatlich' CHECK (interval IN ('einmalig', 'monatlich', 'quartalsweise', 'halbjährlich', 'jährlich')),
  due_day INTEGER CHECK (due_day >= 1 AND due_day <= 31),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(club_id, name)
);

-- Contributions Table
CREATE TABLE public.contributions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID REFERENCES public.members(id) ON DELETE CASCADE,
  contribution_type_id UUID REFERENCES public.contribution_types(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  paid_date DATE,
  status TEXT NOT NULL DEFAULT 'offen' CHECK (status IN ('offen', 'bezahlt', 'überfällig', 'erlassen')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities Table (for dashboard feed)
CREATE TABLE public.activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  club_id UUID REFERENCES public.club_profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('member_added', 'member_updated', 'contribution_paid', 'contribution_added')),
  description TEXT NOT NULL,
  member_id UUID REFERENCES public.members(id) ON DELETE SET NULL,
  member_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_members_club_id ON public.members(club_id);
CREATE INDEX idx_members_status ON public.members(status);
CREATE INDEX idx_contribution_types_club_id ON public.contribution_types(club_id);
CREATE INDEX idx_contributions_member_id ON public.contributions(member_id);
CREATE INDEX idx_contributions_status ON public.contributions(status);
CREATE INDEX idx_contributions_due_date ON public.contributions(due_date);
CREATE INDEX idx_activities_club_id ON public.activities(club_id);
CREATE INDEX idx_activities_created_at ON public.activities(created_at DESC);

-- RLS Policies
-- Club Profiles
CREATE POLICY "Users can view own club profile" ON public.club_profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own club profile" ON public.club_profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can insert own club profile" ON public.club_profiles
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Members
CREATE POLICY "Club owners can manage members" ON public.members
  FOR ALL USING (
    club_id IN (
      SELECT id FROM public.club_profiles WHERE user_id = auth.uid()
    )
  );

-- Contribution Types
CREATE POLICY "Club owners can manage contribution types" ON public.contribution_types
  FOR ALL USING (
    club_id IN (
      SELECT id FROM public.club_profiles WHERE user_id = auth.uid()
    )
  );

-- Contributions
CREATE POLICY "Club owners can manage contributions" ON public.contributions
  FOR ALL USING (
    member_id IN (
      SELECT id FROM public.members WHERE club_id IN (
        SELECT id FROM public.club_profiles WHERE user_id = auth.uid()
      )
    )
  );

-- Activities
CREATE POLICY "Club owners can view activities" ON public.activities
  FOR SELECT USING (
    club_id IN (
      SELECT id FROM public.club_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Club owners can insert activities" ON public.activities
  FOR INSERT WITH CHECK (
    club_id IN (
      SELECT id FROM public.club_profiles WHERE user_id = auth.uid()
    )
  );

-- Enable RLS on all tables
ALTER TABLE public.club_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contribution_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_club_profiles_updated_at BEFORE UPDATE ON public.club_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON public.members
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contribution_types_updated_at BEFORE UPDATE ON public.contribution_types
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contributions_updated_at BEFORE UPDATE ON public.contributions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();