-- Phase 2 schema additions for skin_analyses table
-- Run after phase-faceprint-skin-analyses.sql (Phase 1)

ALTER TABLE public.skin_analyses ADD COLUMN IF NOT EXISTS skin_type_explanation TEXT;
ALTER TABLE public.skin_analyses ADD COLUMN IF NOT EXISTS encouragement TEXT;
ALTER TABLE public.skin_analyses ADD COLUMN IF NOT EXISTS primary_concerns JSONB;
ALTER TABLE public.skin_analyses ADD COLUMN IF NOT EXISTS recommendations JSONB;
ALTER TABLE public.skin_analyses ADD COLUMN IF NOT EXISTS daily_routine JSONB;
