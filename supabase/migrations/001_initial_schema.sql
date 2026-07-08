-- ============================================================
-- Golden Western Real Estate — Supabase Database Migration
-- Run this in the Supabase SQL Editor
-- ============================================================

-- 1. Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create ENUM types
DO $$ BEGIN
  CREATE TYPE property_type AS ENUM ('apartment', 'villa', 'annex', 'penthouse', 'duplex');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE property_status AS ENUM ('available', 'reserved', 'sold', 'coming_soon');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE project_status AS ENUM ('under_construction', 'completed', 'upcoming');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE submission_type AS ENUM ('contact', 'inquiry', 'property_inquiry');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE submission_status AS ENUM ('new', 'reviewed', 'closed');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 3. Create PROJECTS table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  status project_status NOT NULL DEFAULT 'upcoming',
  city TEXT NOT NULL,
  district TEXT NOT NULL,
  address TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  hero_image TEXT NOT NULL DEFAULT '',
  gallery TEXT[] DEFAULT '{}',
  videos TEXT[] DEFAULT '{}',
  price_min BIGINT NOT NULL DEFAULT 0,
  price_max BIGINT NOT NULL DEFAULT 0,
  total_units INT NOT NULL DEFAULT 0,
  available_units INT NOT NULL DEFAULT 0,
  completion_date TEXT NOT NULL DEFAULT '',
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Create PROPERTIES table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  type property_type NOT NULL DEFAULT 'apartment',
  status property_status NOT NULL DEFAULT 'available',
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  city TEXT NOT NULL,
  district TEXT NOT NULL,
  address TEXT NOT NULL DEFAULT '',
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  area INT NOT NULL DEFAULT 0,
  bedrooms INT NOT NULL DEFAULT 0,
  bathrooms INT NOT NULL DEFAULT 0,
  living_rooms INT DEFAULT 0,
  parking INT DEFAULT 0,
  floor INT,
  total_floors INT,
  view TEXT,
  direction TEXT,
  features TEXT[] DEFAULT '{}',
  price BIGINT NOT NULL DEFAULT 0,
  price_per_meter INT NOT NULL DEFAULT 0,
  is_negotiable BOOLEAN NOT NULL DEFAULT false,
  down_payment_pct INT,
  monthly_installment INT,
  description TEXT NOT NULL DEFAULT '',
  thumbnail TEXT NOT NULL DEFAULT '',
  images TEXT[] DEFAULT '{}',
  videos TEXT[] DEFAULT '{}',
  floor_plan TEXT,
  virtual_tour TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Create SUBMISSIONS table
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type submission_type NOT NULL DEFAULT 'contact',
  resident_type TEXT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  subject TEXT,
  message TEXT,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  status submission_status NOT NULL DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  read_at TIMESTAMPTZ
);

-- 6. Create SITE_SETTINGS table (key-value for CMS content)
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- 7. Create ANALYTICS_EVENTS table
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  page_path TEXT,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  user_agent TEXT,
  referrer TEXT,
  ip_hash TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_properties_slug ON properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_project ON properties(project_id);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_properties_published ON properties(published) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured) WHERE featured = true;

CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_type ON submissions(type);
CREATE INDEX IF NOT EXISTS idx_submissions_created ON submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_page ON analytics_events(page_path);

-- 9. Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Attach triggers
DROP TRIGGER IF EXISTS set_updated_at_properties ON properties;
CREATE TRIGGER set_updated_at_properties
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_projects ON projects;
CREATE TRIGGER set_updated_at_projects
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_site_settings ON site_settings;
CREATE TRIGGER set_updated_at_site_settings
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 10. Row Level Security (RLS)

-- Enable RLS on all tables
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- PROPERTIES: Public can read published, Auth users can do everything
CREATE POLICY "Public can read published properties"
  ON properties FOR SELECT
  USING (published = true);

CREATE POLICY "Auth users can manage all properties"
  ON properties FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- PROJECTS: Public can read published, Auth users can do everything
CREATE POLICY "Public can read published projects"
  ON projects FOR SELECT
  USING (published = true);

CREATE POLICY "Auth users can manage all projects"
  ON projects FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- SUBMISSIONS: Anyone can insert, only auth users can read/update
CREATE POLICY "Anyone can submit forms"
  ON submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Auth users can read submissions"
  ON submissions FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Auth users can update submissions"
  ON submissions FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Auth users can delete submissions"
  ON submissions FOR DELETE
  USING (auth.role() = 'authenticated');

-- SITE_SETTINGS: Public can read, Auth users can update
CREATE POLICY "Public can read site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Auth users can manage site settings"
  ON site_settings FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ANALYTICS: Anyone can insert, only auth users can read
CREATE POLICY "Anyone can insert analytics"
  ON analytics_events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Auth users can read analytics"
  ON analytics_events FOR SELECT
  USING (auth.role() = 'authenticated');

-- 11. Seed initial site_settings
INSERT INTO site_settings (id, value) VALUES
  ('hero_images', '{"images": ["/hero-bg-3.webp", "/hero-bg-luxury.webp", "/hero-bg-2.webp"]}'),
  ('hero_title', '{"ar": "نعتمد أحدث التقنيات"}'),
  ('hero_subtitle', '{"ar": "لنربطكم بأفضل الفرص السكنية والاستثمارية"}'),
  ('stats', '{"projects": 75, "units": 850, "clients": 1200, "years": 14}'),
  ('contact_info', '{"unified_number": "920016581", "mobile": "+966554498018", "email": "info@alghrbiagolde.com", "address": "جدة، حي الصفا، شارع الأمير سلطان"}'),
  ('social_links', '{"instagram": "https://instagram.com/alghrbiagolde", "linkedin": "", "youtube": "", "tiktok": ""}'),
  ('seo_home', '{"title": "شركة الغربية الذهبية | عقارات فاخرة بالسعودية", "description": "حرفية تشييد وتميّز عقاري — نعتمد أحدث التقنيات لربط عملائنا بأفضل الفرص السكنية والاستثمارية"}')
ON CONFLICT (id) DO NOTHING;
