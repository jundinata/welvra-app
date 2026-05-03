-- ============================================================
-- Phase 3D: Articles table + personalized feed infrastructure
-- Run in Supabase SQL Editor
-- ============================================================

-- 1. Articles table
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  subtitle VARCHAR(300),
  category VARCHAR(50) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  body TEXT NOT NULL,
  excerpt TEXT,
  hero_image_url TEXT,
  hero_image_alt VARCHAR(200),
  hero_image_credit JSONB,
  hero_dominant_color VARCHAR(10),
  author VARCHAR(100) DEFAULT 'Tim Welvra',
  read_time_minutes SMALLINT,
  pregnancy_week_min SMALLINT,
  pregnancy_week_max SMALLINT,
  age_min SMALLINT DEFAULT 18,
  age_max SMALLINT DEFAULT 100,
  gender_relevance VARCHAR(20) DEFAULT 'all',
  sources JSONB,
  is_published BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  trending_score INT DEFAULT 50,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Indexes
CREATE INDEX IF NOT EXISTS idx_articles_category
  ON public.articles(category) WHERE is_published = TRUE;

CREATE INDEX IF NOT EXISTS idx_articles_tags
  ON public.articles USING GIN (tags);

CREATE INDEX IF NOT EXISTS idx_articles_pregnancy_week
  ON public.articles(pregnancy_week_min, pregnancy_week_max)
  WHERE pregnancy_week_min IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_articles_featured
  ON public.articles(is_featured) WHERE is_published = TRUE AND is_featured = TRUE;

CREATE INDEX IF NOT EXISTS idx_articles_slug
  ON public.articles(slug);

-- 3. RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Public read for all authenticated users (published only)
CREATE POLICY "authenticated_read_articles"
  ON public.articles FOR SELECT
  TO authenticated
  USING (is_published = TRUE);

-- Anon read for unauthenticated browsing
CREATE POLICY "anon_read_articles"
  ON public.articles FOR SELECT
  TO anon
  USING (is_published = TRUE);

-- No INSERT/UPDATE/DELETE for regular users (admin via dashboard only)
GRANT SELECT ON public.articles TO authenticated;
GRANT SELECT ON public.articles TO anon;

-- 4. Updated_at trigger
CREATE OR REPLACE FUNCTION update_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS articles_updated_at ON public.articles;
CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION update_articles_updated_at();

-- 5. View count increment function (called from client)
CREATE OR REPLACE FUNCTION increment_article_view(article_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.articles
  SET view_count = view_count + 1
  WHERE id = article_id AND is_published = TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Ensure read_history table has scroll_depth if not exists
-- (Already created in Phase 2E, but ensure column exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'read_history' AND column_name = 'scroll_depth'
  ) THEN
    ALTER TABLE public.read_history ADD COLUMN scroll_depth SMALLINT DEFAULT 0;
  END IF;
END $$;
