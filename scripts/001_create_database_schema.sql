-- Enable PostGIS extension for geospatial data
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  organization TEXT,
  phone TEXT,
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Create locations table with geospatial data
CREATE TABLE IF NOT EXISTS public.locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  coordinates GEOMETRY(POINT, 4326) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  elevation DECIMAL(8, 2),
  district TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on locations
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

-- Locations policies
CREATE POLICY "locations_select_own" ON public.locations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "locations_insert_own" ON public.locations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "locations_update_own" ON public.locations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "locations_delete_own" ON public.locations FOR DELETE USING (auth.uid() = user_id);

-- Create spatial index for locations
CREATE INDEX IF NOT EXISTS idx_locations_coordinates ON public.locations USING GIST (coordinates);

-- Create assessments table
CREATE TABLE IF NOT EXISTS public.assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES public.locations(id) ON DELETE CASCADE,
  assessment_type TEXT NOT NULL CHECK (assessment_type IN ('basic', 'detailed')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'completed', 'archived')),
  
  -- Building details
  building_type TEXT NOT NULL,
  roof_area DECIMAL(10, 2) NOT NULL,
  roof_material TEXT NOT NULL,
  roof_slope DECIMAL(5, 2),
  number_of_floors INTEGER,
  building_age INTEGER,
  
  -- Water requirements
  household_size INTEGER,
  daily_water_requirement DECIMAL(10, 2),
  seasonal_variation BOOLEAN DEFAULT false,
  
  -- System preferences
  storage_preference TEXT,
  budget_range TEXT,
  maintenance_preference TEXT,
  
  -- Calculated results
  annual_rainfall DECIMAL(10, 2),
  harvestable_water DECIMAL(10, 2),
  storage_capacity DECIMAL(10, 2),
  system_cost DECIMAL(12, 2),
  payback_period DECIMAL(5, 2),
  water_savings DECIMAL(10, 2),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on assessments
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- Assessments policies
CREATE POLICY "assessments_select_own" ON public.assessments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "assessments_insert_own" ON public.assessments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "assessments_update_own" ON public.assessments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "assessments_delete_own" ON public.assessments FOR DELETE USING (auth.uid() = user_id);

-- Create rainfall_data table for historical data
CREATE TABLE IF NOT EXISTS public.rainfall_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_coordinates GEOMETRY(POINT, 4326) NOT NULL,
  year INTEGER NOT NULL,
  month INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
  rainfall_mm DECIMAL(8, 2) NOT NULL,
  data_source TEXT NOT NULL,
  quality_score DECIMAL(3, 2) DEFAULT 1.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create spatial index for rainfall data
CREATE INDEX IF NOT EXISTS idx_rainfall_coordinates ON public.rainfall_data USING GIST (location_coordinates);
CREATE INDEX IF NOT EXISTS idx_rainfall_year_month ON public.rainfall_data (year, month);

-- Create groundwater_data table
CREATE TABLE IF NOT EXISTS public.groundwater_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_coordinates GEOMETRY(POINT, 4326) NOT NULL,
  depth_meters DECIMAL(8, 2) NOT NULL,
  quality_parameters JSONB,
  seasonal_variation JSONB,
  data_source TEXT NOT NULL,
  measurement_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create spatial index for groundwater data
CREATE INDEX IF NOT EXISTS idx_groundwater_coordinates ON public.groundwater_data USING GIST (location_coordinates);

-- Create cost_components table for system pricing
CREATE TABLE IF NOT EXISTS public.cost_components (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  component_type TEXT NOT NULL,
  component_name TEXT NOT NULL,
  unit_cost DECIMAL(10, 2) NOT NULL,
  unit TEXT NOT NULL,
  region TEXT,
  supplier TEXT,
  quality_grade TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create system_recommendations table
CREATE TABLE IF NOT EXISTS public.system_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  recommendation_type TEXT NOT NULL,
  components JSONB NOT NULL,
  total_cost DECIMAL(12, 2) NOT NULL,
  installation_time TEXT,
  maintenance_requirements TEXT,
  efficiency_rating DECIMAL(3, 2),
  suitability_score DECIMAL(3, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on system_recommendations
ALTER TABLE public.system_recommendations ENABLE ROW LEVEL SECURITY;

-- System recommendations policies (accessible through assessment ownership)
CREATE POLICY "recommendations_select_through_assessment" ON public.system_recommendations 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.assessments 
    WHERE assessments.id = system_recommendations.assessment_id 
    AND assessments.user_id = auth.uid()
  )
);

-- Create reports table for generated PDF reports
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  report_type TEXT NOT NULL,
  file_path TEXT,
  file_size INTEGER,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on reports
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Reports policies (accessible through assessment ownership)
CREATE POLICY "reports_select_through_assessment" ON public.reports 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.assessments 
    WHERE assessments.id = reports.assessment_id 
    AND assessments.user_id = auth.uid()
  )
);

-- Create admin_users table for admin access
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  permissions JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on admin_users (only admins can see admin data)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Admin policies
CREATE POLICY "admin_users_select_self" ON public.admin_users FOR SELECT USING (auth.uid() = id);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, preferred_language)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'preferred_language', 'en')
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON public.locations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON public.assessments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cost_components_updated_at BEFORE UPDATE ON public.cost_components
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
