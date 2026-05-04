-- =============================================================================
-- Welvra Phase 3F: Extended Profile Schema
-- -----------------------------------------------------------------------------
-- Adds health-biodata columns to public.profiles for personalisation across
-- features (Dr. Sly chat, Analisa Makanku, TrackFit, Tekanan Darah, Modul
-- Kehamilan, etc).
--
-- Anonymous users hold the same data in localStorage (welvra.profile.local.v1).
-- When they sign in, maybeMigrateLocalProfile pushes the local copy here.
--
-- Run this once in the Supabase SQL Editor. Idempotent — safe to re-run.
-- =============================================================================

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS birth_date DATE,
  ADD COLUMN IF NOT EXISTS marital_status VARCHAR(30),
  ADD COLUMN IF NOT EXISTS occupation VARCHAR(100),
  ADD COLUMN IF NOT EXISTS height_cm SMALLINT,
  ADD COLUMN IF NOT EXISTS weight_kg DECIMAL(5,2),
  ADD COLUMN IF NOT EXISTS waist_cm SMALLINT,
  ADD COLUMN IF NOT EXISTS blood_type VARCHAR(5),
  ADD COLUMN IF NOT EXISTS chronic_conditions TEXT[],
  ADD COLUMN IF NOT EXISTS allergies TEXT[],
  ADD COLUMN IF NOT EXISTS current_medications TEXT,
  ADD COLUMN IF NOT EXISTS surgical_history TEXT,
  ADD COLUMN IF NOT EXISTS family_history TEXT[],
  ADD COLUMN IF NOT EXISTS activity_level VARCHAR(30),
  ADD COLUMN IF NOT EXISTS diet_type VARCHAR(30),
  ADD COLUMN IF NOT EXISTS special_diet TEXT[],
  ADD COLUMN IF NOT EXISTS smoking VARCHAR(30),
  ADD COLUMN IF NOT EXISTS alcohol VARCHAR(30),
  ADD COLUMN IF NOT EXISTS sleep_hours SMALLINT,
  ADD COLUMN IF NOT EXISTS stress_level VARCHAR(30),
  ADD COLUMN IF NOT EXISTS menstrual_status VARCHAR(30),
  ADD COLUMN IF NOT EXISTS last_period_date DATE,
  ADD COLUMN IF NOT EXISTS pregnancy_status VARCHAR(30),
  ADD COLUMN IF NOT EXISTS num_children SMALLINT,
  ADD COLUMN IF NOT EXISTS contraception_method TEXT[],
  ADD COLUMN IF NOT EXISTS health_goals TEXT[],
  ADD COLUMN IF NOT EXISTS target_specific TEXT,
  ADD COLUMN IF NOT EXISTS greeting_style VARCHAR(20),
  ADD COLUMN IF NOT EXISTS custom_greeting VARCHAR(60),
  ADD COLUMN IF NOT EXISTS notification_times TEXT[];

-- Sanity-check value domains. Loose by design — Welvra UI restricts inputs,
-- but we let unknown values through so the client can iterate without
-- breaking auth flow on a typo.
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_height_cm_range,
  ADD CONSTRAINT profiles_height_cm_range CHECK (height_cm IS NULL OR (height_cm BETWEEN 100 AND 250));

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_weight_kg_range,
  ADD CONSTRAINT profiles_weight_kg_range CHECK (weight_kg IS NULL OR (weight_kg BETWEEN 20 AND 300));

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_sleep_hours_range,
  ADD CONSTRAINT profiles_sleep_hours_range CHECK (sleep_hours IS NULL OR (sleep_hours BETWEEN 0 AND 24));

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_num_children_range,
  ADD CONSTRAINT profiles_num_children_range CHECK (num_children IS NULL OR (num_children BETWEEN 0 AND 20));

-- Notify PostgREST so the new columns are immediately visible to the client.
NOTIFY pgrst, 'reload schema';
